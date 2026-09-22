-- 0001_initial_schema.sql
-- Production D1 / SQLite database schema for Qikr Dhikr application

-- Devices / Users
CREATE TABLE IF NOT EXISTS devices (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  last_active_at TEXT NOT NULL
);

-- Dhikrs table
CREATE TABLE IF NOT EXISTS dhikrs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  arabic_text TEXT NOT NULL,
  tamil_text TEXT NOT NULL,
  english_text TEXT NOT NULL,
  pronunciation TEXT,
  meaning_tamil TEXT,
  meaning_english TEXT,
  default_count INTEGER NOT NULL DEFAULT 1,
  mode TEXT NOT NULL CHECK(mode IN ('FIXED', 'CONTINUOUS', 'SCRIPTURE')),
  source_reference TEXT,
  display_note TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Routines
CREATE TABLE IF NOT EXISTS routines (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  time_of_day TEXT NOT NULL,
  icon TEXT NOT NULL,
  completion_note TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Routine Dhikrs relationship
CREATE TABLE IF NOT EXISTS routine_dhikrs (
  id TEXT PRIMARY KEY,
  routine_id TEXT NOT NULL REFERENCES routines(id) ON DELETE CASCADE,
  dhikr_id TEXT NOT NULL REFERENCES dhikrs(id) ON DELETE CASCADE,
  display_order INTEGER NOT NULL,
  count_override INTEGER,
  is_active INTEGER NOT NULL DEFAULT 1,
  UNIQUE(routine_id, dhikr_id)
);

CREATE INDEX IF NOT EXISTS idx_routine_dhikrs_routine ON routine_dhikrs(routine_id, display_order);

-- Schedules
CREATE TABLE IF NOT EXISTS schedules (
  id TEXT PRIMARY KEY,
  device_id TEXT NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
  routine_id TEXT NOT NULL REFERENCES routines(id) ON DELETE CASCADE,
  scheduled_time TEXT NOT NULL,
  is_enabled INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- User active session progress
CREATE TABLE IF NOT EXISTS user_progress (
  id TEXT PRIMARY KEY,
  device_id TEXT NOT NULL,
  routine_id TEXT NOT NULL REFERENCES routines(id),
  current_dhikr_id TEXT NOT NULL,
  current_dhikr_index INTEGER NOT NULL DEFAULT 0,
  remaining_count INTEGER NOT NULL DEFAULT 0,
  completed_dhikr_count INTEGER NOT NULL DEFAULT 0,
  total_dhikr_count INTEGER NOT NULL DEFAULT 0,
  continuous_count INTEGER NOT NULL DEFAULT 0,
  session_status TEXT NOT NULL CHECK(session_status IN ('active', 'completed', 'paused')) DEFAULT 'active',
  started_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  selected_language TEXT NOT NULL DEFAULT 'ta'
);

CREATE INDEX IF NOT EXISTS idx_user_progress_device ON user_progress(device_id, session_status);

-- Dhikr step progress
CREATE TABLE IF NOT EXISTS dhikr_progress (
  id TEXT PRIMARY KEY,
  device_id TEXT NOT NULL,
  session_id TEXT NOT NULL REFERENCES user_progress(id) ON DELETE CASCADE,
  routine_id TEXT NOT NULL,
  dhikr_id TEXT NOT NULL REFERENCES dhikrs(id),
  dhikr_index INTEGER NOT NULL,
  target_count INTEGER NOT NULL,
  completed_count INTEGER NOT NULL,
  is_complete INTEGER NOT NULL DEFAULT 0,
  started_at TEXT NOT NULL,
  completed_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_dhikr_progress_session ON dhikr_progress(session_id, dhikr_index);

-- Daily History
CREATE TABLE IF NOT EXISTS daily_history (
  id TEXT PRIMARY KEY,
  device_id TEXT NOT NULL,
  date TEXT NOT NULL,
  routine_id TEXT NOT NULL REFERENCES routines(id),
  target_count INTEGER NOT NULL,
  completed_count INTEGER NOT NULL,
  completion_percentage REAL NOT NULL,
  completed INTEGER NOT NULL DEFAULT 0,
  started_at TEXT NOT NULL,
  completed_at TEXT NOT NULL,
  UNIQUE(device_id, routine_id, date)
);

CREATE INDEX IF NOT EXISTS idx_daily_history_device_date ON daily_history(device_id, date DESC);

-- Favorites
CREATE TABLE IF NOT EXISTS favorites (
  id TEXT PRIMARY KEY,
  device_id TEXT NOT NULL,
  dhikr_id TEXT NOT NULL REFERENCES dhikrs(id),
  created_at TEXT NOT NULL,
  UNIQUE(device_id, dhikr_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_device ON favorites(device_id);

-- Sync events for idempotent synchronization
CREATE TABLE IF NOT EXISTS sync_events (
  event_id TEXT PRIMARY KEY,
  device_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  entity_id TEXT,
  payload TEXT NOT NULL,
  created_at TEXT NOT NULL,
  processed_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sync_events_device ON sync_events(device_id, created_at);

-- App Settings
CREATE TABLE IF NOT EXISTS app_settings (
  device_id TEXT PRIMARY KEY,
  language TEXT NOT NULL DEFAULT 'ta',
  theme TEXT NOT NULL DEFAULT 'system',
  sound_preference INTEGER NOT NULL DEFAULT 1,
  vibration_preference INTEGER NOT NULL DEFAULT 1,
  wake_lock_preference INTEGER NOT NULL DEFAULT 0,
  notification_preference INTEGER NOT NULL DEFAULT 0,
  hourly_reminder INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);
