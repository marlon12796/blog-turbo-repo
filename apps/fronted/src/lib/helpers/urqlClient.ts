import { CONFIG } from '@/constants';
import { cacheExchange, createClient, fetchExchange } from '@urql/core';
import { registerUrql } from '@urql/next/rsc';

// Función para crear el cliente URQL
const makeClient = () => {
  return createClient({
    url: CONFIG.BACKEND_URL,
    exchanges: [cacheExchange, fetchExchange]
  });
};

// Registrar el cliente con `registerUrql`
export const { getClient } = registerUrql(makeClient);
