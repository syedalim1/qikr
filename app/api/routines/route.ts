import { NextResponse } from 'next/server';
import { getD1 } from '@/app/_server/d1';

export async function GET() {
  try {
    const db = getD1();

    const routinesResult = await db
      .prepare('SELECT * FROM routines WHERE is_active = 1 ORDER BY id ASC')
      .all();

    const rdResult = await db
      .prepare(`
        SELECT 
          rd.routine_id,
          rd.display_order,
          rd.count_override,
          d.*
        FROM routine_dhikrs rd
        JOIN dhikrs d ON rd.dhikr_id = d.id
        WHERE rd.is_active = 1 AND d.is_active = 1
        ORDER BY rd.routine_id, rd.display_order ASC
      `)
      .all();

    const routineDhikrsMap: Record<string, any[]> = {};
    for (const row of rdResult.results as any[]) {
      if (!routineDhikrsMap[row.routine_id]) {
        routineDhikrsMap[row.routine_id] = [];
      }
      routineDhikrsMap[row.routine_id].push({
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
      });
    }

    const formatted = (routinesResult.results as any[]).map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      recommendedTime: r.time_of_day,
      emoji: r.icon,
      completionNote: r.completion_note,
      title: {
        english: r.name,
        arabic: r.name,
        tamil: r.name,
      },
      dhikrs: routineDhikrsMap[r.id] || [],
    }));

    return NextResponse.json({ success: true, data: formatted });
  } catch (err) {
    console.error('API Error in GET /api/routines:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve routines' },
      { status: 500 }
    );
  }
}
