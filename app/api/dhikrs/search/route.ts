import { NextResponse, type NextRequest } from 'next/server';
import { getD1 } from '@/app/_server/d1';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim() || '';

    if (!query) {
      return NextResponse.json({ success: true, data: [] });
    }

    const db = getD1();
    const pattern = `%${query}%`;

    const result = await db
      .prepare(`
        SELECT * FROM dhikrs 
        WHERE is_active = 1 
          AND (name LIKE ? OR english_text LIKE ? OR arabic_text LIKE ? OR tamil_text LIKE ?)
        ORDER BY id ASC
        LIMIT 50
      `)
      .bind(pattern, pattern, pattern, pattern)
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
    console.error('API Error in GET /api/dhikrs/search:', err);
    return NextResponse.json(
      { success: false, error: 'Search failed' },
      { status: 500 }
    );
  }
}
