'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGetProductByIdQuery } from '@/store/services/productApi';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/cartSlice';
import { formatPrice } from '@/utils/formatPrice';
import Button from '@/components/atoms/Button';
import toast from 'react-hot-toast';
import { ChevronLeft, Star, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  
  const { data: product, isLoading, error } = useGetProductByIdQuery(id as string);

  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (product) {
      setActiveImage(product.thumbnail);
    }
  }, [product]);

  if (isLoading) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-pulse text-gray-400">
      Loading product details...
    </div>
  );

  if (error || !product) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Product not found</h1>
      <Link href="/" className="text-blue-600 hover:underline mt-4 block">Back to Catalog</Link>
    </div>
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8 transition-colors">
        <ChevronLeft size={16} /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-3xl border bg-gray-50 flex items-center justify-center">
            <img 
              src={activeImage || product.thumbnail}
              alt={product.title} 
              className="h-full w-full object-contain p-8 transition-all duration-300"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {[product.thumbnail, ...(product.images || [])].slice(0, 5).map((img, index) => (
              <button 
                key={index} 
                onClick={() => setActiveImage(img)}
                className={`aspect-square rounded-xl border overflow-hidden bg-gray-50 transition-all ${
                  activeImage === img ? 'border-blue-600 ring-2 ring-blue-100' : 'hover:opacity-75'
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-6">
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mt-4">{product.title}</h1>
            
            <div className="flex items-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-1 text-yellow-500 font-bold">
                <Star size={18} fill="currentColor" /> {product.rating}
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500">In Stock: {product.stock}</span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="mt-auto">
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-extrabold text-gray-900">
                {formatPrice(product.price)}
              </span>
              <span className="text-xl text-gray-400 line-through">
                {formatPrice(product.price * 1.2)} 
              </span>
            </div>

            <Button size="lg" className="w-full md:w-auto px-12 py-7 text-lg shadow-xl shadow-blue-200" onClick={handleAddToCart}>
              Add to Cart
            </Button>

            <div className="grid grid-cols-2 gap-4 mt-12 pt-8 border-t">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Truck size={20} /></div>
                <div>
                  <p className="text-sm font-bold">Free Shipping</p>
                  <p className="text-xs text-gray-500">Orders over $50</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><ShieldCheck size={20} /></div>
                <div>
                  <p className="text-sm font-bold">2 Year Warranty</p>
                  <p className="text-xs text-gray-500">Full protection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}