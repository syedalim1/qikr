'use client';

import { useEffect, useState } from 'react';

interface DhikrItem {
  id: string;
  name: string;
  arabic_text: string;
  tamil_text: string;
  english_text: string;
  pronunciation?: string;
  meaning_tamil?: string;
  meaning_english?: string;
  default_count: number;
  mode: 'FIXED' | 'CONTINUOUS' | 'SCRIPTURE';
  source_reference?: string;
  display_note?: string;
  is_active: number;
}

const emptyDhikr: DhikrItem = {
  id: '',
  name: '',
  arabic_text: '',
  tamil_text: '',
  english_text: '',
  pronunciation: '',
  meaning_tamil: '',
  meaning_english: '',
  default_count: 33,
  mode: 'FIXED',
  source_reference: '',
  display_note: '',
  is_active: 1,
};

export default function AdminDhikrsPage() {
  const [dhikrs, setDhikrs] = useState<DhikrItem[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [modeFilter, setModeFilter] = useState<'all' | 'FIXED' | 'CONTINUOUS' | 'SCRIPTURE'>('all');
  const [loading, setLoading] = useState(true);

  // Modal editor state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DhikrItem>(emptyDhikr);
  const [isNew, setIsNew] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchDhikrs = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (modeFilter !== 'all') params.set('mode', modeFilter);

    try {
      const res = await fetch(`/api/admin/dhikrs?${params.toString()}`);
      const json = await res.json();
      if (json.success) setDhikrs(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDhikrs();
  }, [search, statusFilter, modeFilter]);

  const openCreateModal = () => {
    setIsNew(true);
    setEditingItem(emptyDhikr);
    setFormError('');
    setFormSuccess('');
    setIsEditorOpen(true);
  };

  const openEditModal = (item: DhikrItem) => {
    setIsNew(false);
    setEditingItem(item);
    setFormError('');
    setFormSuccess('');
    setIsEditorOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    // Client-side validation
    if (!editingItem.name.trim()) {
      setFormError('Dhikr name is required.');
      return;
    }
    if (!editingItem.arabic_text.trim()) {
      setFormError('Arabic text is required.');
      return;
    }
    if (!editingItem.tamil_text.trim()) {
      setFormError('Tamil text is required.');
      return;
    }
    if (!editingItem.english_text.trim()) {
      setFormError('English text is required.');
      return;
    }
    if (editingItem.mode === 'FIXED' && (!editingItem.default_count || editingItem.default_count < 1)) {
      setFormError('Fixed mode count must be a positive integer.');
      return;
    }

    setSaving(true);
    try {
      const url = isNew ? '/api/admin/dhikrs' : `/api/admin/dhikrs/${editingItem.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setFormSuccess(isNew ? 'Dhikr created successfully!' : 'Dhikr updated successfully!');
        setTimeout(() => {
          setIsEditorOpen(false);
          fetchDhikrs();
        }, 800);
      } else {
        setFormError(json.error || 'Failed to save Dhikr.');
      }
    } catch {
      setFormError('Network error while saving Dhikr.');
    } finally {
      setSaving(false);
    }
  };

  const toggleActiveStatus = async (item: DhikrItem) => {
    const nextStatus = item.is_active ? 0 : 1;
    try {
      await fetch(`/api/admin/dhikrs/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, is_active: nextStatus }),
      });
      fetchDhikrs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* ─── Header & Actions ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Dhikr Management</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Browse, create, and manage the master repository of Dhikrs
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs"
        >
          <span>＋</span>
          <span>Create New Dhikr</span>
        </button>
      </div>

      {/* ─── Filters & Search ────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, Arabic, Tamil, or English..."
            className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <span className="absolute left-3 top-2.5 text-zinc-500 text-xs">🔍</span>
        </div>

        <div className="flex gap-2">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>

          {/* Mode filter */}
          <select
            value={modeFilter}
            onChange={(e: any) => setModeFilter(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Modes</option>
            <option value="FIXED">Fixed</option>
            <option value="CONTINUOUS">Continuous</option>
            <option value="SCRIPTURE">Scripture</option>
          </select>
        </div>
      </div>

      {/* ─── Table ───────────────────────────────────────────────────── */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/80 text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Name / Key</th>
                <th className="py-3.5 px-4 font-semibold text-right">Arabic Text</th>
                <th className="py-3.5 px-4 font-semibold">Mode / Default Count</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-zinc-500">
                    Loading Dhikrs...
                  </td>
                </tr>
              ) : dhikrs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-zinc-500">
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-3xl mb-2">🔍</span>
                      <p className="font-semibold text-zinc-300 text-sm">No Dhikrs Found</p>
                      <p className="text-xs text-zinc-500 mt-1 max-w-sm">
                        No Dhikrs match your current search or filter criteria. Try adjusting your query or create a new Dhikr.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                dhikrs.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-[11px] text-zinc-400 font-mono mt-0.5">{item.id}</p>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <p className="font-arabic text-base text-zinc-200" dir="rtl">
                        {item.arabic_text}
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-zinc-800 text-zinc-300 mr-2">
                        {item.mode}
                      </span>
                      <span className="text-zinc-300 font-bold">
                        {item.mode === 'CONTINUOUS' ? '♾' : `×${item.default_count}`}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={[
                          'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold',
                          item.is_active
                            ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/50'
                            : 'bg-zinc-800 text-zinc-400 border border-zinc-700',
                        ].join(' ')}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${item.is_active ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
                        {item.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors text-xs font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => toggleActiveStatus(item)}
                        className={[
                          'px-2.5 py-1 rounded-lg transition-colors text-xs font-medium',
                          item.is_active
                            ? 'bg-amber-950/50 text-amber-300 hover:bg-amber-900/60'
                            : 'bg-emerald-950/50 text-emerald-300 hover:bg-emerald-900/60',
                        ].join(' ')}
                      >
                        {item.is_active ? 'Deactivate' : 'Reactivate'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Dhikr Editor Modal ───────────────────────────────────────── */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-3xl bg-zinc-900 border border-zinc-700 rounded-3xl p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {isNew ? 'Create New Dhikr' : `Edit Dhikr: ${editingItem.name}`}
                </h2>
                <p className="text-xs text-zinc-400">
                  Preserve exact Arabic and Tamil content without altering sacred text
                </p>
              </div>
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
            {formSuccess && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                {formSuccess}
              </div>
            )}

            <form onSubmit={handleSave} className="mt-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">
                    Internal Identifier (Optional ID)
                  </label>
                  <input
                    type="text"
                    disabled={!isNew}
                    value={editingItem.id}
                    onChange={(e) => setEditingItem({ ...editingItem, id: e.target.value })}
                    placeholder="e.g. morning-custom-1"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-600 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">
                    Display Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    placeholder="e.g. Sayyidul Istighfar"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-600"
                  />
                </div>
              </div>

              {/* Mode & Count */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">
                    Mode *
                  </label>
                  <select
                    value={editingItem.mode}
                    onChange={(e: any) => setEditingItem({ ...editingItem, mode: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white"
                  >
                    <option value="FIXED">FIXED (Decrements to 0)</option>
                    <option value="CONTINUOUS">CONTINUOUS (Counts upwards)</option>
                    <option value="SCRIPTURE">SCRIPTURE (Verse / Surah)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">
                    Default Count {editingItem.mode === 'FIXED' ? '*' : ''}
                  </label>
                  <input
                    type="number"
                    min={editingItem.mode === 'FIXED' ? 1 : 0}
                    value={editingItem.default_count}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, default_count: parseInt(e.target.value, 10) || 0 })
                    }
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={editingItem.is_active}
                    onChange={(e: any) =>
                      setEditingItem({ ...editingItem, is_active: parseInt(e.target.value, 10) })
                    }
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white"
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                </div>
              </div>

              {/* Arabic Content (RTL) */}
              <div>
                <label className="block text-xs font-semibold text-emerald-400 uppercase mb-1">
                  Arabic Content (RTL) *
                </label>
                <textarea
                  required
                  dir="rtl"
                  lang="ar"
                  rows={3}
                  value={editingItem.arabic_text}
                  onChange={(e) => setEditingItem({ ...editingItem, arabic_text: e.target.value })}
                  placeholder="أدخل النص العربي مع التشكيل..."
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xl font-arabic text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-loose"
                />
              </div>

              {/* Tamil Content */}
              <div>
                <label className="block text-xs font-semibold text-emerald-400 uppercase mb-1">
                  Tamil Content *
                </label>
                <textarea
                  required
                  rows={2}
                  value={editingItem.tamil_text}
                  onChange={(e) => setEditingItem({ ...editingItem, tamil_text: e.target.value })}
                  placeholder="தமிழ் உரை..."
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* English Content */}
              <div>
                <label className="block text-xs font-semibold text-emerald-400 uppercase mb-1">
                  English Content *
                </label>
                <textarea
                  required
                  rows={2}
                  value={editingItem.english_text}
                  onChange={(e) => setEditingItem({ ...editingItem, english_text: e.target.value })}
                  placeholder="English translation..."
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Pronunciation & Reference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">
                    Pronunciation (Transliteration)
                  </label>
                  <input
                    type="text"
                    value={editingItem.pronunciation || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, pronunciation: e.target.value })}
                    placeholder="e.g. Subhanallah wa bihamdihi"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">
                    Source Reference
                  </label>
                  <input
                    type="text"
                    value={editingItem.source_reference || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, source_reference: e.target.value })}
                    placeholder="e.g. Sahih Muslim 2691 / Quran 2:255"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-600"
                  />
                </div>
              </div>

              {/* Live Preview Card */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                  Live Player Preview
                </span>
                <p dir="rtl" className="text-xl font-arabic text-center text-white py-1">
                  {editingItem.arabic_text || 'نص التلاوة'}
                </p>
                <p className="text-xs text-center text-zinc-400">
                  {editingItem.english_text || 'Translation preview will appear here'}
                </p>
              </div>

              {/* Buttons */}
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
                  {saving ? 'Saving...' : isNew ? 'Create Dhikr' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
