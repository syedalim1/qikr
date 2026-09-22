'use client';

import { useEffect, useState } from 'react';
import { getRoutineSchedules, saveRoutineSchedule, DEFAULT_SCHEDULES } from '@/app/_db/schedules';
import type { RoutineSchedule, RoutineId } from '@/app/_lib/types';

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function AdminSchedulesPage() {
  const [schedules, setSchedules] = useState<RoutineSchedule[]>(DEFAULT_SCHEDULES);
  const [loading, setLoading] = useState(true);
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    getRoutineSchedules()
      .then(setSchedules)
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = async (routineId: RoutineId, updates: Partial<RoutineSchedule>) => {
    const updatedList = schedules.map((s) =>
      s.routineId === routineId ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s
    );
    setSchedules(updatedList);

    const target = updatedList.find((s) => s.routineId === routineId);
    if (target) {
      await saveRoutineSchedule(target);
      setSavedMessage(`Schedule for ${routineId} updated.`);
      setTimeout(() => setSavedMessage(''), 2000);
    }
  };

  const toggleDay = (routineId: RoutineId, dayIdx: number) => {
    const target = schedules.find((s) => s.routineId === routineId);
    if (!target) return;

    const days = target.daysOfWeek.includes(dayIdx)
      ? target.daysOfWeek.filter((d) => d !== dayIdx)
      : [...target.daysOfWeek, dayIdx].sort();

    handleUpdate(routineId, { daysOfWeek: days });
  };

  return (
    <div className="space-y-6">
      {/* ─── Header ──────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Default Routine Schedules</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Configure default timing and active days for routines across the application
        </p>
      </div>

      {savedMessage && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
          {savedMessage}
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center text-zinc-500 text-sm">Loading schedules...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schedules.map((sched) => (
            <div
              key={sched.routineId}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white capitalize">
                    {sched.routineId} Routine
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Target start: <span className="font-semibold text-zinc-200">{sched.startTime}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">Reminders:</span>
                  <input
                    type="checkbox"
                    checked={sched.reminderEnabled}
                    onChange={(e) =>
                      handleUpdate(sched.routineId, { reminderEnabled: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Time Pickers */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-800">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={sched.startTime}
                    onChange={(e) => handleUpdate(sched.routineId, { startTime: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                    End Time (Optional)
                  </label>
                  <input
                    type="time"
                    value={sched.endTime || ''}
                    onChange={(e) => handleUpdate(sched.routineId, { endTime: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              {/* Active Days */}
              <div className="pt-2 border-t border-zinc-800">
                <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-2">
                  Active Days of the Week
                </label>
                <div className="flex gap-1.5">
                  {dayNames.map((name, idx) => {
                    const active = sched.daysOfWeek.includes(idx);
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleDay(sched.routineId, idx)}
                        className={[
                          'flex-1 py-1 rounded-lg text-xs font-semibold transition-colors',
                          active
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700',
                        ].join(' ')}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
