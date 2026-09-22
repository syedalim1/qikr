import { NextResponse, type NextRequest } from 'next/server';
import { getD1 } from '@/app/_server/d1';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ deviceId: string }> }
) {
  try {
    const { deviceId } = await params;
    if (!deviceId) {
      return NextResponse.json({ success: false, error: 'Device ID required' }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'all';

    const db = getD1();

    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toISOString().slice(0, 10);
    const weekDate = new Date();
    weekDate.setDate(weekDate.getDate() - 7);
    const weekAgo = weekDate.toISOString().slice(0, 10);
    const monthDate = new Date();
    monthDate.setDate(monthDate.getDate() - 30);
    const monthAgo = monthDate.toISOString().slice(0, 10);

    let query = `
      SELECT h.*, r.name as routine_name, r.icon as routine_icon
      FROM daily_history h
      LEFT JOIN routines r ON h.routine_id = r.id
      WHERE h.device_id = ?
    `;
    const queryParams: any[] = [deviceId];

    if (period === 'today') {
      query += ' AND h.date = ?';
      queryParams.push(today);
    } else if (period === 'yesterday') {
      query += ' AND h.date = ?';
      queryParams.push(yesterday);
    } else if (period === 'week') {
      query += ' AND h.date >= ?';
      queryParams.push(weekAgo);
    } else if (period === 'month') {
      query += ' AND h.date >= ?';
      queryParams.push(monthAgo);
    }

    query += ' ORDER BY h.completed_at DESC LIMIT 100';

    const result = await db.prepare(query).bind(...queryParams).all();

    const formatted = (result.results as any[]).map((row) => ({
      id: row.id,
      date: row.date,
      routineId: row.routine_id,
      routineName: row.routine_name || row.routine_id,
      routineIcon: row.routine_icon || '📿',
      targetCount: row.target_count,
      completedCount: row.completed_count,
      completionPercentage: row.completion_percentage,
      completed: Boolean(row.completed),
      startedAt: row.started_at,
      completedAt: row.completed_at,
    }));

    return NextResponse.json({ success: true, data: formatted });
  } catch (err) {
    console.error('API Error in GET /api/history/:deviceId:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve history' },
      { status: 500 }
    );
  }
}
