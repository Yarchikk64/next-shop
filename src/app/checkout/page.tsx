'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, CreditCard, ShieldCheck, Truck, Loader2 } from 'lucide-react';
import { useCheckout } from '@/hooks/useCheckout';
import { CheckoutInput } from '@/components/ui/CheckoutInput';
import { formatPrice } from '@/utils/formatPrice';

export default function CheckoutPage() {
  const { items, totalPrice, form, onSubmit, user, isLoaded } = useCheckout();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;
  

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted || !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <Loader2 className="animate-spin text-[#800020]" size={40} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-[#FDFBF7]">
        <h1 className="text-4xl font-serif italic mb-8 text-gray-900">Your bag is empty</h1>
        <Link href="/" className="bg-[#800020] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-[#600018] transition-all shadow-xl active:scale-95">
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#800020] transition-colors mb-12 group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Back to store</span>
        </Link>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl font-serif font-bold italic text-gray-900 mb-4 tracking-tight">Checkout</h1>
              <p className="text-gray-500 italic text-lg">Complete your order by providing shipping details.</p>
            </div>

            <section className="space-y-8">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#800020] flex items-center gap-3">
                <Truck size={20} /> Shipping Destination
              </h2>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                <CheckoutInput {...register('firstName')} placeholder="First Name" error={errors.firstName?.message} />
                <CheckoutInput {...register('lastName')} placeholder="Last Name" error={errors.lastName?.message} />
                
                <div className="col-span-2">
                  <CheckoutInput 
                    {...register('email')} 
                    placeholder="Email Address" 
                    readOnly={!!user} 
                    error={errors.email?.message} 
                  />
                </div>

                <div className="col-span-2">
                  <CheckoutInput {...register('address')} placeholder="Street Address" error={errors.address?.message} />
                </div>

                <CheckoutInput {...register('city')} placeholder="City" error={errors.city?.message} />
                <CheckoutInput {...register('postalCode')} placeholder="Postal Code" error={errors.postalCode?.message} />
              </div>
            </section>
          </div>

          <div className="lg:sticky lg:top-32 h-fit">
            <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-brand-100/50 border border-brand-50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-[#800020]"></div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-8 uppercase tracking-widest flex items-center gap-2">
                Order Summary
              </h2>
              
              <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-6 group">
                    <div className="flex items-center gap-5">
                      <div className="w-20 h-20 bg-gray-50 rounded-2xl p-3 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 line-clamp-1">{item.title}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-8 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Subtotal</span>
                  <span className="font-bold text-gray-900">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Shipping</span>
                  <span className="font-bold text-green-600 uppercase text-[10px] tracking-widest">Free</span>
                </div>
                
                <div className="flex justify-between items-end pt-4 border-t border-dashed border-gray-200">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-900">Total Due</span>
                  <span className="text-4xl font-black text-[#800020] tracking-tighter">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#800020] text-white py-6 rounded-[1.5rem] mt-10 font-black uppercase tracking-[0.2em] shadow-xl shadow-brand-900/20 hover:bg-[#600018] hover:-translate-y-1 transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Processing</span>
                  </>
                ) : (
                  <>
                    <CreditCard size={20} />
                    <span>Complete Purchase</span>
                  </>
                )}
              </button>

              <div className="mt-8 flex items-center justify-center gap-3 text-gray-400 border-t pt-6">
                <ShieldCheck size={18} className="text-green-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">Secure Checkout Powered by Stripe</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9fafb;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}