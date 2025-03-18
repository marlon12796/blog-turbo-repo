import 'server-only';
import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';
import { redirect } from 'next/navigation';

export type SessionUser = {
  id: number;
  name: string;
  email: string;
};

export type Session = {
  user: SessionUser;
  accessToken: string;
};

const secretKey = process.env.JWT_SECRET!;
const encodedKey = new TextEncoder().encode(secretKey);

const EXPIRATION_TIME = {
  hours: 1,
  minutes: 0,
  days: 0
};

const getExpirationTime = () => (EXPIRATION_TIME.days * 24 + EXPIRATION_TIME.hours) * 60 * 60 * 1000 + EXPIRATION_TIME.minutes * 60 * 1000;

export async function createSession(payload: Session) {
  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${EXPIRATION_TIME.hours}h`)
    .sign(encodedKey);

  const expiredAt = new Date(Date.now() + getExpirationTime());

  (await cookies()).set('session', session, {
    httpOnly: true, // 🔒 Protege contra XSS
    secure: process.env.NODE_ENV === 'production', // 🔐 Solo en HTTPS en producción
    expires: expiredAt, // ⏳ Expira según configuración
    sameSite: 'lax',
    path: '/'
  });
}

export async function getSession() {
  const cookie = (await cookies()).get('session')?.value;
  if (!cookie) return null;
  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ['HS256']
    });
    return payload as Session;
  } catch {
    deleteSession(); // 🔴 Elimina la sesión inválida
    redirect('/auth/signin');
  }
}

export async function deleteSession() {
  (await cookies()).delete('session');
}
