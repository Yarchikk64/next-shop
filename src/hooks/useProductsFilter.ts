import { useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGetProductsQuery } from '@/store/services/productApi';

export const useProductsFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'default';

  const { data, isLoading } = useGetProductsQuery({ search, category });

  const setSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const sortedProducts = useMemo(() => {
    if (!data?.products) return [];
    const p = [...data.products];
    switch (sort) {
      case 'price-asc': return p.sort((a, b) => a.price - b.price);
      case 'price-desc': return p.sort((a, b) => b.price - a.price);
      case 'rating': return p.sort((a, b) => b.rating - a.rating);
      default: return p;
    }
  }, [data, sort]);

  return { sortedProducts, isLoading, sort, setSort };
};