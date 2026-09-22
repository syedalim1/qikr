import { NextResponse, type NextRequest } from 'next/server';
import { getAdminSecret } from '@/app/_server/adminAuth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret } = body;

    const validSecret = getAdminSecret();
    if (!secret || secret.trim() !== validSecret) {
      return NextResponse.json({ success: false, error: 'Invalid admin credentials' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, message: 'Authenticated' });

    // Set secure cookie
    response.cookies.set('qikr_admin_token', validSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Authentication failed' }, { status: 500 });
  }
}
