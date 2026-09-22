'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../_components/LanguageContext';
import { getLocalSettings, saveLocalSettings, DEFAULT_SETTINGS } from '../_db/settings';
import { saveSettings as saveStoreSettings } from '../_lib/store';
import {
  getRoutineSchedules,
  saveRoutineSchedule,
  getHourlyReminderConfig,
  saveHourlyReminderConfig,
  DEFAULT_SCHEDULES,
  DEFAULT_HOURLY_CONFIG,
  calculateNextReminder,
} from '../_db/schedules';
import {
  getNotificationPermissionStatus,
  requestNotificationPermission,
} from '../_lib/notifications';
import { db } from '../_db/local';
import type {
  AppSettings,
  Language,
  RoutineSchedule,
  HourlyReminderConfig,
  NotificationPermissionStatus,
  RoutineId,
} from '../_lib/types';

const headings = {
  ta: 'அமைப்புகள்',
  ar: 'الإعدادات',
  en: 'Settings',
};

const sections = {
  ta: {
    language: 'மொழி',
    appearance: 'தோற்றம்',
    theme: 'தீம்',
    system: 'கணினி முறை',
    light: 'ஒளி',
    dark: 'இருண்ட',
    notifications: 'அறிவிப்புகள் & நினைவூட்டல்கள்',
    notificationPerm: 'உலாவி அறிவிப்பு அனுமதி',
    permGranted: 'அனுமதிக்கப்பட்டது',
    permDenied: 'உங்கள் உலாவி அமைப்புகளில் அறிவிப்புகள் முடக்கப்பட்டுள்ளன.',
    permDefault: 'அனுமதியை செயல்படுத்தவும்',
    permUnsupported: 'இந்த உலாவியில் அறிவிப்புகள் ஆதரிக்கப்படவில்லை.',
    routineSchedules: 'வழக்க அட்டவணை',
    morningReminder: 'காலை திக்ர் நினைவூட்டல்',
    daytimeReminder: 'பகல் திக்ர் நினைவூட்டல்',
    eveningReminder: 'மாலை திக்ர் நினைவூட்டல்',
    nightReminder: 'இரவு திக்ர் நினைவூட்டல்',
    hourlyReminder: 'மணிநேர நினைவூட்டல்',
    hourlyDesc: 'வழக்கமான இடைவெளிகளில் சுருக்கமான திக்ர் நினைவூட்டல்',
    every1Hour: '1 மணிநேரம்',
    every2Hours: '2 மணிநேரம்',
    every3Hours: '3 மணிநேரம்',
    customInterval: 'தனிப்பயன்',
    customMins: 'நிமிடங்கள்',
    nextReminder: 'அடுத்த நினைவூட்டல்',
    preferences: 'விருப்பத்தேர்வுகள்',
    sound: 'ஒலி கருத்து',
    vibration: 'அதிர்வு கருத்து',
    wakeLock: 'திரையை விழித்திருக்கச் செய்',
    wakeLockDesc: 'திக்ர் செய்யும்போது திரை அணையாது',
    dataManagement: 'தரவு & சேமிப்பகம்',
    resetLocalData: 'உள்ளூர் தரவை மீட்டமை',
    resetDesc: 'இந்த சாதனத்தில் உள்ள திக்ர் வரலாற்றையும் அமர்வுகளையும் அழிக்கிறது',
    confirmResetTitle: 'உள்ளூர் தரவை மீட்டமைக்க விரும்புகிறீர்களா?',
    confirmResetMsg: 'இது இந்த சாதனத்தில் சேமிக்கப்பட்ட திக்ர் வரலாறு, பிடித்தவை மற்றும் செயலில் உள்ள அமர்வுகளை நீக்கும். இந்த செயலை மாற்ற முடியாது.',
    cancel: 'ரத்து',
    confirmErase: 'அழித்து மீட்டமை',
    about: 'பற்றி',
    appName: 'பயன்பாடு',
    version: 'பதிப்பு',
    tagline: 'திக்ர் வழிகாட்டி (ஆஃப்லைன் & லோக்கல்-முதல்)',
  },
  ar: {
    language: 'اللغة',
    appearance: 'المظهر',
    theme: 'المظهر',
    system: 'النظام',
    light: 'فاتح',
    dark: 'داكن',
    notifications: 'الإشعارات والتذكيرات',
    notificationPerm: 'إذن إشعارات المتصفح',
    permGranted: 'مفعل',
    permDenied: 'الإشعارات معطلة في إعدادات المتصفح الخاص بك.',
    permDefault: 'طلب الإذن للإشعارات',
    permUnsupported: 'الإشعارات غير مدعومة في هذا المتصفح.',
    routineSchedules: 'جدول الأذكار',
    morningReminder: 'تذكير أذكار الصباح',
    daytimeReminder: 'تذكير أذكار النهار',
    eveningReminder: 'تذكير أذكار المساء',
    nightReminder: 'تذكير أذكار الليل',
    hourlyReminder: 'تذكير كل ساعة',
    hourlyDesc: 'تنبيه دوري لأخذ لحظة ذكر مباركة',
    every1Hour: 'كل ساعة',
    every2Hours: 'كل ساعتين',
    every3Hours: 'كل ٣ ساعات',
    customInterval: 'مخصص',
    customMins: 'دقائق',
    nextReminder: 'التذكير التالي',
    preferences: 'التفضيلات',
    sound: 'المؤثرات الصوتية',
    vibration: 'الاهتزاز عند اللمس',
    wakeLock: 'إبقاء الشاشة قيد التشغيل',
    wakeLockDesc: 'يمنع إيقاف الشاشة أثناء الذكر',
    dataManagement: 'البيانات والتخزين',
    resetLocalData: 'إعادة تعيين البيانات المحلية',
    resetDesc: 'يمسح جلسات الأذكار والمفضلة والسجل من هذا الجهاز',
    confirmResetTitle: 'هل تريد إعادة ضبط البيانات؟',
    confirmResetMsg: 'سيتم مسح جميع السجلات المحلية والمفضلة على هذا الجهاز بشكل دائم.',
    cancel: 'إلغاء',
    confirmErase: 'مسح وإعادة ضبط',
    about: 'حول',
    appName: 'التطبيق',
    version: 'الإصدار',
    tagline: 'مرشد الأذكار (محلي وقائم دون اتصال)',
  },
  en: {
    language: 'Language',
    appearance: 'Appearance',
    theme: 'Theme',
    system: 'System',
    light: 'Light',
    dark: 'Dark',
    notifications: 'Notifications & Reminders',
    notificationPerm: 'Browser Notification Permission',
    permGranted: 'Enabled',
    permDenied: 'Notifications are disabled in your browser settings.',
    permDefault: 'Enable Notifications',
    permUnsupported: 'Notifications are not supported on this browser.',
    routineSchedules: 'Routine Schedules',
    morningReminder: 'Morning Dhikr Reminder',
    daytimeReminder: 'Daytime Dhikr Reminder',
    eveningReminder: 'Evening Dhikr Reminder',
    nightReminder: 'Night Dhikr Reminder',
    hourlyReminder: 'Hourly Reminder',
    hourlyDesc: 'Periodic prompts to remember Allah',
    every1Hour: '1 Hour',
    every2Hours: '2 Hours',
    every3Hours: '3 Hours',
    customInterval: 'Custom',
    customMins: 'Minutes',
    nextReminder: 'Next reminder',
    preferences: 'Preferences',
    sound: 'Sound feedback',
    vibration: 'Haptic / Vibration feedback',
    wakeLock: 'Keep Screen Awake',
    wakeLockDesc: 'Prevents screen from turning off during Dhikr',
    dataManagement: 'Data & Storage',
    resetLocalData: 'Reset Local Data',
    resetDesc: 'Clears active sessions, local history, and favorites on this device',
    confirmResetTitle: 'Reset Local Data?',
    confirmResetMsg: 'This will erase local history, saved favorites, and active sessions on this device. This action cannot be undone.',
    cancel: 'Cancel',
    confirmErase: 'Erase & Reset',
    about: 'About',
    appName: 'App',
    version: 'Version',
    tagline: 'Daily Dhikr Tracker (Local-first & Cloud-ready)',
  },
};

