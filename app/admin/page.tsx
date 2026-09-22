'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DashboardData {
  totalDhikrs: number;
  activeDhikrs: number;
  totalRoutines: number;
  activeRoutines: number;
  totalSessions: number;
  completedRoutines: number;
  totalRecitations: number;
  todayActivity: { completions: number; recitations: number };
  weekActivity: { completions: number; recitations: number };
  popularRoutines: any[];
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setData(json.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="py-20 text-center text-zinc-500 text-sm">Loading dashboard metrics...</div>;
  }

  const d = data || {
    totalDhikrs: 0,
    activeDhikrs: 0,
    totalRoutines: 0,
    activeRoutines: 0,
    totalSessions: 0,
    completedRoutines: 0,
    totalRecitations: 0,
    todayActivity: { completions: 0, recitations: 0 },
    weekActivity: { completions: 0, recitations: 0 },
    popularRoutines: [],
  };

  return (
    <div className="space-y-8">
      {/* ─── Header ──────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">System Overview</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Real-time metrics from Cloudflare D1 local-first database
        </p>
      </div>

      {/* ─── KPI Cards ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Dhikrs</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-white">{d.totalDhikrs}</span>
            <span className="text-xs text-emerald-400">{d.activeDhikrs} active</span>
          </div>
          <Link href="/admin/dhikrs" className="text-xs text-emerald-400 hover:text-emerald-300 mt-3 inline-block">
            Manage Dhikrs →
          </Link>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Routines</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-white">{d.totalRoutines}</span>
            <span className="text-xs text-emerald-400">{d.activeRoutines} active</span>
          </div>
          <Link href="/admin/routines" className="text-xs text-emerald-400 hover:text-emerald-300 mt-3 inline-block">
            Manage Routines →
          </Link>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Recitations</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-emerald-400">{d.totalRecitations.toLocaleString()}</span>
          </div>
          <p className="text-xs text-zinc-500 mt-3">From {d.completedRoutines} finished routines</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Active Sessions</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-white">{d.totalSessions}</span>
          </div>
          <p className="text-xs text-zinc-500 mt-3">Tracked in D1 database</p>
        </div>
      </div>

      {/* ─── Activity Breakdown ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Today's Activity */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">Today&apos;s Activity</h3>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
              <p className="text-xs text-zinc-400">Completed Routines</p>
              <p className="text-2xl font-bold text-white mt-1">{d.todayActivity.completions}</p>
            </div>
            <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
              <p className="text-xs text-zinc-400">Total Recitations</p>
              <p className="text-2xl font-bold text-emerald-400 mt-1">{d.todayActivity.recitations}</p>
            </div>
          </div>
        </div>

        {/* This Week's Activity */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">This Week&apos;s Activity</h3>
            <span className="text-xs text-zinc-500">Past 7 days</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
              <p className="text-xs text-zinc-400">Completed Routines</p>
              <p className="text-2xl font-bold text-white mt-1">{d.weekActivity.completions}</p>
            </div>
            <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
              <p className="text-xs text-zinc-400">Total Recitations</p>
              <p className="text-2xl font-bold text-emerald-400 mt-1">{d.weekActivity.recitations}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Popular Routines ────────────────────────────────────────── */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-sm font-bold text-white mb-4">Most Active Routines</h3>
        {d.popularRoutines.length === 0 ? (
          <p className="text-xs text-zinc-500 py-4 text-center">No completions recorded yet.</p>
        ) : (
          <div className="divide-y divide-zinc-800">
            {d.popularRoutines.map((r: any) => (
              <div key={r.routine_id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{r.icon || '📿'}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{r.name || r.routine_id}</p>
                    <p className="text-xs text-zinc-400">{r.completion_count} times completed</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/40">
                  {r.total_recitations} recitations
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
