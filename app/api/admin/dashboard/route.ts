import { NextResponse, type NextRequest } from 'next/server';
import { getD1 } from '@/app/_server/d1';
import { verifyAdminAuth } from '@/app/_server/adminAuth';

export async function GET(request: NextRequest) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = getD1();
    const today = new Date().toISOString().slice(0, 10);
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);

    const [
      dhikrsCount,
      activeDhikrsCount,
      routinesCount,
      activeRoutinesCount,
      sessionsCount,
      historyStats,
      todayHistory,
      weekHistory,
      popularRoutines,
    ] = await Promise.all([
      db.prepare('SELECT COUNT(*) as count FROM dhikrs').first<{ count: number }>(),
      db.prepare('SELECT COUNT(*) as count FROM dhikrs WHERE is_active = 1').first<{ count: number }>(),
      db.prepare('SELECT COUNT(*) as count FROM routines').first<{ count: number }>(),
      db.prepare('SELECT COUNT(*) as count FROM routines WHERE is_active = 1').first<{ count: number }>(),
      db.prepare('SELECT COUNT(*) as count FROM user_progress').first<{ count: number }>(),
      db.prepare(`
        SELECT 
          COUNT(*) as total_completed,
          COALESCE(SUM(completed_count), 0) as total_recitations
        FROM daily_history
      `).first<{ total_completed: number; total_recitations: number }>(),
      db.prepare('SELECT COUNT(*) as count, COALESCE(SUM(completed_count), 0) as recitations FROM daily_history WHERE date = ?')
        .bind(today)
        .first<{ count: number; recitations: number }>(),
      db.prepare('SELECT COUNT(*) as count, COALESCE(SUM(completed_count), 0) as recitations FROM daily_history WHERE date >= ?')
        .bind(weekAgo)
        .first<{ count: number; recitations: number }>(),
      db.prepare(`
        SELECT 
          h.routine_id,
          r.name,
          r.icon,
          COUNT(*) as completion_count,
          SUM(h.completed_count) as total_recitations
        FROM daily_history h
        LEFT JOIN routines r ON h.routine_id = r.id
        GROUP BY h.routine_id
        ORDER BY completion_count DESC
        LIMIT 5
      `).all(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalDhikrs: dhikrsCount?.count || 0,
        activeDhikrs: activeDhikrsCount?.count || 0,
        totalRoutines: routinesCount?.count || 0,
        activeRoutines: activeRoutinesCount?.count || 0,
        totalSessions: sessionsCount?.count || 0,
        completedRoutines: historyStats?.total_completed || 0,
        totalRecitations: historyStats?.total_recitations || 0,
        todayActivity: {
          completions: todayHistory?.count || 0,
          recitations: todayHistory?.recitations || 0,
        },
        weekActivity: {
          completions: weekHistory?.count || 0,
          recitations: weekHistory?.recitations || 0,
        },
        popularRoutines: popularRoutines.results || [],
      },
    });
  } catch (err) {
    console.error('API Error in GET /api/admin/dashboard:', err);
    return NextResponse.json({ success: false, error: 'Failed to load dashboard metrics' }, { status: 500 });
  }
}
