import { NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE } from '@/lib/admin-auth';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  const allowedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!allowedEmail) {
    return NextResponse.json({ error: 'Admin access has not been configured.' }, { status: 500 });
  }

  if (!email || !password || email !== allowedEmail) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.session || !data.user || data.user.email?.toLowerCase() !== allowedEmail) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, data.session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: Math.max(60, data.session.expires_in),
  });

  return response;
}
