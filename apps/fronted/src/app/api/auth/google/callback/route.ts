import { CONFIG } from '@/constants';
import { createSession } from '@/lib/helpers/session';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET(req: NextResponse) {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get('accessToken');
  const userId = searchParams.get('userId');
  const name = searchParams.get('name');
  const avatar = searchParams.get('avatar');
  if (!accessToken || !userId || !name) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  const res = await fetch(`${CONFIG.BACKEND_URL}/auth/verify-token`, {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });
  if (res.status === 401) return NextResponse.json({ error: 'Invalid access token' }, { status: 401 });
  await createSession({
    accessToken,
    user: {
      avatar: avatar ?? '',
      id: parseInt(userId),
      name
    }
  });
  redirect('/');
}
