import { NextResponse, type NextRequest } from 'next/server';
import { verifyAdminAuth } from '@/app/_server/adminAuth';

export async function GET(request: NextRequest) {
  const isAuth = verifyAdminAuth(request);
  if (!isAuth) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true });
}
