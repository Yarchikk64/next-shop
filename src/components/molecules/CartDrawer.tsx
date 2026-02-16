'use client';

import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { CartItem } from '../molecules/CartItem';
import { formatPrice } from '@/utils/formatPrice';
import { CartDrawerProps, CartFooterProps } from '@/types/index';

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totalPrice, handleUpdateQuantity, handleRemove, handleCheckout } = useCart(onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500" 
        onClick={onClose} 
      />
      
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10 animate-in slide-in-from-right duration-300">
        <div className="w-screen max-w-md">
          <div className="flex h-full flex-col bg-[#FDFBF7] shadow-2xl">
            <div className="flex items-center justify-between px-6 py-8 border-b border-gray-100">
              <h2 className="text-2xl font-serif font-bold italic text-gray-900">Your Bag</h2>
              <button onClick={onClose} className="p-2 text-[#800020] hover:rotate-90 transition-transform duration-300">
                <X size={28} strokeWidth={2.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
              {items.length === 0 ? (
                <EmptyCartState />
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <CartItem 
                      key={item.id} 
                      item={item} 
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <CartFooter 
                totalPrice={totalPrice} 
                onCheckout={handleCheckout} 
                onClose={onClose} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const EmptyCartState = () => (
  <div className="flex flex-col items-center justify-center h-64 text-center">
    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
      <ShoppingBag size={40} className="text-gray-200" />
    </div>
    <p className="text-gray-400 font-medium italic">Your bag is as light as air...</p>
  </div>
);

const CartFooter = ({ totalPrice, onCheckout, onClose }: CartFooterProps) => (
  <div className="border-t border-gray-100 bg-white px-6 py-8 space-y-5 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
    <div className="flex justify-between items-end">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Estimated Total</span>
      <span className="text-3xl font-black text-[#800020] tracking-tighter">{formatPrice(totalPrice)}</span>
    </div>
    
    <button 
      onClick={onCheckout}
      className="w-full bg-[#800020] text-white py-6 rounded-2xl shadow-xl shadow-brand-900/10 hover:bg-[#600018] active:scale-[0.98] transition-all duration-300 font-black uppercase tracking-widest"
    >
      Proceed to Checkout
    </button>
    
    <button onClick={onClose} className="w-full text-center text-[10px] font-black text-gray-400 hover:text-[#800020] transition-colors uppercase tracking-[0.2em]">
      ← Continue Shopping
    </button>
  </div>
);