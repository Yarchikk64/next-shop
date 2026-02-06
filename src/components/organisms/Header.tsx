'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { ShoppingCart, ShoppingBag } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { useIsMounted } from '@/store/useIsMounted'; 
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { SearchInput } from '../atoms/SearchInput';
import CartDrawer from '../molecules/CartDrawer'; 

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isMounted = useIsMounted();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Оборачиваем в useCallback, чтобы ссылка на функцию не менялась при каждом рендере
  const handleSearch = useCallback((query: string) => {
    // ГЛАВНОЕ ИСПРАВЛЕНИЕ: 
    // Если мы на странице товара (не на главной) и поиск пустой — ничего не делаем.
    // Это предотвращает автоматический редирект на главную при монтировании компонента поиска.
    if (pathname !== '/' && !query) return; 

    const params = new URLSearchParams(searchParams.toString());
    
    if (query) {
      params.set('search', query);
      // Если мы начали искать, находясь на странице товара, нас перекинет на главную с результатами
      router.push(`/?${params.toString()}`);
    } else {
      // Если запрос пустой и мы на главной — сбрасываем поиск
      params.delete('search');
      router.push(`/?${params.toString()}`);
    }
  }, [pathname, router, searchParams]); 
  
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-brand-200/50 bg-brand-50/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4 md:gap-8">
            
            {/* Logo Section */}
            <Link href="/" className="group flex items-center gap-3 flex-shrink-0">
              <div className="w-11 h-11 bg-brand-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-600/20 group-hover:bg-brand-700 transition-all duration-300">
                <ShoppingBag size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold tracking-tight text-gray-900 leading-none italic">
                  Next<span className="text-brand-600 font-sans not-italic">.Shop</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-600/60 font-bold">Premium Selection</span>
              </div>
            </Link>

            {/* Search Section */}
            <div className="flex-1 max-w-xl hidden md:block">
              <SearchInput onSearch={handleSearch} />
            </div>

            {/* Actions Section */}
            <div className="flex items-center gap-6">
              <Link 
                href="/" 
                className="hidden lg:block text-xs font-black text-brand-600 hover:text-brand-700 transition-colors tracking-widest uppercase"
              >
                Catalog
              </Link>
              
              <div className="h-8 w-[1px] bg-brand-200 hidden sm:block mx-2"></div>

              {/* Cart Button */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 bg-white border-2 border-[#800020] rounded-2xl hover:bg-[#800020] group transition-all duration-300 shadow-sm"
                aria-label="Open cart"
              >
                <ShoppingCart 
                  size={26} 
                  className="text-[#800020] group-hover:text-white transition-colors duration-300" 
                  strokeWidth={2.75} 
                />
                
                {isMounted && totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#800020] text-[11px] font-bold text-white border-2 border-[#FDFBF7] shadow-md">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          <div className="md:hidden pb-4">
            <SearchInput onSearch={handleSearch} />
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;