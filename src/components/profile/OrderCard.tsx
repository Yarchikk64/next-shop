import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { Order } from '@/types';
import { formatPrice } from '@/utils/formatPrice';

interface Props {
  order: Order;
}

export const OrderCard = ({ order }: Props) => {
  return (
    <div className="group bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#800020]">
          <Calendar size={20} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-tighter text-gray-400">
            Order #{order.id?.slice(-6).toUpperCase()}
          </p>
          <p className="font-bold text-gray-900">
            {order.createdAt && new Date(order.createdAt).toLocaleDateString('en-US', { 
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
  );
};