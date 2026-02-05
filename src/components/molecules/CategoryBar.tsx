'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetCategoriesQuery } from '@/store/services/productApi';

const SORT_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating', value: 'rating' },
];

const CategoryBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: categories, isLoading } = useGetCategoriesQuery();
  
  const currentCategory = searchParams.get('category') || 'all';
  const currentSort = searchParams.get('sort') || 'default';

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === 'all' || value === 'default') {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    if (key === 'category') params.delete('search');

    router.push(`/?${params.toString()}`);
  };

  if (isLoading) return <div className="h-12 animate-pulse bg-gray-100 rounded-lg mb-8" />;

  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => updateQuery('category', 'all')}
          className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            currentCategory === 'all'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white border text-gray-600 hover:border-blue-400'
          }`}
        >
          All Products
        </button>

        {categories?.map((category) => (
          <button
            key={category}
            onClick={() => updateQuery('category', category)}
            className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all capitalize ${
              currentCategory === category
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white border text-gray-600 hover:border-blue-400'
            }`}
          >
            {category.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <label htmlFor="sort" className="text-sm font-medium text-gray-500">
          Sort by:
        </label>
        <select
          id="sort"
          value={currentSort}
          onChange={(e) => updateQuery('sort', e.target.value)}
          className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none cursor-pointer hover:border-gray-300 transition-colors"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategoryBar;