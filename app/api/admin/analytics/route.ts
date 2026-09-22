import { NextResponse, type NextRequest } from 'next/server';
import { getD1 } from '@/app/_server/d1';
import { verifyAdminAuth } from '@/app/_server/adminAuth';

export async function GET(request: NextRequest) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = getD1();

    const [
      overview,
      mostUsedRoutines,
      mostUsedDhikrs,
      recentCompletions,
    ] = await Promise.all([
      db.prepare(`
        SELECT 
          (SELECT COUNT(*) FROM user_progress) as total_sessions,
          (SELECT COUNT(*) FROM daily_history WHERE completed = 1) as completed_sessions,
          (SELECT COALESCE(SUM(completed_count), 0) FROM daily_history) as total_recitations,
          (SELECT COUNT(DISTINCT device_id) FROM devices) as total_devices
      `).first<any>(),
      db.prepare(`
        SELECT 
          h.routine_id,
          r.name as routine_name,
          r.icon,
          COUNT(*) as total_completions,
          COALESCE(SUM(h.completed_count), 0) as total_taps
        FROM daily_history h
        LEFT JOIN routines r ON h.routine_id = r.id
        GROUP BY h.routine_id
        ORDER BY total_completions DESC
        LIMIT 10
      `).all(),
      db.prepare(`
        SELECT 
          dp.dhikr_id,
          d.name as dhikr_name,
          d.mode,
          COUNT(*) as completion_count,
          COALESCE(SUM(dp.completed_count), 0) as total_recitations
        FROM dhikr_progress dp
        JOIN dhikrs d ON dp.dhikr_id = d.id
        GROUP BY dp.dhikr_id
        ORDER BY total_recitations DESC
        LIMIT 10
      `).all(),
      db.prepare(`
        SELECT 
          h.*,
          r.name as routine_name,
          r.icon as routine_icon
        FROM daily_history h
        LEFT JOIN routines r ON h.routine_id = r.id
        ORDER BY h.completed_at DESC
        LIMIT 15
      `).all(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalSessions: overview?.total_sessions || 0,
          completedSessions: overview?.completed_sessions || 0,
          totalRecitations: overview?.total_recitations || 0,
          totalDevices: overview?.total_devices || 0,
        },
        mostUsedRoutines: mostUsedRoutines.results || [],
        mostUsedDhikrs: mostUsedDhikrs.results || [],
        recentCompletions: recentCompletions.results || [],
      },
    });
  } catch (err) {
    console.error('API Error in GET /api/admin/analytics:', err);
    return NextResponse.json({ success: false, error: 'Failed to load analytics' }, { status: 500 });
  }
}
