import { NextResponse, type NextRequest } from 'next/server';
import { getD1 } from '@/app/_server/d1';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ success: false, error: 'Invalid routine ID' }, { status: 400 });
    }

    const db = getD1();

    const routine = await db
      .prepare('SELECT * FROM routines WHERE id = ? AND is_active = 1')
      .bind(id)
      .first<any>();

    if (!routine) {
      return NextResponse.json({ success: false, error: 'Routine not found' }, { status: 404 });
    }

    const rdResult = await db
      .prepare(`
        SELECT 
          rd.display_order,
          rd.count_override,
          d.*
        FROM routine_dhikrs rd
        JOIN dhikrs d ON rd.dhikr_id = d.id
        WHERE rd.routine_id = ? AND rd.is_active = 1 AND d.is_active = 1
        ORDER BY rd.display_order ASC
      `)
      .bind(id)
      .all();

    const dhikrs = (rdResult.results as any[]).map((row) => ({
      id: row.id,
      name: row.name,
      count: row.count_override || row.default_count,
      type: row.mode.toLowerCase(),
      title: {
        english: row.name,
        arabic: row.name,
        tamil: row.name,
        pronunciation: row.pronunciation,
      },
      content: {
        arabic: row.arabic_text,
        tamil: row.tamil_text,
        english: row.english_text,
        pronunciation: row.pronunciation,
        meaning: row.meaning_english,
        source: row.source_reference,
      },
    }));

    const formatted = {
      id: routine.id,
      name: routine.name,
      description: routine.description,
      recommendedTime: routine.time_of_day,
      emoji: routine.icon,
      completionNote: routine.completion_note,
      title: {
        english: routine.name,
        arabic: routine.name,
        tamil: routine.name,
      },
      dhikrs,
    };

    return NextResponse.json({ success: true, data: formatted });
  } catch (err) {
    console.error('API Error in GET /api/routines/:id:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
