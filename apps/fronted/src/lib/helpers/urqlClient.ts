// lib/graphql/client.ts
import { CONFIG } from '@/constants';
import { cacheExchange, createClient, fetchExchange } from '@urql/core';
import { getSession } from './session';
import { cache } from 'react';

// Tipo seguro para la sesión
type Session = { accessToken?: string } | null;

// Cliente sin autenticación (público)
export const publicClient = createClient({
  url: CONFIG.BACKEND_URL,
  exchanges: [cacheExchange, fetchExchange]
});

// Función para crear un cliente autenticado
export const makeClient = (session: Session = null) => {
  if (!session?.accessToken) return publicClient; // Usa el cliente público si no hay sesión

  return createClient({
    url: CONFIG.BACKEND_URL,
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: {
      headers: { authorization: `Bearer ${session.accessToken}` }
    }
  });
};
export const getCachedSession = cache(async () => {
  return await getSession().catch(() => null);
});

export const getClient = async () => {
  const session = await getCachedSession();
  return makeClient(session);
};
