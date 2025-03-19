'use client';

import { useMemo } from 'react';
import { UrqlProvider, ssrExchange, cacheExchange, fetchExchange, createClient } from '@urql/next';
import { CONFIG } from '@/constants';

const Providers = ({ children }: React.PropsWithChildren) => {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: typeof window !== 'undefined'
    });
    const client = createClient({
      url: CONFIG.BACKEND_URL,
      exchanges: [cacheExchange, ssr, fetchExchange],
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
