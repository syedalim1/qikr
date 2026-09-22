import { NextResponse, type NextRequest } from 'next/server';
import { getD1 } from '@/app/_server/d1';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sessionId,
      deviceId,
      routineId,
      currentDhikrId,
      currentDhikrIndex,
      remainingCount,
      completedDhikrCount,
      totalDhikrCount,
      continuousCount,
      sessionStatus = 'active',
      startedAt,
      selectedLanguage = 'ta',
      dhikrEntries = [],
    } = body;

    // Strict Server-Side Validation
    if (!deviceId || typeof deviceId !== 'string') {
      return NextResponse.json({ success: false, error: 'Valid deviceId required' }, { status: 400 });
    }
    if (!routineId || typeof routineId !== 'string') {
      return NextResponse.json({ success: false, error: 'Valid routineId required' }, { status: 400 });
    }
    if (typeof remainingCount !== 'number' || remainingCount < 0) {
      return NextResponse.json({ success: false, error: 'remainingCount cannot be negative' }, { status: 400 });
    }
    if (typeof currentDhikrIndex !== 'number' || currentDhikrIndex < 0) {
      return NextResponse.json({ success: false, error: 'Invalid currentDhikrIndex' }, { status: 400 });
    }

    const db = getD1();
    const now = new Date().toISOString();
    const sid = sessionId || `sess_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

    // Ensure device is registered
    await db
      .prepare(`
        INSERT INTO devices (id, created_at, last_active_at)
        VALUES (?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET last_active_at = ?
      `)
      .bind(deviceId, now, now, now)
      .run();

    // Upsert user_progress
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
        routineId,
        currentDhikrId || '',
        currentDhikrIndex,
        Math.max(0, remainingCount),
        completedDhikrCount || 0,
        totalDhikrCount || 0,
        continuousCount || 0,
        sessionStatus,
        startedAt || now,
        now,
        selectedLanguage
      )
      .run();

    // Sync dhikr steps if provided
    if (Array.isArray(dhikrEntries)) {
      for (const entry of dhikrEntries) {
        if (!entry.dhikrId) continue;
        const stepId = `${sid}_${entry.dhikrIndex}`;
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
            routineId,
            entry.dhikrId,
            entry.dhikrIndex,
            entry.targetCount || 0,
            entry.completedCount || 0,
            entry.isComplete ? 1 : 0,
            entry.startedAt || now,
            entry.completedAt || null
          )
          .run();
      }
    }

    return NextResponse.json({ success: true, sessionId: sid, updatedAt: now });
  } catch (err) {
    console.error('API Error in POST /api/progress:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}
