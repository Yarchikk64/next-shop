import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export const useHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useCallback((query: string) => {
    if (pathname !== '/' && !query) return; 

    const params = new URLSearchParams(searchParams.toString());
    
    if (query) {
      params.set('search', query);
      router.push(`/?${params.toString()}`);
    } else {
      params.delete('search');
      router.push(`/?${params.toString()}`);
    }
  }, [pathname, router, searchParams]);

  return { handleSearch, pathname };
};