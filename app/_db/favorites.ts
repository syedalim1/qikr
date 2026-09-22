import { db } from './local';
import type { FavoriteRecord, RoutineId } from '../_lib/types';
import { routines } from '../_lib/data';

/**
 * Retrieves all favorited dhikr IDs from IndexedDB.
 */
export async function getLocalFavorites(): Promise<string[]> {
  if (typeof window === 'undefined') return [];

  try {
    const favs = await db.favorites.toArray();
    return favs.map((f) => f.dhikrId);
  } catch (err) {
    console.error('Failed to get favorites from IndexedDB:', err);
    return [];
  }
}

/**
 * Checks if a dhikr is in favorites.
 */
export async function isLocalFavorite(dhikrId: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  try {
    const item = await db.favorites.get(dhikrId);
    return !!item;
  } catch (err) {
    return false;
  }
}

/**
 * Toggles a dhikr in favorites (adds if missing, deletes if present).
 */
export async function toggleLocalFavorite(dhikrId: string, routineId?: RoutineId): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  try {
    const existing = await db.favorites.get(dhikrId);
    if (existing) {
      await db.favorites.delete(dhikrId);
      return false;
    } else {
      // Find routineId if not supplied
      let rId: RoutineId = routineId || 'morning';
      if (!routineId) {
        for (const r of routines) {
          if (r.dhikrs.some((d) => d.id === dhikrId)) {
            rId = r.id;
            break;
          }
        }
      }

      await db.favorites.put({
        dhikrId,
        routineId: rId,
        addedAt: new Date().toISOString(),
      });
      return true;
    }
  } catch (err) {
    console.error('Failed to toggle favorite:', err);
    return false;
  }
}
