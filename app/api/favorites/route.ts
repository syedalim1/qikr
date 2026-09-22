import { NextResponse, type NextRequest } from 'next/server';
import { getD1 } from '@/app/_server/d1';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get('deviceId');

    if (!deviceId) {
      return NextResponse.json({ success: false, error: 'deviceId parameter required' }, { status: 400 });
    }

    const db = getD1();
    const result = await db
      .prepare('SELECT dhikr_id, created_at FROM favorites WHERE device_id = ? ORDER BY created_at DESC')
      .bind(deviceId)
      .all();

    return NextResponse.json({
      success: true,
      data: (result.results as any[]).map((r) => r.dhikr_id),
    });
  } catch (err) {
    console.error('API Error in GET /api/favorites:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve favorites' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { deviceId, dhikrId } = body;

    if (!deviceId || typeof deviceId !== 'string') {
      return NextResponse.json({ success: false, error: 'deviceId required' }, { status: 400 });
    }
    if (!dhikrId || typeof dhikrId !== 'string') {
      return NextResponse.json({ success: false, error: 'dhikrId required' }, { status: 400 });
    }

    const db = getD1();
    const now = new Date().toISOString();
    const favId = `${deviceId}_${dhikrId}`;

    await db
      .prepare(`
        INSERT INTO favorites (id, device_id, dhikr_id, created_at)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(device_id, dhikr_id) DO NOTHING
      `)
      .bind(favId, deviceId, dhikrId, now)
      .run();

    return NextResponse.json({ success: true, dhikrId, favorited: true });
  } catch (err) {
    console.error('API Error in POST /api/favorites:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to add favorite' },
      { status: 500 }
    );
  }
}
