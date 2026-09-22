import { NextResponse } from 'next/server';
import { getD1 } from '@/app/_server/d1';

export async function GET() {
  try {
    const db = getD1();
    const result = await db
      .prepare('SELECT * FROM dhikrs WHERE is_active = 1 ORDER BY id ASC')
      .all();

    const dhikrs = (result.results as any[]).map((row) => ({
      id: row.id,
      name: row.name,
      count: row.default_count,
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

    return NextResponse.json({ success: true, data: dhikrs });
  } catch (err) {
    console.error('API Error in GET /api/dhikrs:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve dhikrs' },
      { status: 500 }
    );
  }
}
