'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
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

  const handleSearch = (query: string) => {
    if (pathname !== '/' && !query) {
      return;
    }

    if (query) {
      router.push(`/?search=${query}`);
    } else {
      const hasCategory = searchParams.get('category');
      const hasSort = searchParams.get('sort');

      if (pathname === '/' && !hasCategory && !hasSort) {
        router.push('/');
      }
      

    }
  }; 
  
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/" className="text-xl font-bold text-blue-600 flex-shrink-0">
              NEXT.SHOP
            </Link>

            <div className="flex-1 flex justify-center">
              <SearchInput onSearch={handleSearch} />
            </div>

            <nav className="flex items-center gap-2 sm:gap-6">
              <Link href="/" className="hidden sm:block text-sm font-medium hover:text-blue-600 transition-colors">
                Catalog
              </Link>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Open cart"
              >
                <ShoppingCart size={24} />
                {isMounted && totalItems > 0 && (
                  <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm">
                    {totalItems}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;