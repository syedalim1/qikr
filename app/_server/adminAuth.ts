import { type NextRequest } from 'next/server';

const DEFAULT_ADMIN_SECRET = 'qikr_admin_secret_2026';

export function getAdminSecret(): string {
  return process.env.ADMIN_SECRET || DEFAULT_ADMIN_SECRET;
}

/**
 * Validates whether the incoming request is from an authenticated admin.
 * Checks Bearer header, x-admin-key header, or qikr_admin_token cookie.
 */
export function verifyAdminAuth(request: NextRequest): boolean {
  const secret = getAdminSecret();

  // 1. Check header
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    if (token === secret) return true;
  }

  const customKey = request.headers.get('x-admin-key');
  if (customKey && customKey.trim() === secret) {
    return true;
  }

  // 2. Check cookie
  const cookieToken = request.cookies.get('qikr_admin_token')?.value;
  if (cookieToken && cookieToken === secret) {
    return true;
  }

  return false;
}
