'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { formatPrice } from '@/utils/formatPrice';
import { Package, Calendar, ChevronRight, User as UserIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Order {
  id: string;
  total: number;
  createdAt: string;
  items: any[];
  status?: string; 
}

export default function ProfilePage() {
  const { user, isLoaded: userLoaded } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/user-orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    if (userLoaded && user) {
      fetchOrders();
    }
  }, [user, userLoaded]);

  if (!userLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <Loader2 className="animate-spin text-[#800020]" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex flex-col md:flex-row items-center gap-6 mb-16 p-8 bg-white rounded-[2.5rem] border border-brand-100 shadow-sm">
          <img 
            src={user?.imageUrl} 
            alt="Profile" 
            className="w-24 h-24 rounded-3xl border-4 border-brand-50 shadow-inner"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-serif font-bold italic text-gray-900">
              Welcome back, {user?.firstName || 'Guest'}
            </h1>
            <p className="text-gray-500 font-medium">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
          <div className="md:ml-auto">
            <Link 
              href="/" 
              className="text-xs font-black uppercase tracking-widest text-[#800020] border-2 border-[#800020] px-6 py-3 rounded-xl hover:bg-[#800020] hover:text-white transition-all"
            >
              Back to Store
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <Package className="text-[#800020]" size={24} />
            <h2 className="text-xl font-bold uppercase tracking-widest text-gray-900">Order History</h2>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-12 text-center border border-dashed border-brand-200">
              <p className="text-gray-400 italic mb-6">You haven't placed any orders yet.</p>
              <Link href="/" className="text-[#800020] font-bold uppercase tracking-widest text-sm hover:underline">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {orders.map((order) => (
                <div 
                  key={order.id} 
                  className="group bg-white p-6 rounded-[1.5rem] border border-brand-50 shadow-sm hover:shadow-md transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-[#800020]">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-tighter text-gray-400">
                        Order #{order.id.slice(-6).toUpperCase()}
                      </p>
                      <p className="font-bold text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { 
                          month: 'long', day: 'numeric', year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total</p>
                      <p className="text-lg font-black text-[#800020]">{formatPrice(order.total)}</p>
                    </div>
                    <ChevronRight className="text-gray-300 group-hover:text-[#800020] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}