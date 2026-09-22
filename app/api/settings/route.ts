import { NextResponse, type NextRequest } from 'next/server';
import { getD1 } from '@/app/_server/d1';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      deviceId,
      language = 'ta',
      theme = 'system',
      soundPreference = true,
      vibrationPreference = true,
      wakeLockPreference = false,
      notificationPreference = false,
      hourlyReminder = false,
    } = body;

    if (!deviceId || typeof deviceId !== 'string') {
      return NextResponse.json({ success: false, error: 'Valid deviceId required' }, { status: 400 });
    }

    const db = getD1();
    const now = new Date().toISOString();

    await db
      .prepare(`
        INSERT INTO app_settings (
          device_id, language, theme, sound_preference, vibration_preference,
          wake_lock_preference, notification_preference, hourly_reminder, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(device_id) DO UPDATE SET
          language = excluded.language,
          theme = excluded.theme,
          sound_preference = excluded.sound_preference,
          vibration_preference = excluded.vibration_preference,
          wake_lock_preference = excluded.wake_lock_preference,
          notification_preference = excluded.notification_preference,
          hourly_reminder = excluded.hourly_reminder,
          updated_at = excluded.updated_at
      `)
      .bind(
        deviceId,
        language,
        theme,
        soundPreference ? 1 : 0,
        vibrationPreference ? 1 : 0,
        wakeLockPreference ? 1 : 0,
        notificationPreference ? 1 : 0,
        hourlyReminder ? 1 : 0,
        now
      )
      .run();

    return NextResponse.json({ success: true, updatedAt: now });
  } catch (err) {
    console.error('API Error in POST /api/settings:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
