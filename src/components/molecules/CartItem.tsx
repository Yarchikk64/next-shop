'use client';

import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { formatPrice } from '@/utils/formatPrice';
import { CartItem as CartItemType } from '@/types/index';

interface Props {
  item: CartItemType;
  onUpdateQuantity: (id: number, q: number) => void;
  onRemove: (id: number) => void;
}

export const CartItem = ({ item, onUpdateQuantity, onRemove }: Props) => {
  return (
    <div className="flex gap-4 group bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50 p-2">
        <img 
          src={item.thumbnail} 
          alt={item.title} 
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110" 
        />
      </div>
      
      <div className="flex flex-1 flex-col justify-between py-1">
        <div>
          <h3 className="text-sm font-black text-gray-800 line-clamp-1 uppercase tracking-tight">
            {item.title}
          </h3>
          <p className="mt-1 text-lg font-black text-[#800020]">
            {formatPrice(item.price)}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center border-2 border-gray-100 rounded-xl bg-white overflow-hidden">
            <button 
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="p-1 px-2 hover:bg-gray-50 text-[#800020] transition-colors disabled:opacity-30"
            >
              <Minus size={14} strokeWidth={4} />
            </button>
            
            <span className="px-2 text-sm font-black text-gray-900 min-w-[24px] text-center">
              {item.quantity}
            </span>
            
            <button 
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-1 px-2 hover:bg-gray-50 text-[#800020] transition-colors"
            >
              <Plus size={14} strokeWidth={4} />
            </button>
          </div>

          <button 
            onClick={() => onRemove(item.id)}
            className="text-gray-300 hover:text-red-500 transition-colors p-1"
            title="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};