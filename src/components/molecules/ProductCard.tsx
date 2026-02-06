'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ShoppingBag, Plus } from 'lucide-react';
import { Product } from '@/types/product';
import { formatPrice } from '@/utils/formatPrice';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/cartSlice';
import toast from 'react-hot-toast';

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart(product));
    toast.success('Added to bag');
  };

  const oldPrice = product.price / (1 - product.discountPercentage / 100);

  return (
    <Link 
      href={`/product/${product.id}`}
      className="group relative flex flex-col bg-white/60 border border-brand-100/50 rounded-[2.5rem] p-4 transition-all duration-500 hover:bg-white hover:shadow-soft"
    >
      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-brand-100/50 flex items-center justify-center p-8">
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="h-full w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
        />
        
        <button 
          onClick={handleAdd}
          className="absolute bottom-4 right-4 p-4 bg-brand-600 text-white rounded-2xl shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-700 active:scale-95"
        >
          <Plus size={24} />
        </button>

        {product.discountPercentage > 5 && (
          <div className="absolute top-4 left-4 bg-brand-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-lg">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
      </div>

      <div className="mt-5 space-y-2 px-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-600/60">
            {product.category}
          </span>
          <div className="flex items-center gap-1 bg-brand-100/80 px-2 py-1 rounded-lg">
            <Star size={10} className="fill-brand-600 text-brand-600" />
            <span className="text-[11px] font-bold text-brand-700">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="text-gray-800 font-bold text-lg line-clamp-1 group-hover:text-brand-600 transition-colors duration-300">
          {product.title}
        </h3>
        
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-xl font-black text-brand-700">
            {formatPrice(product.price)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-brand-200 line-through decoration-brand-200/50 font-medium">
              {formatPrice(oldPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}