'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetProductByIdQuery } from '@/store/services/productApi';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/cartSlice';
import { formatPrice } from '@/utils/formatPrice';
import { Star, ChevronLeft, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const { data: product, isLoading, error } = useGetProductByIdQuery(Number(id));

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#800020]"></div>
    </div>
  );

  if (error || !product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7]">
      <h2 className="text-3xl font-serif italic mb-6 text-gray-900">Piece not found</h2>
      <button 
        onClick={() => router.push('/')} 
        className="bg-[#800020] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-[#600018] transition-all"
      >
        Back to Collection
      </button>
    </div>
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to bag`, {
      style: {
        borderRadius: '20px',
        background: '#800020',
        color: '#fff',
        fontWeight: '900',
        textTransform: 'uppercase',
        fontSize: '12px',
        letterSpacing: '0.1em'
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-[#800020] transition-colors group font-black uppercase tracking-widest text-[10px]"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          <div className="relative group">
            <div className="aspect-square rounded-[3.5rem] bg-white border border-brand-100 overflow-hidden p-12 flex items-center justify-center shadow-premium transition-transform duration-500 hover:scale-[1.02]">
              <img 
                src={product.thumbnail} 
                alt={product.title}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <p className="text-[11px] font-black text-[#800020] uppercase tracking-[0.4em]">
                {product.category}
              </p>
              <h1 className="text-6xl font-serif font-bold italic text-gray-900 leading-[1.1]">
                {product.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 bg-[#800020] px-3 py-1 rounded-full shadow-lg shadow-brand-600/20">
                  <Star size={14} className="fill-white text-white" />
                  <span className="font-black text-[12px] text-white">{product.rating}</span>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-l pl-4 border-gray-200">
                  Limited Edition
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-black text-[#800020] tracking-tighter">
                {formatPrice(product.price)}
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed text-xl italic font-medium max-w-lg">
              {product.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-y border-brand-100">
              <div className="flex flex-col gap-2">
                <Truck size={24} className="text-[#800020]" />
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-900">Global Delivery</span>
              </div>
              <div className="flex flex-col gap-2">
                <ShieldCheck size={24} className="text-[#800020]" />
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-900">Secure Payment</span>
              </div>
              <div className="flex flex-col gap-2">
                <RotateCcw size={24} className="text-[#800020]" />
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-900">Easy Returns</span>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full bg-[#800020] text-white py-7 rounded-[2rem] flex items-center justify-center gap-4 group shadow-2xl shadow-brand-600/40 hover:bg-[#600018] active:scale-[0.98] transition-all duration-300"
            >
              <ShoppingBag size={24} className="group-hover:rotate-12 transition-transform" />
              <span className="text-xl font-black uppercase tracking-[0.2em] drop-shadow-md">
                Add to Bag
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}