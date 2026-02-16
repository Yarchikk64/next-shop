'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, Loader2 } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { OrderCard } from '@/components/profile/OrderCard';

export default function ProfilePage() {
  const { orders, loading, user } = useOrders();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <Loader2 className="animate-spin text-[#800020]" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex flex-col md:flex-row items-center gap-6 mb-16 p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
          <img 
            src={user?.imageUrl} 
            alt="Profile" 
            className="w-24 h-24 rounded-3xl border-4 border-gray-50 shadow-inner object-cover"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-serif font-bold italic text-gray-900 leading-tight">
              Welcome back, {user?.firstName || 'Guest'}
            </h1>
            <p className="text-gray-500 font-medium">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
          <div className="md:ml-auto">
            <Link 
              href="/" 
              className="text-xs font-black uppercase tracking-widest text-[#800020] border-2 border-[#800020] px-6 py-3 rounded-xl hover:bg-[#800020] hover:text-white transition-all active:scale-95"
            >
              Back to Store
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <Package className="text-[#800020]" size={24} />
            <h2 className="text-xl font-bold uppercase tracking-widest text-gray-900">Order History</h2>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-12 text-center border border-dashed border-gray-200">
              <p className="text-gray-400 italic mb-6">You haven&apos;t placed any orders yet.</p>
              <Link href="/" className="bg-[#800020] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs inline-block shadow-lg hover:bg-[#600018] transition-all active:scale-95">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}