export type Language = 'ta' | 'ar' | 'en';

export type DhikrType = 'fixed' | 'continuous';

export interface DhikrContent {
  arabic: string;
  tamil: string;
  english: string;
  pronunciation?: string;
  meaning?: string;
  source?: string;
}

export interface Dhikr {
  id: string;
  title: DhikrContent;
  content: DhikrContent;
  count: number; // target count; 0 = continuous
  type: DhikrType;
  isFavorite?: boolean;
}

export type RoutineId = 'morning' | 'daytime' | 'evening' | 'night';

export interface Routine {
  id: RoutineId;
  title: DhikrContent;
  emoji: string;
  dhikrs: Dhikr[];
  recommendedTime: string;
}

// ─── Session (IndexedDB & in-memory) ──────────────────────────────────────────

export interface DhikrSessionEntry {
  dhikrId: string;
  dhikrIndex: number;
  targetCount: number;
  completedCount: number; // how many taps were recorded
  isComplete: boolean;
  startedAt: string; // ISO
  completedAt?: string; // ISO
}

export type SessionStatus = 'active' | 'completed' | 'paused';

export interface ActiveSessionRecord {
  sessionId: string;
  routineId: RoutineId;
  routineName: string;
  currentDhikrId: string;
  currentDhikrIndex: number;
  remainingCount: number;
  completedDhikrCount: number;
  totalDhikrCount: number;
  continuousCount: number;
  sessionStatus: SessionStatus;
  startedAt: string; // ISO
  updatedAt: string; // ISO
  selectedLanguage: Language;
  dhikrEntries: DhikrSessionEntry[];
}

export interface SessionProgress {
  sessionId?: string;
  routineId: RoutineId;
  routineName?: string;
  currentDhikrIndex: number;
  currentDhikrId?: string;
  /** remaining taps needed for the current fixed dhikr; 0 = this dhikr done.
   *  For continuous dhikr: this is the cumulative count so far. */
  currentCount: number;
  completedDhikrCount: number; // how many dhikrs fully done in this session
  totalDhikrCount?: number;
  dhikrEntries: DhikrSessionEntry[];
  isComplete: boolean;
  sessionStatus?: SessionStatus;
  startedAt: string; // ISO
  updatedAt?: string; // ISO
  completedAt?: string; // ISO
}

// ─── Completed Record & History (IndexedDB) ───────────────────────────────────

export interface CompletedDhikrRecord {
  id?: number;
  date: string; // YYYY-MM-DD
  routineId: RoutineId;
  routineName: string;
  dhikrId: string;
  dhikrName: string;
  targetCount: number;
  completedCount: number;
  status: 'completed' | 'skipped';
  startedAt: string;
  completedAt: string;
}

export interface CompletedRoutineRecord {
  id: string; // sessionId or unique UUID
  date: string; // YYYY-MM-DD
  routineId: RoutineId;
  routineName: string;
  totalDhikrs: number;
  completedDhikrs: number;
  totalRecitations: number;
  status: 'completed' | 'partial';
  startedAt: string;
  completedAt: string;
}

export interface HistoryEntry {
  id: string;
  routineId: RoutineId;
  totalDhikrs: number;
  completedDhikrs: number;
  totalRecitations: number;
  startedAt: string;
  completedAt: string;
  routineName?: string;
}

// ─── Continuous quick session ─────────────────────────────────────────────────

export interface ContinuousSession {
  dhikrId: string;
  count: number;
  startedAt: string;
  lastUpdatedAt: string;
}

// ─── Favorite Record ─────────────────────────────────────────────────────────

export interface FavoriteRecord {
  dhikrId: string;
  routineId: RoutineId;
  addedAt: string; // ISO
}

// ─── Settings ────────────────────────────────────────────────────────────────

export interface AppSettings {
  language: Language;
  theme: 'system' | 'light' | 'dark';
  darkMode: 'system' | 'light' | 'dark'; // backwards compatibility
  notificationPreference: boolean;
  soundPreference: boolean;
  vibrationPreference: boolean;
  wakeLockPreference: boolean;
  hourlyReminder: boolean;
}

// ─── Cached Routine / Seed Metadata ──────────────────────────────────────────

export interface CachedRoutineRecord {
  id: RoutineId;
  data: Routine;
  version: number;
  updatedAt: string;
}

// ─── Phase 5: Routine Scheduling & Reminders ─────────────────────────────────

export interface RoutineSchedule {
  routineId: RoutineId;
  enabled: boolean;
  startTime: string; // "HH:MM" in 24-hour local clock, e.g. "06:00"
  endTime?: string; // optional "HH:MM"
  reminderEnabled: boolean;
  daysOfWeek: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
  updatedAt: string;
}

export interface HourlyReminderConfig {
  enabled: boolean;
  intervalMinutes: number; // 60, 120, 180, or custom
  customInterval: boolean;
  nextReminderAt?: string; // ISO
  updatedAt: string;
}

export type NotificationPermissionStatus = 'granted' | 'denied' | 'default' | 'unsupported';

export interface NextReminderInfo {
  type: 'routine' | 'hourly';
  routineId?: RoutineId;
  title: string;
  timeString: string; // e.g. "6:00 AM"
  timeRemaining: string; // e.g. "In 42 minutes"
  targetTime: string; // ISO
}
