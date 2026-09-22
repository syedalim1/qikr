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
    const { id: routineId } = await params;
    const db = getD1();

    const items = await db
      .prepare(`
        SELECT 
          rd.id as assignment_id,
          rd.routine_id,
          rd.dhikr_id,
          rd.display_order,
          rd.count_override,
          rd.is_active as item_active,
          d.name,
          d.arabic_text,
          d.tamil_text,
          d.english_text,
          d.default_count,
          d.mode
        FROM routine_dhikrs rd
        JOIN dhikrs d ON rd.dhikr_id = d.id
        WHERE rd.routine_id = ?
        ORDER BY rd.display_order ASC
      `)
      .bind(routineId)
      .all();

    return NextResponse.json({ success: true, data: items.results });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to load routine items' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id: routineId } = await params;
    const body = await request.json();
    const { dhikr_id, count_override, display_order } = body;

    if (!dhikr_id) {
      return NextResponse.json({ success: false, error: 'dhikr_id required' }, { status: 400 });
    }

    const db = getD1();

    // Check maximum display_order if not provided
    let order = display_order;
    if (order === undefined || order === null) {
      const maxOrder = await db
        .prepare('SELECT COALESCE(MAX(display_order), 0) as max_order FROM routine_dhikrs WHERE routine_id = ?')
        .bind(routineId)
        .first<{ max_order: number }>();
      order = (maxOrder?.max_order || 0) + 1;
    }

    const assignmentId = `rd_${routineId}_${dhikr_id}_${Date.now().toString(36)}`;
    const parsedOverride = count_override !== undefined && count_override !== null && count_override !== ''
      ? parseInt(count_override, 10)
      : null;

    await db
      .prepare(`
        INSERT INTO routine_dhikrs (id, routine_id, dhikr_id, display_order, count_override, is_active)
        VALUES (?, ?, ?, ?, ?, 1)
        ON CONFLICT(routine_id, dhikr_id) DO UPDATE SET
          display_order = excluded.display_order,
          count_override = excluded.count_override,
          is_active = 1
      `)
      .bind(assignmentId, routineId, dhikr_id, order, parsedOverride)
      .run();

    return NextResponse.json({ success: true, message: 'Dhikr added to routine' });
  } catch (err) {
    console.error('API Error in POST /api/admin/routines/:id/items:', err);
    return NextResponse.json({ success: false, error: 'Failed to assign dhikr to routine' }, { status: 500 });
  }
}

/**
 * Batch update routine items ordering and count overrides.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id: routineId } = await params;
    const body = await request.json();
    const { items } = body; // array of { assignment_id or dhikr_id, display_order, count_override }

    if (!Array.isArray(items)) {
      return NextResponse.json({ success: false, error: 'items array required' }, { status: 400 });
    }

    const db = getD1();

    for (const item of items) {
      const parsedOverride =
        item.count_override !== undefined && item.count_override !== null && item.count_override !== ''
          ? parseInt(item.count_override, 10)
          : null;

      if (item.assignment_id) {
        await db
          .prepare(`
            UPDATE routine_dhikrs
            SET display_order = ?, count_override = ?
            WHERE id = ? AND routine_id = ?
          `)
          .bind(item.display_order, parsedOverride, item.assignment_id, routineId)
          .run();
      } else if (item.dhikr_id) {
        await db
          .prepare(`
            UPDATE routine_dhikrs
            SET display_order = ?, count_override = ?
            WHERE dhikr_id = ? AND routine_id = ?
          `)
          .bind(item.display_order, parsedOverride, item.dhikr_id, routineId)
          .run();
      }
    }

    return NextResponse.json({ success: true, message: 'Routine ordering updated' });
  } catch (err) {
    console.error('API Error in PUT /api/admin/routines/:id/items:', err);
    return NextResponse.json({ success: false, error: 'Failed to update routine order' }, { status: 500 });
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
    const { id: routineId } = await params;
    const { searchParams } = new URL(request.url);
    const assignmentId = searchParams.get('assignmentId');
    const dhikrId = searchParams.get('dhikrId');

    const db = getD1();

    if (assignmentId) {
      await db.prepare('DELETE FROM routine_dhikrs WHERE id = ? AND routine_id = ?').bind(assignmentId, routineId).run();
    } else if (dhikrId) {
      await db.prepare('DELETE FROM routine_dhikrs WHERE dhikr_id = ? AND routine_id = ?').bind(dhikrId, routineId).run();
    } else {
      return NextResponse.json({ success: false, error: 'assignmentId or dhikrId required' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Dhikr removed from routine' });
  } catch (err) {
    console.error('API Error in DELETE /api/admin/routines/:id/items:', err);
    return NextResponse.json({ success: false, error: 'Failed to remove dhikr from routine' }, { status: 500 });
  }
}
