import { useState, useEffect } from 'react';

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true);
    }
  }, []);

  return mounted;
};
