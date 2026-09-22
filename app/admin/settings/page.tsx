'use client';

import { useState } from 'react';

export default function AdminSettingsPage() {
  const [appName, setAppName] = useState('Qikr');
  const [defaultLang, setDefaultLang] = useState('ta');
  const [defaultTheme, setDefaultTheme] = useState('system');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">System Settings</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Global application configuration and environment status
        </p>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
          Settings saved successfully.
        </div>
      )}

      {/* ─── General Configuration Form ──────────────────────────────── */}
      <form onSubmit={handleSave} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-white mb-2">Application Defaults</h3>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">
            Application Brand Name
          </label>
          <input
            type="text"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">
              Default Language
            </label>
            <select
              value={defaultLang}
              onChange={(e) => setDefaultLang(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white"
            >
              <option value="ta">Tamil (தமிழ்)</option>
              <option value="ar">Arabic (العربية)</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">
              Default Color Theme
            </label>
            <select
              value={defaultTheme}
              onChange={(e) => setDefaultTheme(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white"
            >
              <option value="system">System Synchronized</option>
              <option value="dark">Dark Theme</option>
              <option value="light">Light Theme</option>
            </select>
          </div>
        </div>

        <div className="pt-3 border-t border-zinc-800 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs"
          >
            Save Global Settings
          </button>
        </div>
      </form>

      {/* ─── Database & Deployment Environment ───────────────────────── */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-white mb-2">Environment Status</h3>

        <div className="flex items-center justify-between py-2 border-b border-zinc-800/80 text-xs">
          <span className="text-zinc-400">Database Engine</span>
          <span className="font-semibold text-white">Cloudflare D1 / Local SQLite</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-zinc-800/80 text-xs">
          <span className="text-zinc-400">Architecture</span>
          <span className="font-semibold text-emerald-400">Local-First with Asynchronous D1 Sync</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-zinc-800/80 text-xs">
          <span className="text-zinc-400">Offline Fallback</span>
          <span className="font-semibold text-emerald-400">Active (IndexedDB Dexie.js)</span>
        </div>

        <div className="flex items-center justify-between py-2 text-xs">
          <span className="text-zinc-400">Server API Runtime</span>
          <span className="font-semibold text-white">Next.js 16 Edge / Worker Compatible</span>
        </div>
      </div>
    </div>
  );
}
