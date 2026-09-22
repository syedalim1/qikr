import { NextResponse, type NextRequest } from 'next/server';
import { getD1 } from '@/app/_server/d1';
import { verifyAdminAuth } from '@/app/_server/adminAuth';

export async function GET(request: NextRequest) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.trim() || '';
    const status = searchParams.get('status'); // 'active', 'inactive', or null/all
    const mode = searchParams.get('mode'); // 'FIXED', 'CONTINUOUS', 'SCRIPTURE', or null/all

    const db = getD1();
    let query = 'SELECT * FROM dhikrs WHERE 1=1';
    const params: any[] = [];

    if (search) {
      query += ' AND (name LIKE ? OR arabic_text LIKE ? OR tamil_text LIKE ? OR english_text LIKE ?)';
      const p = `%${search}%`;
      params.push(p, p, p, p);
    }

    if (status === 'active') {
      query += ' AND is_active = 1';
    } else if (status === 'inactive') {
      query += ' AND is_active = 0';
    }

    if (mode && ['FIXED', 'CONTINUOUS', 'SCRIPTURE'].includes(mode)) {
      query += ' AND mode = ?';
      params.push(mode);
    }

    query += ' ORDER BY id ASC';

    const result = await db.prepare(query).bind(...params).all();
    return NextResponse.json({ success: true, data: result.results });
  } catch (err) {
    console.error('API Error in GET /api/admin/dhikrs:', err);
    return NextResponse.json({ success: false, error: 'Failed to load dhikrs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      id,
      name,
      arabic_text,
      tamil_text,
      english_text,
      pronunciation,
      meaning_tamil,
      meaning_english,
      default_count,
      mode = 'FIXED',
      source_reference,
      display_note,
      is_active = 1,
    } = body;

    // Strict validation
    if (!name?.trim()) return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
    if (!arabic_text?.trim()) return NextResponse.json({ success: false, error: 'Arabic text is required' }, { status: 400 });
    if (!tamil_text?.trim()) return NextResponse.json({ success: false, error: 'Tamil text is required' }, { status: 400 });
    if (!english_text?.trim()) return NextResponse.json({ success: false, error: 'English text is required' }, { status: 400 });

    if (!['FIXED', 'CONTINUOUS', 'SCRIPTURE'].includes(mode)) {
      return NextResponse.json({ success: false, error: 'Mode must be FIXED, CONTINUOUS, or SCRIPTURE' }, { status: 400 });
    }

    let count = parseInt(default_count, 10);
    if (mode === 'FIXED') {
      if (isNaN(count) || count < 1) {
        return NextResponse.json({ success: false, error: 'Fixed mode requires a count greater than 0' }, { status: 400 });
      }
    } else if (mode === 'CONTINUOUS') {
      count = 0;
    } else {
      count = isNaN(count) || count < 1 ? 1 : count;
    }

    const dhikrId = id?.trim() || `dhikr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();
    const db = getD1();

    await db
      .prepare(`
        INSERT INTO dhikrs (
          id, name, arabic_text, tamil_text, english_text,
          pronunciation, meaning_tamil, meaning_english,
          default_count, mode, source_reference, display_note,
          is_active, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        dhikrId,
        name.trim(),
        arabic_text.trim(),
        tamil_text.trim(),
        english_text.trim(),
        pronunciation?.trim() || null,
        meaning_tamil?.trim() || null,
        meaning_english?.trim() || null,
        count,
        mode,
        source_reference?.trim() || null,
        display_note?.trim() || null,
        is_active ? 1 : 0,
        now,
        now
      )
      .run();

    return NextResponse.json({ success: true, id: dhikrId, message: 'Dhikr created successfully' });
  } catch (err: any) {
    console.error('API Error in POST /api/admin/dhikrs:', err);
    return NextResponse.json({ success: false, error: 'Failed to create Dhikr' }, { status: 500 });
  }
}
