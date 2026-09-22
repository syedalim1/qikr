import { NextResponse, type NextRequest } from 'next/server';
import { getD1 } from '@/app/_server/d1';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ deviceId: string }> }
) {
  try {
    const { deviceId } = await params;
    if (!deviceId) {
      return NextResponse.json({ success: false, error: 'Device ID required' }, { status: 400 });
    }

    const db = getD1();

    const row = await db
      .prepare('SELECT * FROM app_settings WHERE device_id = ?')
      .bind(deviceId)
      .first<any>();

    if (!row) {
      return NextResponse.json({
        success: true,
        data: null,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        language: row.language,
        theme: row.theme,
        soundPreference: Boolean(row.sound_preference),
        vibrationPreference: Boolean(row.vibration_preference),
        wakeLockPreference: Boolean(row.wake_lock_preference),
        notificationPreference: Boolean(row.notification_preference),
        hourlyReminder: Boolean(row.hourly_reminder),
        updatedAt: row.updated_at,
      },
    });
  } catch (err) {
    console.error('API Error in GET /api/settings/:deviceId:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve settings' },
      { status: 500 }
    );
  }
}