const langs: { code: Language; label: string; native: string }[] = [
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'ar', label: 'Arabic', native: 'العربية' },
  { code: 'en', label: 'English', native: 'English' },
];

const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function SectionHeader({ title, isRtl }: { title: string; isRtl: boolean }) {
  return (
    <p
      className={`text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-4 mb-2 mt-6 ${
        isRtl ? 'text-right font-arabic' : ''
      }`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {title}
    </p>
  );
}

function SettingRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800 shadow-xs">
      {children}
    </div>
  );
}

interface ToggleRowProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  isRtl?: boolean;
}

function ToggleRow({ label, description, checked, onChange, isRtl }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <div className="flex-1 pr-3">
        <p
          className={`text-sm font-medium text-zinc-900 dark:text-zinc-100 ${
            isRtl ? 'font-arabic text-right' : ''
          }`}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {label}
        </p>
        {description && (
          <p
            className={`text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 ${
              isRtl ? 'font-arabic text-right' : ''
            }`}
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {description}
          </p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={[
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
          checked ? 'bg-emerald-600' : 'bg-zinc-200 dark:bg-zinc-700',
        ].join(' ')}
      >
        <span
          className={[
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
            checked ? 'translate-x-5' : 'translate-x-0',
          ].join(' ')}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { language, setLanguage } = useLanguage();
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [schedules, setSchedules] = useState<RoutineSchedule[]>(DEFAULT_SCHEDULES);
  const [hourlyConfig, setHourlyConfig] = useState<HourlyReminderConfig>(DEFAULT_HOURLY_CONFIG);
  const [permStatus, setPermStatus] = useState<NotificationPermissionStatus>('default');
  const [showResetModal, setShowResetModal] = useState<boolean>(false);

  useEffect(() => {
    getLocalSettings().then(setSettings);
    getRoutineSchedules().then(setSchedules);
    getHourlyReminderConfig().then(setHourlyConfig);
    setPermStatus(getNotificationPermissionStatus());
  }, []);

  const handleConfirmReset = async () => {
    try {
      if (db) {
        await db.sessions.clear();
        await db.completedDhikrs.clear();
        await db.completedRoutines.clear();
        await db.favorites.clear();
        await db.syncQueue.clear();
        await db.settings.clear();
      }
    } catch {}
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {}
    window.location.reload();
  };

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      saveLocalSettings(next);
      saveStoreSettings(next);
      return next;
    });
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    updateSetting('language', lang);
  };

  const handleRequestPerm = async () => {
    const status = await requestNotificationPermission();
    setPermStatus(status);
  };

  const updateSchedule = (routineId: RoutineId, updates: Partial<RoutineSchedule>) => {
    setSchedules((prev) => {
      const next = prev.map((s) => (s.routineId === routineId ? { ...s, ...updates } : s));
      const target = next.find((s) => s.routineId === routineId);
      if (target) {
        saveRoutineSchedule(target);
      }
      return next;
    });
  };

  const toggleDayOfWeek = (routineId: RoutineId, dayIndex: number) => {
    const target = schedules.find((s) => s.routineId === routineId);
    if (!target) return;

    const days = target.daysOfWeek.includes(dayIndex)
      ? target.daysOfWeek.filter((d) => d !== dayIndex)
      : [...target.daysOfWeek, dayIndex].sort();

    updateSchedule(routineId, { daysOfWeek: days });
  };

  const updateHourly = (updates: Partial<HourlyReminderConfig>) => {
    setHourlyConfig((prev) => {
      const next = { ...prev, ...updates };
      saveHourlyReminderConfig(next);
      return next;
    });
  };

  const isRtl = language === 'ar';
  const s = sections[language];

  const routineMeta: { id: RoutineId; label: string; icon: string }[] = [
    { id: 'morning', label: s.morningReminder, icon: '🌅' },
    { id: 'daytime', label: s.daytimeReminder, icon: '🏭' },
    { id: 'evening', label: s.eveningReminder, icon: '🌇' },
    { id: 'night', label: s.nightReminder, icon: '🌌' },
  ];

  const nextReminder = calculateNextReminder(schedules, hourlyConfig);

  return (
    <div className="px-4 pt-6 pb-8">
      <h1
        className={`text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 ${
          isRtl ? 'font-arabic text-right' : ''
        }`}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {headings[language]}
      </h1>

      {/* ─── Notification Permission Banner ──────────────────────────── */}
      <div className="mb-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {s.notificationPerm}
            </p>
            {permStatus === 'granted' && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                ✓ {s.permGranted}
              </p>
            )}
            {permStatus === 'denied' && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5 max-w-xs">
                {s.permDenied}
              </p>
            )}
            {permStatus === 'unsupported' && (
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                {s.permUnsupported}
              </p>
            )}
          </div>
          {permStatus === 'default' && (
            <button
              onClick={handleRequestPerm}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-semibold transition-colors"
            >
              {s.permDefault}
            </button>
          )}
        </div>
      </div>

      {/* ─── Routine Schedules ─────────────────────────────────────────── */}
      <SectionHeader title={s.routineSchedules} isRtl={isRtl} />
      <div className="flex flex-col gap-3">
        {routineMeta.map(({ id, label, icon }) => {
          const sched = schedules.find((item) => item.routineId === id) || {
            routineId: id,
            enabled: true,
            startTime: '06:00',
            reminderEnabled: true,
            daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
            updatedAt: '',
          };

          return (
            <div
              key={id}
              className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 shadow-xs"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{icon}</span>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {label}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={sched.reminderEnabled}
                  onClick={() =>
                    updateSchedule(id, { reminderEnabled: !sched.reminderEnabled })
                  }
                  className={[
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                    sched.reminderEnabled ? 'bg-emerald-600' : 'bg-zinc-200 dark:bg-zinc-700',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
                      sched.reminderEnabled ? 'translate-x-5' : 'translate-x-0',
                    ].join(' ')}
                  />
                </button>
              </div>

              {/* Time picker & Days of Week */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">Time:</span>
                  <input
                    type="time"
                    value={sched.startTime}
                    onChange={(e) => updateSchedule(id, { startTime: e.target.value })}
                    className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1 text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Weekday pills */}
                <div className="flex gap-1">
                  {dayNames.map((day, dIdx) => {
                    const active = sched.daysOfWeek.includes(dIdx);
                    return (
                      <button
                        key={dIdx}
                        onClick={() => toggleDayOfWeek(id, dIdx)}
                        className={[
                          'w-6 h-6 rounded-full text-[10px] font-semibold transition-colors',
                          active
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500',
                        ].join(' ')}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Hourly Reminder ─────────────────────────────────────────── */}
      <SectionHeader title={s.hourlyReminder} isRtl={isRtl} />
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {s.hourlyReminder}
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
              {s.hourlyDesc}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={hourlyConfig.enabled}
            onClick={() => updateHourly({ enabled: !hourlyConfig.enabled })}
            className={[
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
              hourlyConfig.enabled ? 'bg-emerald-600' : 'bg-zinc-200 dark:bg-zinc-700',
            ].join(' ')}
          >
            <span
              className={[
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
                hourlyConfig.enabled ? 'translate-x-5' : 'translate-x-0',
              ].join(' ')}
            />
          </button>
        </div>

        {hourlyConfig.enabled && (
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <div className="grid grid-cols-4 gap-2 mb-3">
              {[
                { mins: 60, label: s.every1Hour },
                { mins: 120, label: s.every2Hours },
                { mins: 180, label: s.every3Hours },
                { mins: -1, label: s.customInterval },
              ].map((opt) => {
                const isSelected =
                  opt.mins === -1
                    ? hourlyConfig.customInterval
                    : !hourlyConfig.customInterval && hourlyConfig.intervalMinutes === opt.mins;

                return (
                  <button
                    key={opt.label}
                    onClick={() => {
                      if (opt.mins === -1) {
                        updateHourly({ customInterval: true });
                      } else {
                        updateHourly({
                          customInterval: false,
                          intervalMinutes: opt.mins,
                        });
                      }
                    }}
                    className={[
                      'py-1.5 px-2 rounded-xl text-xs font-medium transition-colors text-center truncate',
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700',
                    ].join(' ')}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {hourlyConfig.customInterval && (
              <div className="flex items-center gap-2 mb-3 p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/60">
                <span className="text-xs text-zinc-500 font-medium">{s.customMins}:</span>
                <input
                  type="number"
                  min={15}
                  max={720}
                  step={15}
                  value={hourlyConfig.intervalMinutes}
                  onChange={(e) => {
                    const val = Math.max(15, Math.min(720, parseInt(e.target.value, 10) || 15));
                    updateHourly({ intervalMinutes: val });
                  }}
                  className="w-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1 text-xs font-semibold text-zinc-800 dark:text-zinc-200"
                />
                <span className="text-[11px] text-zinc-400">(15 - 720 mins)</span>
              </div>
            )}

            {nextReminder && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                {s.nextReminder}: {nextReminder.timeString} ({nextReminder.timeRemaining})
              </p>
            )}
          </div>
        )}
      </div>

      {/* ─── Preferences & Hardware ──────────────────────────────────── */}
      <SectionHeader title={s.preferences} isRtl={isRtl} />
      <SettingRow>
        <ToggleRow
          label={s.sound}
          checked={settings.soundPreference}
          onChange={(val) => updateSetting('soundPreference', val)}
          isRtl={isRtl}
        />
        <ToggleRow
          label={s.vibration}
          checked={settings.vibrationPreference}
          onChange={(val) => updateSetting('vibrationPreference', val)}
          isRtl={isRtl}
        />
        <ToggleRow
          label={s.wakeLock}
          description={s.wakeLockDesc}
          checked={settings.wakeLockPreference}
          onChange={(val) => updateSetting('wakeLockPreference', val)}
          isRtl={isRtl}
        />
      </SettingRow>

      {/* ─── Appearance ──────────────────────────────────────────────── */}
      <SectionHeader title={s.appearance} isRtl={isRtl} />
      <SettingRow>
        <div className="flex items-center justify-between px-4 py-3.5">
          <span
            className={`text-sm font-medium text-zinc-900 dark:text-zinc-100 ${
              isRtl ? 'font-arabic' : ''
            }`}
          >
            {s.theme}
          </span>
          <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
            {(['system', 'light', 'dark'] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  updateSetting('theme', t);
                  updateSetting('darkMode', t);
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('qikr-theme-change', { detail: t }));
                  }
                }}
                className={[
                  'px-2.5 py-1 rounded-lg text-xs font-medium transition-colors',
                  settings.theme === t
                    ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-xs'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700',
                ].join(' ')}
              >
                {s[t]}
              </button>
            ))}
          </div>
        </div>
      </SettingRow>

      {/* ─── Language ────────────────────────────────────────────────── */}
      <SectionHeader title={s.language} isRtl={isRtl} />
      <SettingRow>
        {langs.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={[
              'w-full flex items-center justify-between px-4 py-3.5 transition-colors',
              'hover:bg-zinc-50 dark:hover:bg-zinc-800 active:bg-zinc-100 dark:active:bg-zinc-700',
            ].join(' ')}
          >
            <div className="flex items-center gap-3">
              <span
                className={`text-base font-medium text-zinc-900 dark:text-zinc-100 ${
                  lang.code === 'ar' ? 'font-arabic' : ''
                }`}
              >
                {lang.native}
              </span>
              <span className="text-sm text-zinc-400 dark:text-zinc-500">
                {lang.label}
              </span>
            </div>
            {language === lang.code && (
              <svg className="text-emerald-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
          </button>
        ))}
      </SettingRow>

      {/* ─── Data & Storage (Danger Zone) ────────────────────────────── */}
      <SectionHeader title={s.dataManagement} isRtl={isRtl} />
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {s.resetLocalData}
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 leading-relaxed">
              {s.resetDesc}
            </p>
          </div>
          <button
            onClick={() => setShowResetModal(true)}
            className="flex-shrink-0 px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
          >
            {s.resetLocalData}
          </button>
        </div>
      </div>

      {/* ─── About ───────────────────────────────────────────────────── */}
      <SectionHeader title={s.about} isRtl={isRtl} />
      <SettingRow>
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {s.appName}
          </span>
          <span className="text-sm text-zinc-400 dark:text-zinc-500">
            Qikr v1.0.0
          </span>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5">
          <span
            className={`text-sm text-zinc-500 dark:text-zinc-400 ${
              isRtl ? 'font-arabic' : ''
            }`}
          >
            {s.tagline}
          </span>
        </div>
      </SettingRow>

      {/* ─── Reset Confirmation Modal ────────────────────────────────── */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-1">
              {s.confirmResetTitle}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
              {s.confirmResetMsg}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
              >
                {s.cancel}
              </button>
              <button
                onClick={handleConfirmReset}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                {s.confirmErase}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
