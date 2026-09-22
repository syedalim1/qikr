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

    const progress = await db
      .prepare(`
        SELECT * FROM user_progress 
        WHERE device_id = ? AND session_status = 'active'
        ORDER BY updated_at DESC
        LIMIT 1
      `)
      .bind(deviceId)
      .first<any>();

    if (!progress) {
      return NextResponse.json({ success: true, data: null });
    }

    const steps = await db
      .prepare(`
        SELECT * FROM dhikr_progress 
        WHERE session_id = ?
        ORDER BY dhikr_index ASC
      `)
      .bind(progress.id)
      .all();

    return NextResponse.json({
      success: true,
      data: {
        sessionId: progress.id,
        routineId: progress.routine_id,
        currentDhikrId: progress.current_dhikr_id,
        currentDhikrIndex: progress.current_dhikr_index,
        remainingCount: progress.remaining_count,
        completedDhikrCount: progress.completed_dhikr_count,
        totalDhikrCount: progress.total_dhikr_count,
        continuousCount: progress.continuous_count,
        sessionStatus: progress.session_status,
        startedAt: progress.started_at,
        updatedAt: progress.updated_at,
        selectedLanguage: progress.selected_language,
        dhikrEntries: (steps.results as any[]).map((s) => ({
          dhikrId: s.dhikr_id,
          dhikrIndex: s.dhikr_index,
          targetCount: s.target_count,
          completedCount: s.completed_count,
          isComplete: Boolean(s.is_complete),
          startedAt: s.started_at,
          completedAt: s.completed_at,
        })),
      },
    });
  } catch (err) {
    console.error('API Error in GET /api/progress/:deviceId:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve progress' },
      { status: 500 }
    );
  }
}
