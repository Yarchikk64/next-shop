'use client';
import { useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetProductsQuery } from '@/store/services/productApi';
import ProductGrid from '@/components/organisms/ProductGrid';
import CategoryBar from '@/components/molecules/CategoryBar';

function HomeContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'default';

  const { data, isLoading } = useGetProductsQuery({ search, category });

  const sortedProducts = useMemo(() => {
    if (!data?.products) return [];
    const p = [...data.products];
    if (sort === 'price-asc') return p.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') return p.sort((a, b) => b.price - a.price);
    if (sort === 'rating') return p.sort((a, b) => b.rating - a.rating);
    return p;
  }, [data, sort]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-serif font-bold italic mb-2">Our Collection</h1>
          <p className="text-brand-600/60 font-medium italic">Exquisite items curated for you</p>
        </div>
        <select 
          value={sort}
          onChange={(e) => {
            const p = new URLSearchParams(searchParams.toString());
            p.set('sort', e.target.value);
            window.history.pushState(null, '', `?${p.toString()}`);
          }}
          className="bg-transparent border-b-2 border-brand-600 py-2 font-bold text-brand-600 outline-none"
        >
          <option value="default">Sort: Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <CategoryBar />
      <ProductGrid products={sortedProducts} isLoading={isLoading} />
    </main>
  );
}

export default function Page() {
  return <Suspense><HomeContent /></Suspense>;
}