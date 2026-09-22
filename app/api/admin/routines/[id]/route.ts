import { NextResponse, type NextRequest } from 'next/server';
import { getD1 } from '@/app/_server/d1';
import { verifyAdminAuth } from '@/app/_server/adminAuth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const db = getD1();

    const routine = await db.prepare('SELECT * FROM routines WHERE id = ?').bind(id).first();
    if (!routine) {
      return NextResponse.json({ success: false, error: 'Routine not found' }, { status: 404 });
    }

    const items = await db
      .prepare(`
        SELECT 
          rd.id as assignment_id,
          rd.routine_id,
          rd.dhikr_id,
          rd.display_order,
          rd.count_override,
          rd.is_active as item_active,
          d.*
        FROM routine_dhikrs rd
        JOIN dhikrs d ON rd.dhikr_id = d.id
        WHERE rd.routine_id = ?
        ORDER BY rd.display_order ASC
      `)
      .bind(id)
      .all();

    return NextResponse.json({
      success: true,
      data: {
        ...routine,
        items: items.results,
      },
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to load routine' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description, time_of_day, icon, completion_note, is_active } = body;

    if (!name?.trim()) return NextResponse.json({ success: false, error: 'Routine name is required' }, { status: 400 });

    const db = getD1();
    const now = new Date().toISOString();

    await db
      .prepare(`
        UPDATE routines SET
          name = ?,
          description = ?,
          time_of_day = ?,
          icon = ?,
          completion_note = ?,
          is_active = ?,
          updated_at = ?
        WHERE id = ?
      `)
      .bind(
        name.trim(),
        description?.trim() || null,
        time_of_day?.trim() || 'Daily',
        icon || '📿',
        completion_note?.trim() || null,
        is_active !== undefined ? (is_active ? 1 : 0) : 1,
        now,
        id
      )
      .run();

    return NextResponse.json({ success: true, message: 'Routine updated successfully' });
  } catch (err) {
    console.error('API Error in PUT /api/admin/routines/:id:', err);
    return NextResponse.json({ success: false, error: 'Failed to update routine' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const db = getD1();

    await db
      .prepare('UPDATE routines SET is_active = 0, updated_at = ? WHERE id = ?')
      .bind(new Date().toISOString(), id)
      .run();

    return NextResponse.json({ success: true, message: 'Routine deactivated' });
  } catch (err) {
    console.error('API Error in DELETE /api/admin/routines/:id:', err);
    return NextResponse.json({ success: false, error: 'Failed to deactivate routine' }, { status: 500 });
  }
}
