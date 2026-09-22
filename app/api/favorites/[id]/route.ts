import { NextResponse, type NextRequest } from 'next/server';
import { getD1 } from '@/app/_server/d1';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: dhikrId } = await params;
    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get('deviceId');

    if (!dhikrId) {
      return NextResponse.json({ success: false, error: 'Favorite dhikrId required' }, { status: 400 });
    }
    if (!deviceId) {
      return NextResponse.json({ success: false, error: 'deviceId query parameter required' }, { status: 400 });
    }

    const db = getD1();

    await db
      .prepare('DELETE FROM favorites WHERE device_id = ? AND dhikr_id = ?')
      .bind(deviceId, dhikrId)
      .run();

    return NextResponse.json({ success: true, removedId: dhikrId });
  } catch (err) {
    console.error('API Error in DELETE /api/favorites/:id:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to remove favorite' },
      { status: 500 }
    );
  }
}
