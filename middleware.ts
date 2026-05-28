import { NextRequest, NextResponse } from 'next/server';

const getAdminAuthHeader = () => {
  const username = process.env.ADMIN_BASIC_AUTH_USER;
  const password = process.env.ADMIN_BASIC_AUTH_PASSWORD;

  if (!username || !password) {
    return null;
  }

  return `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
};

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const expectedAuth = getAdminAuthHeader();

  if (!expectedAuth) {
    return NextResponse.json({ error: 'Admin access is not configured.' }, { status: 503 });
  }

  const providedAuth = request.headers.get('authorization');

  if (providedAuth !== expectedAuth) {
    return new NextResponse('Authentication required.', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
