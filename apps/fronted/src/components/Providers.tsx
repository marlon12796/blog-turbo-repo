'use client';

import { useMemo } from 'react';
import { UrqlProvider, ssrExchange, cacheExchange, fetchExchange, createClient } from '@urql/next';
import { CONFIG } from '@/constants';
import { Session } from '@/lib/helpers/session';

interface ProviderTypes {
  children: React.ReactNode;
  session: Session | null;
}
const Providers = ({ children, session }: ProviderTypes) => {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: typeof window !== 'undefined'
    });
    const client = createClient({
      url: CONFIG.BACKEND_URL,
      exchanges: [cacheExchange, ssr, fetchExchange],
      fetchOptions: () => {
        return {
          headers: { authorization: session?.accessToken ? `Bearer ${session.accessToken}` : '' }
        };
      },
      suspense: true
    });
      
    return [client, ssr];
  }, []);
  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  );
};
export default Providers;
