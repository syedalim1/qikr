'use client';

import { useEffect, useState } from 'react';

interface AnalyticsData {
  overview: {
    totalSessions: number;
    completedSessions: number;
    totalRecitations: number;
    totalDevices: number;
  };
  mostUsedRoutines: any[];
  mostUsedDhikrs: any[];
  recentCompletions: any[];
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setData(json.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="py-20 text-center text-zinc-500 text-sm">Loading database analytics...</div>;
  }

  const overview = data?.overview || {
    totalSessions: 0,
    completedSessions: 0,
    totalRecitations: 0,
    totalDevices: 0,
  };

  return (
    <div className="space-y-6">
      {/* ─── Header ──────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Database Analytics</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Aggregated usage statistics across Cloudflare D1 database records
        </p>
      </div>

      {/* ─── High-Level Summary ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Unique Devices</p>
          <p className="text-3xl font-extrabold text-white mt-1">{overview.totalDevices}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Sessions</p>
          <p className="text-3xl font-extrabold text-white mt-1">{overview.totalSessions}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Completed Routines</p>
          <p className="text-3xl font-extrabold text-emerald-400 mt-1">{overview.completedSessions}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Recitations</p>
          <p className="text-3xl font-extrabold text-white mt-1">
            {overview.totalRecitations.toLocaleString()}
          </p>
        </div>
      </div>

      {/* ─── Tables ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Recited Dhikrs */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xs">
          <h3 className="text-sm font-bold text-white mb-3">Top Recited Dhikrs</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-zinc-500 uppercase border-b border-zinc-800 text-[10px]">
                <tr>
                  <th className="py-2">Dhikr</th>
                  <th className="py-2">Mode</th>
                  <th className="py-2 text-right">Total Taps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {(!data?.mostUsedDhikrs || data.mostUsedDhikrs.length === 0) ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-zinc-500">
                      No Dhikr recitations recorded yet.
                    </td>
                  </tr>
                ) : (
                  data.mostUsedDhikrs.map((d: any) => (
                    <tr key={d.dhikr_id}>
                      <td className="py-2.5 font-medium text-white">{d.dhikr_name || d.dhikr_id}</td>
                      <td className="py-2.5 text-zinc-400">{d.mode}</td>
                      <td className="py-2.5 text-right font-bold text-emerald-400">
                        {d.total_recitations.toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Most Completed Routines */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xs">
          <h3 className="text-sm font-bold text-white mb-3">Routines Ranking</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-zinc-500 uppercase border-b border-zinc-800 text-[10px]">
                <tr>
                  <th className="py-2">Routine</th>
                  <th className="py-2 text-center">Completions</th>
                  <th className="py-2 text-right">Recitations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {(!data?.mostUsedRoutines || data.mostUsedRoutines.length === 0) ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-zinc-500">
                      No routine completions recorded yet.
                    </td>
                  </tr>
                ) : (
                  data.mostUsedRoutines.map((r: any) => (
                    <tr key={r.routine_id}>
                      <td className="py-2.5 font-medium text-white flex items-center gap-1.5">
                        <span>{r.icon || '📿'}</span>
                        <span>{r.routine_name || r.routine_id}</span>
                      </td>
                      <td className="py-2.5 text-center font-bold text-white">{r.total_completions}</td>
                      <td className="py-2.5 text-right font-bold text-emerald-400">
                        {r.total_taps.toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ─── Recent Completions ──────────────────────────────────────── */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xs">
        <h3 className="text-sm font-bold text-white mb-3">Recent Routine Completions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-zinc-500 uppercase border-b border-zinc-800 text-[10px]">
              <tr>
                <th className="py-2">Routine</th>
                <th className="py-2">Date</th>
                <th className="py-2">Device</th>
                <th className="py-2 text-right">Recitations</th>
                <th className="py-2 text-right">Completed At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {(!data?.recentCompletions || data.recentCompletions.length === 0) ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-zinc-500">
                    No recent completions.
                  </td>
                </tr>
              ) : (
                data.recentCompletions.map((item: any) => (
                  <tr key={item.id}>
                    <td className="py-2.5 font-medium text-white flex items-center gap-1.5">
                      <span>{item.routine_icon || '📿'}</span>
                      <span>{item.routine_name || item.routine_id}</span>
                    </td>
                    <td className="py-2.5 text-zinc-400">{item.date}</td>
                    <td className="py-2.5 font-mono text-[11px] text-zinc-400">{item.device_id.slice(0, 12)}...</td>
                    <td className="py-2.5 text-right font-bold text-emerald-400">{item.completed_count}</td>
                    <td className="py-2.5 text-right text-zinc-400">{new Date(item.completed_at).toLocaleTimeString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
