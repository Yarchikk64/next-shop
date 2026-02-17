'use client';

import React from 'react';
import ProductCard from '@/components/molecules/ProductCard';
import { Product } from '@/types/index';
import { Loader2 } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

export default function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <Loader2 className="animate-spin text-[#800020] w-12 h-12" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
          Curating Collection...
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-24 border-2 border-dashed border-gray-100 rounded-[3rem]">
        <p className="text-gray-400 italic font-serif text-xl">
          No pieces found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}