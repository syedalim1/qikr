/**
 * Stable device identification for guest/personal session tracking.
 * Survives page reloads, browser restarts, and offline sessions.
 */

const DEVICE_ID_KEY = 'qikr_device_id';

export function getDeviceId(): string {
  if (typeof window === 'undefined') {
    return 'server_anonymous';
  }

  try {
    let deviceId = localStorage.getItem(DEVICE_ID_KEY);
    if (!deviceId) {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        deviceId = `dev_${crypto.randomUUID()}`;
      } else {
        deviceId = `dev_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
      }
      localStorage.setItem(DEVICE_ID_KEY, deviceId);
    }
    return deviceId;
  } catch {
    return 'fallback_device';
  }
}
