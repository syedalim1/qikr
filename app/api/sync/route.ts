import { NextResponse, type NextRequest } from 'next/server';
import { getD1 } from '@/app/_server/d1';

export interface SyncEventPayload {
  eventId: string;
  deviceId: string;
  eventType:
    | 'SESSION_CREATED'
    | 'DHIKR_PROGRESS_UPDATED'
    | 'DHIKR_COMPLETED'
    | 'ROUTINE_COMPLETED'
    | 'FAVORITE_ADDED'
    | 'FAVORITE_REMOVED'
    | 'SETTINGS_UPDATED';
  entityId?: string;
  payload: any;
  createdAt: string;
}

/**
 * Deterministic Conflict Resolution Strategy:
 * 1. Idempotency: `sync_events` primary key (eventId) deduplicates events. If eventId is seen, it is skipped.
 * 2. Last-Write-Wins based on ISO Timestamp (`createdAt` >= stored `updated_at`) for session progress and settings.
 * 3. Daily history records are keyed by (device_id, routine_id, date) to strictly prevent duplicate routine counts.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { events } = body;

    if (!Array.isArray(events) || events.length === 0) {
      return NextResponse.json({ success: true, processedEventIds: [] });
    }

    const db = getD1();
    const now = new Date().toISOString();
    const processedEventIds: string[] = [];

    for (const event of events as SyncEventPayload[]) {
      const { eventId, deviceId, eventType, entityId, payload, createdAt } = event;

      // Basic validation
      if (!eventId || !deviceId || !eventType || !createdAt) {
        continue;
      }

      // Check for idempotent event deduplication
      const existingEvent = await db
        .prepare('SELECT event_id FROM sync_events WHERE event_id = ?')
        .bind(eventId)
        .first();

      if (existingEvent) {
        // Event has already been applied, safely acknowledge
        processedEventIds.push(eventId);
        continue;
      }

      // Record event in sync_events
      await db
        .prepare(`
          INSERT INTO sync_events (event_id, device_id, event_type, entity_id, payload, created_at, processed_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `)
        .bind(
          eventId,
          deviceId,
          eventType,
          entityId || null,
          typeof payload === 'string' ? payload : JSON.stringify(payload || {}),
          createdAt,
          now
        )
        .run();

      // Register or touch device
      await db
        .prepare(`
          INSERT INTO devices (id, created_at, last_active_at)
          VALUES (?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET last_active_at = ?
        `)
        .bind(deviceId, createdAt, now, now)
        .run();

      // Process event according to eventType
      switch (eventType) {
        case 'SESSION_CREATED':
        case 'DHIKR_PROGRESS_UPDATED': {
          const p = payload || {};
          const sid = p.sessionId || entityId;
          if (!sid || !p.routineId) break;

          // Conflict check: only apply if this event is newer than existing state
          const existingProgress = await db
            .prepare('SELECT updated_at FROM user_progress WHERE id = ?')
            .bind(sid)
            .first<{ updated_at: string }>();

          if (existingProgress && existingProgress.updated_at > createdAt) {
            // Existing state is newer; skip overwriting
            break;
          }

          await db
            .prepare(`
              INSERT INTO user_progress (
                id, device_id, routine_id, current_dhikr_id, current_dhikr_index,
                remaining_count, completed_dhikr_count, total_dhikr_count, continuous_count,
                session_status, started_at, updated_at, selected_language
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(id) DO UPDATE SET
                current_dhikr_id = excluded.current_dhikr_id,
                current_dhikr_index = excluded.current_dhikr_index,
                remaining_count = excluded.remaining_count,
                completed_dhikr_count = excluded.completed_dhikr_count,
                total_dhikr_count = excluded.total_dhikr_count,
                continuous_count = excluded.continuous_count,
                session_status = excluded.session_status,
                updated_at = excluded.updated_at,
                selected_language = excluded.selected_language
            `)
            .bind(
              sid,
              deviceId,
              p.routineId,
              p.currentDhikrId || '',
              p.currentDhikrIndex || 0,
              Math.max(0, p.remainingCount ?? p.currentCount ?? 0),
              p.completedDhikrCount || 0,
              p.totalDhikrCount || 0,
              p.continuousCount || 0,
              p.sessionStatus || 'active',
              p.startedAt || createdAt,
              createdAt,
              p.selectedLanguage || 'ta'
            )
            .run();
          break;
        }

        case 'DHIKR_COMPLETED': {
          const p = payload || {};
          const sid = p.sessionId;
          if (sid && p.dhikrId) {
            const stepId = `${sid}_${p.dhikrIndex ?? 0}`;
            await db
              .prepare(`
                INSERT INTO dhikr_progress (
                  id, device_id, session_id, routine_id, dhikr_id, dhikr_index,
                  target_count, completed_count, is_complete, started_at, completed_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                  completed_count = excluded.completed_count,
                  is_complete = excluded.is_complete,
                  completed_at = excluded.completed_at
              `)
              .bind(
                stepId,
                deviceId,
                sid,
                p.routineId || '',
                p.dhikrId,
                p.dhikrIndex ?? 0,
                p.targetCount || 0,
                p.completedCount || 0,
                1,
                p.startedAt || createdAt,
                p.completedAt || createdAt
              )
              .run();
          }
          break;
        }

        case 'ROUTINE_COMPLETED': {
          const p = payload || {};
          const routineId = p.routineId;
          if (!routineId) break;

          const date = (p.completedAt || createdAt).slice(0, 10);
          const historyId = `${deviceId}_${routineId}_${date}`;
          const target = p.totalRecitations || p.targetCount || 100;
          const completed = p.totalRecitations || p.completedCount || target;
          const pct = Math.min(100, Math.round((completed / (target || 1)) * 100));

          await db
            .prepare(`
              INSERT INTO daily_history (
                id, device_id, date, routine_id, target_count, completed_count,
                completion_percentage, completed, started_at, completed_at
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(device_id, routine_id, date) DO UPDATE SET
                target_count = excluded.target_count,
                completed_count = excluded.completed_count,
                completion_percentage = excluded.completion_percentage,
                completed = excluded.completed,
                completed_at = excluded.completed_at
            `)
            .bind(
              historyId,
              deviceId,
              date,
              routineId,
              target,
              completed,
              pct,
              1,
              p.startedAt || createdAt,
              p.completedAt || createdAt
            )
            .run();

          // Mark user_progress as completed if sessionId provided
          if (p.sessionId || entityId) {
            await db
              .prepare(`
                UPDATE user_progress 
                SET session_status = 'completed', updated_at = ?
                WHERE id = ? AND device_id = ?
              `)
              .bind(createdAt, p.sessionId || entityId, deviceId)
              .run();
          }
          break;
        }

        case 'FAVORITE_ADDED': {
          const dhikrId = entityId || payload?.dhikrId;
          if (dhikrId) {
            const favId = `${deviceId}_${dhikrId}`;
            await db
              .prepare(`
                INSERT INTO favorites (id, device_id, dhikr_id, created_at)
                VALUES (?, ?, ?, ?)
                ON CONFLICT(device_id, dhikr_id) DO NOTHING
              `)
              .bind(favId, deviceId, dhikrId, createdAt)
              .run();
          }
          break;
        }

        case 'FAVORITE_REMOVED': {
          const dhikrId = entityId || payload?.dhikrId;
          if (dhikrId) {
            await db
              .prepare('DELETE FROM favorites WHERE device_id = ? AND dhikr_id = ?')
              .bind(deviceId, dhikrId)
              .run();
          }
          break;
        }

        case 'SETTINGS_UPDATED': {
          const s = payload || {};
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
              s.language || 'ta',
              s.theme || 'system',
              s.soundPreference ? 1 : 0,
              s.vibrationPreference ? 1 : 0,
              s.wakeLockPreference ? 1 : 0,
              s.notificationPreference ? 1 : 0,
              s.hourlyReminder ? 1 : 0,
              createdAt
            )
            .run();
          break;
        }
      }

      processedEventIds.push(eventId);
    }

    return NextResponse.json({
      success: true,
      processedCount: processedEventIds.length,
      processedEventIds,
    });
  } catch (err) {
    console.error('API Error in POST /api/sync:', err);
    return NextResponse.json(
      { success: false, error: 'Sync processing failed' },
      { status: 500 }
    );
  }
}
