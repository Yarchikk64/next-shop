import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export const Logo = () => (
  <Link href="/" className="group flex items-center gap-3 flex-shrink-0">
    <div className="w-11 h-11 bg-brand-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-600/20 group-hover:bg-brand-700 transition-all duration-300">
      <ShoppingBag size={24} />
    </div>
    <div className="flex flex-col">
      <span className="text-2xl font-serif font-bold tracking-tight text-gray-900 leading-none italic">
        Next<span className="text-brand-600 font-sans not-italic">&Shop</span>
      </span>
      <span className="text-[10px] uppercase tracking-[0.3em] text-brand-600/60 font-bold">Premium Selection</span>
    </div>
  </Link>
);