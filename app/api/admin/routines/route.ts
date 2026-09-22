import { NextResponse, type NextRequest } from 'next/server';
import { getD1 } from '@/app/_server/d1';
import { verifyAdminAuth } from '@/app/_server/adminAuth';

export async function GET(request: NextRequest) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = getD1();

    const routinesResult = await db
      .prepare(`
        SELECT 
          r.*,
          COUNT(rd.id) as dhikr_count
        FROM routines r
        LEFT JOIN routine_dhikrs rd ON r.id = rd.routine_id AND rd.is_active = 1
        GROUP BY r.id
        ORDER BY r.id ASC
      `)
      .all();

    return NextResponse.json({ success: true, data: routinesResult.results });
  } catch (err) {
    console.error('API Error in GET /api/admin/routines:', err);
    return NextResponse.json({ success: false, error: 'Failed to load routines' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, name, description, time_of_day, icon = '📿', completion_note, is_active = 1 } = body;

    if (!name?.trim()) return NextResponse.json({ success: false, error: 'Routine name is required' }, { status: 400 });

    const routineId =
      id?.trim() ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    const now = new Date().toISOString();
    const db = getD1();

    await db
      .prepare(`
        INSERT INTO routines (id, name, description, time_of_day, icon, completion_note, is_active, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        routineId,
        name.trim(),
        description?.trim() || null,
        time_of_day?.trim() || 'Daily',
        icon || '📿',
        completion_note?.trim() || 'Alhamdulillah! Routine completed.',
        is_active ? 1 : 0,
        now,
        now
      )
      .run();

    return NextResponse.json({ success: true, id: routineId, message: 'Routine created successfully' });
  } catch (err) {
    console.error('API Error in POST /api/admin/routines:', err);
    return NextResponse.json({ success: false, error: 'Failed to create routine' }, { status: 500 });
  }
}
