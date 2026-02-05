'use client';

import { useState, useEffect } from 'react';

export const useIsMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      setMounted(true);
    }
    return () => {
      isApiSubscribed = false;
    };
  }, []);

  return mounted;
};