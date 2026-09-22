import { db } from './local';
import type { AppSettings, Language } from '../_lib/types';

export const DEFAULT_SETTINGS: AppSettings = {
  language: 'ta',
  theme: 'system',
  darkMode: 'system',
  notificationPreference: false,
  soundPreference: true,
  vibrationPreference: true,
  wakeLockPreference: false,
  hourlyReminder: false,
};

const SETTINGS_KEY = 'app_settings';

/**
 * Loads settings from IndexedDB (with fallback to localStorage / defaults).
 */
export async function getLocalSettings(): Promise<AppSettings> {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;

  try {
    const item = await db.settings.get(SETTINGS_KEY);
    if (item && item.value) {
      return { ...DEFAULT_SETTINGS, ...item.value };
    }
  } catch (err) {
    console.error('Failed to read settings from IndexedDB:', err);
  }

  // Fallback to localStorage if any
  try {
    const raw = localStorage.getItem('qikr_settings');
    if (raw) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    }
  } catch {}

  return DEFAULT_SETTINGS;
}

/**
 * Saves settings to IndexedDB and syncs to localStorage.
 */
export async function saveLocalSettings(settings: AppSettings): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    await db.settings.put({ key: SETTINGS_KEY, value: settings });
  } catch (err) {
    console.error('Failed to save settings to IndexedDB:', err);
  }

  try {
    localStorage.setItem('qikr_settings', JSON.stringify(settings));
    localStorage.setItem('qikr_language', JSON.stringify(settings.language));
  } catch {}
}
