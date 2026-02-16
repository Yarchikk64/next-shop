'use client';

import { Suspense } from 'react';
import { useProductsFilter } from '@/hooks/useProductsFilter';
import ProductGrid from '@/components/organisms/ProductGrid';
import CategoryBar from '@/components/molecules/CategoryBar';
import { CollectionHeader } from '@/components/molecules/CollectionHeader';

function HomeContent() {
  const { sortedProducts, isLoading, sort, setSort } = useProductsFilter();

  return (
    <main className="max-w-7xl mx-auto px-4 py-16 min-h-screen">
      <CollectionHeader sort={sort} onSortChange={setSort} />
      
      <div className="space-y-12">
        <CategoryBar />
        <ProductGrid products={sortedProducts} isLoading={isLoading} />
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}