'use client';

import React, { useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetProductsQuery } from '@/store/services/productApi';
import ProductGrid from '@/components/organisms/ProductGrid';
import ProductCardSkeleton from '@/components/molecules/ProductCardSkeleton';
import CategoryBar from '@/components/molecules/CategoryBar';

function HomeContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'default';

  const { data, isLoading, isFetching } = useGetProductsQuery({ search, category });

  const sortedProducts = useMemo(() => {
    if (!data?.products) return [];

    const products = [...data.products];

    switch (sort) {
      case 'price-asc':
        return products.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return products.sort((a, b) => b.price - a.price);
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating);
      default:
        return products;
    }
  }, [data, sort]);

  const getPageTitle = () => {
    if (search) return `Search results for: "${search}"`;
    if (category !== 'all') return `Category: ${category.replace('-', ' ')}`;
    return 'Featured Products';
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <CategoryBar />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight capitalize">
          {getPageTitle()}
        </h1>
        {data?.products && !isLoading && (
          <p className="text-sm text-gray-500 mt-2">
            Found {data.products.length} products
          </p>
        )}
      </div>

      {(isLoading || isFetching) ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : (
        <ProductGrid products={sortedProducts} />
      )}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-xl font-medium text-gray-400">Loading catalog...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}