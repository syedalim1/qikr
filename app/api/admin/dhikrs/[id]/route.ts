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
    const dhikr = await db.prepare('SELECT * FROM dhikrs WHERE id = ?').bind(id).first();
    if (!dhikr) {
      return NextResponse.json({ success: false, error: 'Dhikr not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: dhikr });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to load dhikr' }, { status: 500 });
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
    const {
      name,
      arabic_text,
      tamil_text,
      english_text,
      pronunciation,
      meaning_tamil,
      meaning_english,
      default_count,
      mode,
      source_reference,
      display_note,
      is_active,
    } = body;

    if (!name?.trim()) return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
    if (!arabic_text?.trim()) return NextResponse.json({ success: false, error: 'Arabic text is required' }, { status: 400 });
    if (!tamil_text?.trim()) return NextResponse.json({ success: false, error: 'Tamil text is required' }, { status: 400 });
    if (!english_text?.trim()) return NextResponse.json({ success: false, error: 'English text is required' }, { status: 400 });

    let count = parseInt(default_count, 10);
    if (mode === 'FIXED') {
      if (isNaN(count) || count < 1) {
        return NextResponse.json({ success: false, error: 'Fixed count must be greater than 0' }, { status: 400 });
      }
    } else if (mode === 'CONTINUOUS') {
      count = 0;
    } else {
      count = isNaN(count) || count < 1 ? 1 : count;
    }

    const now = new Date().toISOString();
    const db = getD1();

    await db
      .prepare(`
        UPDATE dhikrs SET
          name = ?,
          arabic_text = ?,
          tamil_text = ?,
          english_text = ?,
          pronunciation = ?,
          meaning_tamil = ?,
          meaning_english = ?,
          default_count = ?,
          mode = ?,
          source_reference = ?,
          display_note = ?,
          is_active = ?,
          updated_at = ?
        WHERE id = ?
      `)
      .bind(
        name.trim(),
        arabic_text.trim(),
        tamil_text.trim(),
        english_text.trim(),
        pronunciation?.trim() || null,
        meaning_tamil?.trim() || null,
        meaning_english?.trim() || null,
        count,
        mode || 'FIXED',
        source_reference?.trim() || null,
        display_note?.trim() || null,
        is_active !== undefined ? (is_active ? 1 : 0) : 1,
        now,
        id
      )
      .run();

    return NextResponse.json({ success: true, message: 'Dhikr updated successfully' });
  } catch (err) {
    console.error('API Error in PUT /api/admin/dhikrs/:id:', err);
    return NextResponse.json({ success: false, error: 'Failed to update dhikr' }, { status: 500 });
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
    const { searchParams } = new URL(request.url);
    const forceHardDelete = searchParams.get('hard') === 'true';

    const db = getD1();

    // Check if dhikr is referenced in routine_dhikrs
    const usage = await db
      .prepare('SELECT COUNT(*) as count FROM routine_dhikrs WHERE dhikr_id = ?')
      .bind(id)
      .first<{ count: number }>();

    if (usage && usage.count > 0 && forceHardDelete) {
      return NextResponse.json(
        { success: false, error: `Dhikr is in use by ${usage.count} routine(s). Deactivate instead of deleting.` },
        { status: 400 }
      );
    }

    if (forceHardDelete && (!usage || usage.count === 0)) {
      await db.prepare('DELETE FROM dhikrs WHERE id = ?').bind(id).run();
      return NextResponse.json({ success: true, message: 'Dhikr deleted' });
    }

    // Soft deactivation (preferred)
    await db
      .prepare('UPDATE dhikrs SET is_active = 0, updated_at = ? WHERE id = ?')
      .bind(new Date().toISOString(), id)
      .run();

    return NextResponse.json({ success: true, message: 'Dhikr deactivated' });
  } catch (err) {
    console.error('API Error in DELETE /api/admin/dhikrs/:id:', err);
    return NextResponse.json({ success: false, error: 'Failed to deactivate dhikr' }, { status: 500 });
  }
}
