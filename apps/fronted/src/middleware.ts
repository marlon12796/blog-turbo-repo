import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './lib/helpers/session';

export async function middleware(request: NextRequest) {
  const session = await getSession();
  if (!session || !session.user) return NextResponse.redirect(new URL('/auth/signin', request.url));
}

export const config = {
  matcher: '/user/:path*'
};
