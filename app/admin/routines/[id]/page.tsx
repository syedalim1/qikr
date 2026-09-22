'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';

interface RoutineDhikrAssignment {
  assignment_id: string;
  routine_id: string;
  dhikr_id: string;
  display_order: number;
  count_override: number | null;
  name: string;
  arabic_text: string;
  tamil_text: string;
  english_text: string;
  default_count: number;
  mode: string;
}

interface RoutineDetail {
  id: string;
  name: string;
  description: string;
  time_of_day: string;
  icon: string;
  completion_note: string;
  is_active: number;
  items: RoutineDhikrAssignment[];
}

export default function RoutineItemsManagerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: routineId } = use(params);
  const [routine, setRoutine] = useState<RoutineDetail | null>(null);
  const [allItems, setAllItems] = useState<RoutineDhikrAssignment[]>([]);
  const [allDhikrs, setAllDhikrs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingOrder, setSavingOrder] = useState(false);
  const [message, setMessage] = useState('');

  // Add dhikr modal state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedDhikrId, setSelectedDhikrId] = useState('');
  const [newCountOverride, setNewCountOverride] = useState('');

  // Routine preview state
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const fetchRoutineData = async () => {
    setLoading(true);
    try {
      const [rRes, dRes] = await Promise.all([
        fetch(`/api/admin/routines/${routineId}`),
        fetch('/api/admin/dhikrs?status=active'),
      ]);

      const rJson = await rRes.json();
      const dJson = await dRes.json();

      if (rJson.success) {
        setRoutine(rJson.data);
        setAllItems(rJson.data.items || []);
      }
      if (dJson.success) {
        setAllDhikrs(dJson.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutineData();
  }, [routineId]);

  // Move item Up in sequence
  const moveItemUp = (index: number) => {
    if (index === 0) return;
    const reordered = [...allItems];
    const temp = reordered[index - 1];
    reordered[index - 1] = reordered[index];
    reordered[index] = temp;

    // Recalculate display_order 1..N
    const updated = reordered.map((item, idx) => ({
      ...item,
      display_order: idx + 1,
    }));
    setAllItems(updated);
    saveNewOrder(updated);
  };

  // Move item Down in sequence
  const moveItemDown = (index: number) => {
    if (index === allItems.length - 1) return;
    const reordered = [...allItems];
    const temp = reordered[index + 1];
    reordered[index + 1] = reordered[index];
    reordered[index] = temp;

    const updated = reordered.map((item, idx) => ({
      ...item,
      display_order: idx + 1,
    }));
    setAllItems(updated);
    saveNewOrder(updated);
  };

  // Update count override on an item
  const handleCountOverrideChange = (assignmentId: string, val: string) => {
    const parsed = val === '' ? null : parseInt(val, 10);
    const updated = allItems.map((item) =>
      item.assignment_id === assignmentId ? { ...item, count_override: parsed } : item
    );
    setAllItems(updated);
    saveNewOrder(updated);
  };

  const saveNewOrder = async (itemsToSave: RoutineDhikrAssignment[]) => {
    setSavingOrder(true);
    try {
      const payload = {
        items: itemsToSave.map((it) => ({
          assignment_id: it.assignment_id,
          display_order: it.display_order,
          count_override: it.count_override,
        })),
      };

      const res = await fetch(`/api/admin/routines/${routineId}/items`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage('Order saved.');
        setTimeout(() => setMessage(''), 2000);
      }
    } catch {
      setMessage('Failed to persist order.');
    } finally {
      setSavingOrder(false);
    }
  };

  const handleAddDhikr = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDhikrId) return;

    try {
      const res = await fetch(`/api/admin/routines/${routineId}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dhikr_id: selectedDhikrId,
          count_override: newCountOverride !== '' ? parseInt(newCountOverride, 10) : null,
          display_order: allItems.length + 1,
        }),
      });

      if (res.ok) {
        setIsAddOpen(false);
        setSelectedDhikrId('');
        setNewCountOverride('');
        fetchRoutineData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveDhikr = async (assignmentId: string) => {
    if (!confirm('Remove this Dhikr from the routine?')) return;

    try {
      const res = await fetch(`/api/admin/routines/${routineId}/items?assignmentId=${assignmentId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchRoutineData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || !routine) {
    return <div className="py-20 text-center text-zinc-500 text-sm">Loading routine configuration...</div>;
  }

  // Find dhikrs not yet in this routine for the add selector
  const existingDhikrIds = new Set(allItems.map((it) => it.dhikr_id));
  const availableDhikrs = allDhikrs.filter((d) => !existingDhikrIds.has(d.id));

  return (
    <div className="space-y-6">
      {/* ─── Breadcrumb & Header ─────────────────────────────────────── */}
      <div>
        <Link
          href="/admin/routines"
          className="text-xs text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1 mb-2"
        >
          ← Back to Routines
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{routine.icon}</span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">{routine.name}</h1>
              <p className="text-xs text-zinc-400">
                {allItems.length} Dhikrs in execution sequence · {routine.time_of_day}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>👁️</span>
              <span>Preview Routine</span>
            </button>
            <button
              onClick={() => setIsAddOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-xs flex items-center gap-1.5"
            >
              <span>＋</span>
              <span>Add Dhikr</span>
            </button>
          </div>
        </div>
      </div>

      {message && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
          {message}
        </div>
      )}

      {/* ─── Reorderable Table ───────────────────────────────────────── */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/80 text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4 font-semibold w-16 text-center">Order</th>
                <th className="py-3 px-4 font-semibold">Dhikr Name</th>
                <th className="py-3 px-4 font-semibold text-right">Arabic Text</th>
                <th className="py-3 px-4 font-semibold w-36">Count Override</th>
                <th className="py-3 px-4 font-semibold text-center w-28">Reorder</th>
                <th className="py-3 px-4 font-semibold text-right w-20">Remove</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {allItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    No Dhikrs assigned to this routine. Click &quot;Add Dhikr&quot; to begin.
                  </td>
                </tr>
              ) : (
                allItems.map((item, index) => {
                  const effectiveCount = item.count_override ?? item.default_count;

                  return (
                    <tr key={item.assignment_id} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="py-3.5 px-4 text-center font-bold text-zinc-400">
                        {index + 1}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-white">{item.name}</p>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          Default: ×{item.default_count} · {item.mode}
                        </p>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <p className="font-arabic text-base text-zinc-200" dir="rtl">
                          {item.arabic_text}
                        </p>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min={1}
                            placeholder={`×${item.default_count}`}
                            value={item.count_override ?? ''}
                            onChange={(e) =>
                              handleCountOverrideChange(item.assignment_id, e.target.value)
                            }
                            className="w-16 bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-white text-center font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                          <span className="text-[10px] text-zinc-500">
                            {item.count_override ? 'Custom' : 'Default'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex gap-1">
                          <button
                            onClick={() => moveItemUp(index)}
                            disabled={index === 0 || savingOrder}
                            className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 text-zinc-300 flex items-center justify-center transition-colors text-xs font-bold"
                            title="Move Up"
                          >
                            ▲
                          </button>
                          <button
                            onClick={() => moveItemDown(index)}
                            disabled={index === allItems.length - 1 || savingOrder}
                            className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 text-zinc-300 flex items-center justify-center transition-colors text-xs font-bold"
                            title="Move Down"
                          >
                            ▼
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleRemoveDhikr(item.assignment_id)}
                          className="text-rose-400 hover:text-rose-300 transition-colors p-1"
                          title="Remove from routine"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Add Dhikr Modal ─────────────────────────────────────────── */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-base font-bold text-white mb-4">
              Add Dhikr to {routine.name}
            </h2>

            <form onSubmit={handleAddDhikr} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">
                  Select Dhikr *
                </label>
                <select
                  required
                  value={selectedDhikrId}
                  onChange={(e) => setSelectedDhikrId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white"
                >
                  <option value="">-- Choose a Dhikr --</option>
                  {availableDhikrs.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} (Default: ×{d.default_count})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">
                  Routine Count Override (Optional)
                </label>
                <input
                  type="number"
                  min={1}
                  value={newCountOverride}
                  onChange={(e) => setNewCountOverride(e.target.value)}
                  placeholder="Leave empty to use default count"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedDhikrId}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs disabled:opacity-50"
                >
                  Assign Dhikr
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Routine Preview Simulation Modal ────────────────────────── */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-3xl p-6 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{routine.icon}</span>
                <div>
                  <h3 className="text-base font-bold text-white">Preview: {routine.name}</h3>
                  <p className="text-xs text-zinc-400">Read-only player simulation</p>
                </div>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto my-4 space-y-3 pr-1">
              {allItems.map((item, idx) => {
                const count = item.count_override ?? item.default_count;
                return (
                  <div
                    key={item.assignment_id}
                    className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-zinc-400">
                        Dhikr {idx + 1} of {allItems.length}
                      </span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
                        {item.mode === 'CONTINUOUS' ? '♾ Continuous' : `Target: ×${count}`}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-white mb-1">{item.name}</p>
                    <p dir="rtl" className="text-xl font-arabic text-zinc-200 leading-loose py-2">
                      {item.arabic_text}
                    </p>
                    <p className="text-xs text-zinc-400">{item.english_text}</p>
                    <p className="text-xs text-zinc-500 mt-1">{item.tamil_text}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-zinc-800 text-right">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
