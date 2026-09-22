'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface RoutineItem {
  id: string;
  name: string;
  description?: string;
  time_of_day: string;
  icon: string;
  completion_note?: string;
  is_active: number;
  dhikr_count: number;
}

const emptyRoutine: RoutineItem = {
  id: '',
  name: '',
  description: '',
  time_of_day: 'Daily',
  icon: '📿',
  completion_note: 'Alhamdulillah! Routine completed.',
  is_active: 1,
  dhikr_count: 0,
};

export default function AdminRoutinesPage() {
  const [routines, setRoutines] = useState<RoutineItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState<RoutineItem>(emptyRoutine);
  const [isNew, setIsNew] = useState(false);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchRoutines = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/routines');
      const json = await res.json();
      if (json.success) setRoutines(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  const openCreateModal = () => {
    setIsNew(true);
    setEditingRoutine(emptyRoutine);
    setFormError('');
    setIsEditorOpen(true);
  };

  const openEditModal = (routine: RoutineItem) => {
    setIsNew(false);
    setEditingRoutine(routine);
    setFormError('');
    setIsEditorOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!editingRoutine.name.trim()) {
      setFormError('Routine name is required.');
      return;
    }

    setSaving(true);
    try {
      const url = isNew ? '/api/admin/routines' : `/api/admin/routines/${editingRoutine.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingRoutine),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setIsEditorOpen(false);
        fetchRoutines();
      } else {
        setFormError(json.error || 'Failed to save routine.');
      }
    } catch {
      setFormError('Network error while saving routine.');
    } finally {
      setSaving(false);
    }
  };

  const toggleActiveStatus = async (item: RoutineItem) => {
    const nextStatus = item.is_active ? 0 : 1;
    try {
      await fetch(`/api/admin/routines/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, is_active: nextStatus }),
      });
      fetchRoutines();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* ─── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Routines Management</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Configure routine collections and organize daily Dhikr sequences
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs"
        >
          <span>＋</span>
          <span>Create New Routine</span>
        </button>
      </div>

      {/* ─── Routines Grid ───────────────────────────────────────────── */}
      {loading ? (
        <div className="py-16 text-center text-zinc-500 text-sm">Loading routines...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {routines.map((routine) => (
            <div
              key={routine.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{routine.icon}</span>
                    <div>
                      <h3 className="text-base font-bold text-white leading-snug">{routine.name}</h3>
                      <p className="text-xs text-zinc-400 font-mono mt-0.5">{routine.id}</p>
                    </div>
                  </div>
                  <span
                    className={[
                      'px-2.5 py-0.5 rounded-full text-[10px] font-semibold',
                      routine.is_active
                        ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/50'
                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700',
                    ].join(' ')}
                  >
                    {routine.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  {routine.description || 'No description provided.'}
                </p>

                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-5">
                  <span className="bg-zinc-800 px-2 py-0.5 rounded-md text-[11px] font-medium">
                    🕒 {routine.time_of_day}
                  </span>
                  <span className="bg-zinc-800 px-2 py-0.5 rounded-md text-[11px] font-medium">
                    📿 {routine.dhikr_count} Dhikrs Assigned
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-zinc-800 gap-2">
                <Link
                  href={`/admin/routines/${routine.id}`}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>⚙️</span>
                  <span>Manage Items ({routine.dhikr_count})</span>
                </Link>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(routine)}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleActiveStatus(routine)}
                    className={[
                      'px-3 py-1.5 rounded-xl text-xs font-medium transition-colors',
                      routine.is_active
                        ? 'bg-amber-950/50 text-amber-300 hover:bg-amber-900/60'
                        : 'bg-emerald-950/50 text-emerald-300 hover:bg-emerald-900/60',
                    ].join(' ')}
                  >
                    {routine.is_active ? 'Deactivate' : 'Reactivate'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Routine Editor Modal ─────────────────────────────────────── */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <h2 className="text-lg font-bold text-white">
                {isNew ? 'Create New Routine' : `Edit Routine: ${editingRoutine.name}`}
              </h2>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">
                  Routine Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingRoutine.name}
                  onChange={(e) => setEditingRoutine({ ...editingRoutine, name: e.target.value })}
                  placeholder="e.g. Tahajjud Routine"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">
                    Emoji / Icon
                  </label>
                  <input
                    type="text"
                    value={editingRoutine.icon}
                    onChange={(e) => setEditingRoutine({ ...editingRoutine, icon: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">
                    Time of Day
                  </label>
                  <input
                    type="text"
                    value={editingRoutine.time_of_day}
                    onChange={(e) => setEditingRoutine({ ...editingRoutine, time_of_day: e.target.value })}
                    placeholder="e.g. Before Dawn"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingRoutine.description || ''}
                  onChange={(e) => setEditingRoutine({ ...editingRoutine, description: e.target.value })}
                  placeholder="Purpose of this routine..."
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">
                  Completion Note
                </label>
                <input
                  type="text"
                  value={editingRoutine.completion_note || ''}
                  onChange={(e) => setEditingRoutine({ ...editingRoutine, completion_note: e.target.value })}
                  placeholder="Alhamdulillah message..."
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">
                  Status
                </label>
                <select
                  value={editingRoutine.is_active}
                  onChange={(e: any) =>
                    setEditingRoutine({ ...editingRoutine, is_active: parseInt(e.target.value, 10) })
                  }
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white"
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-xs disabled:opacity-50"
                >
                  {saving ? 'Saving...' : isNew ? 'Create Routine' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
