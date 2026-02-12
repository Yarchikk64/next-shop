'use client';

import React from 'react';
import { X, ShoppingBag, Trash2, Minus, Plus } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromCart, updateQuantity } from '@/store/cartSlice';
import { formatPrice } from '@/utils/formatPrice';
import { useRouter } from 'next/navigation'; 

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const dispatch = useAppDispatch();
  const router = useRouter(); 
  const { items } = useAppSelector((state) => state.cart);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose(); 
    router.push('/checkout'); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div 
        className="absolute inset-0 bg-brand-700/30 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform transition-all">
          <div className="flex h-full flex-col bg-[#FDFBF7] shadow-2xl border-l border-brand-200">
            
            <div className="flex items-center justify-between px-6 py-8 border-b border-brand-100">
              <h2 className="text-2xl font-serif font-bold italic text-gray-900">Your Bag</h2>
              <button onClick={onClose} className="p-2 text-[#800020] hover:rotate-90 transition-transform">
                <X size={28} strokeWidth={2.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <ShoppingBag size={64} className="text-brand-200 mb-4" />
                  <p className="text-gray-500 font-medium italic">Your bag is as light as air...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 group bg-white p-3 rounded-2xl border border-brand-100/50">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-brand-50 p-2">
                        <img src={item.thumbnail} alt={item.title} className="h-full w-full object-contain" />
                      </div>
                      
                      <div className="flex flex-1 flex-col justify-between py-1">
                        <div>
                          <h3 className="text-sm font-black text-gray-800 line-clamp-1 uppercase">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-lg font-black text-[#800020]">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border-2 border-brand-100 rounded-xl bg-white overflow-hidden">
                            <button 
                              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                              className="p-1 px-2 hover:bg-brand-50 text-[#800020]"
                            >
                              <Minus size={14} strokeWidth={4} />
                            </button>
                            <span className="px-2 text-sm font-black text-gray-900">{item.quantity}</span>
                            <button 
                              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                              className="p-1 px-2 hover:bg-brand-50 text-[#800020]"
                            >
                              <Plus size={14} strokeWidth={4} />
                            </button>
                          </div>
                          <button 
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-gray-400 hover:text-[#800020] transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t-2 border-brand-100 bg-white px-6 py-8 space-y-5">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Estimated Total</span>
                  <span className="text-3xl font-black text-[#800020] tracking-tighter">{formatPrice(totalPrice)}</span>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[#800020] text-white py-6 rounded-[20px] shadow-2xl shadow-brand-600/30 hover:bg-[#600018] active:scale-[0.97] transition-all duration-300"
                >
                  <span className="text-base font-black uppercase tracking-[0.2em] drop-shadow-md">
                    Proceed to Checkout
                  </span>
                </button>
                
                <button 
                  onClick={onClose}
                  className="w-full text-center text-xs font-bold text-gray-400 hover:text-[#800020] transition-colors uppercase tracking-[0.2em]"
                >
                  ← Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}