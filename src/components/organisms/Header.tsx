'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { useIsMounted } from '@/store/useIsMounted'; 
import { useHeader } from '@/hooks/useHeader';
import { SearchInput } from '../atoms/SearchInput';
import { Logo } from '../atoms/Logo';
import CartDrawer from '../molecules/CartDrawer'; 
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isMounted = useIsMounted();
  const { handleSearch, pathname } = useHeader();
  
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-brand-200/50 bg-brand-50/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4 md:gap-8">
            
            <Logo />

            <div className="flex-1 max-w-xl hidden md:block">
              <SearchInput onSearch={handleSearch} />
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <NavLinks pathname={pathname} />
              
              <div className="h-8 w-[1px] bg-brand-200 hidden sm:block mx-1"></div>

              <AuthSection pathname={pathname} />

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 bg-white border-2 border-[#800020] rounded-2xl hover:bg-[#800020] group transition-all duration-300 shadow-sm active:scale-95"
              >
                <ShoppingCart size={26} className="text-[#800020] group-hover:text-white transition-colors" strokeWidth={2.75} />
                {isMounted && totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#800020] text-[11px] font-bold text-white border-2 border-[#FDFBF7] animate-in zoom-in">
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

const NavLinks = ({ pathname }: { pathname: string }) => (
  <Link 
    href="/" 
    className="hidden lg:block text-xs font-black text-brand-600 hover:text-brand-700 transition-colors tracking-widest uppercase"
  >
    Catalog
  </Link>
);

const AuthSection = ({ pathname }: { pathname: string }) => (
  <div className="flex items-center min-w-[32px]">
    <SignedOut>
      <SignInButton mode="modal">
        <button className="flex items-center gap-2 p-2 text-[#800020] hover:bg-brand-100 rounded-xl transition-all">
          <User size={22} strokeWidth={2.5} />
          <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest">Sign In</span>
        </button>
      </SignInButton>
    </SignedOut>

    <SignedIn>
      <div className="flex items-center gap-4">
        <Link 
          href="/profile" 
          className={`hidden md:block text-[10px] font-black uppercase tracking-widest transition-colors ${
            pathname === '/profile' ? 'text-[#800020]' : 'text-gray-400 hover:text-[#800020]'
          }`}
        >
          My Orders
        </Link>
        <UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "w-10 h-10 border-2 border-[#800020] rounded-xl overflow-hidden hover:scale-105 transition-transform"
            }
          }}
        />
      </div>
    </SignedIn>
  </div>
);

export default Header;