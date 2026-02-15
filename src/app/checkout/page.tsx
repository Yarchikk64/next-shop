'use client';

import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearCart } from '@/store/cartSlice';
import { formatPrice } from '@/utils/formatPrice';
import Link from 'next/link';
import { ChevronLeft, CreditCard, ShieldCheck, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useUser } from '@clerk/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City name is too short"),
  postalCode: z.string().min(4, "Invalid postal code"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isLoaded && user) {
      setValue('firstName', user.firstName || '');
      setValue('lastName', user.lastName || '');
      setValue('email', user.primaryEmailAddress?.emailAddress || '');
    }
  }, [user, isLoaded, setValue]);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items,
          total: totalPrice,
          email: data.email,
          clerkId: user?.id, 
          customerName: `${data.firstName} ${data.lastName}`,
          shippingDetails: data,
        }),
      });

      if (response.ok) {
        dispatch(clearCart());
        router.push('/checkout/success');
      } else {
        alert('Server error. Please try again.');
      }
    } catch (error) {
      alert('Network error. Check your connection.');
    }
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-serif italic mb-6">Your bag is empty</h1>
        <Link href="/" className="bg-[#800020] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#600018] transition-all">
          Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#800020] transition-colors mb-8 group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Back to store</span>
        </Link>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div>
              <h1 className="text-4xl font-serif font-bold italic text-gray-900 mb-2">Checkout</h1>
              <p className="text-gray-500 italic">Enter your shipping details below.</p>
            </div>

            <section className="space-y-6">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#800020] flex items-center gap-2">
                <Truck size={18} /> Shipping Address
              </h2>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                <div className="col-span-1">
                  <input {...register('firstName')} placeholder="First Name" className={`checkout-input ${errors.firstName ? 'error-border' : ''}`} />
                  {errors.firstName && <p className="error-msg">{errors.firstName.message}</p>}
                </div>

                <div className="col-span-1">
                  <input {...register('lastName')} placeholder="Last Name" className={`checkout-input ${errors.lastName ? 'error-border' : ''}`} />
                  {errors.lastName && <p className="error-msg">{errors.lastName.message}</p>}
                </div>

                <div className="col-span-2">
                  <input 
                    {...register('email')} 
                    placeholder="Email Address" 
                    readOnly={!!user} 
                    className={`checkout-input ${errors.email ? 'error-border' : ''} ${user ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`} 
                  />
                  {errors.email && <p className="error-msg">{errors.email.message}</p>}
                </div>

                <div className="col-span-2">
                  <input {...register('address')} placeholder="Street Address" className={`checkout-input ${errors.address ? 'error-border' : ''}`} />
                  {errors.address && <p className="error-msg">{errors.address.message}</p>}
                </div>

                <div className="col-span-1">
                  <input {...register('city')} placeholder="City" className={`checkout-input ${errors.city ? 'error-border' : ''}`} />
                  {errors.city && <p className="error-msg">{errors.city.message}</p>}
                </div>

                <div className="col-span-1">
                  <input {...register('postalCode')} placeholder="Postal Code" className={`checkout-input ${errors.postalCode ? 'error-border' : ''}`} />
                  {errors.postalCode && <p className="error-msg">{errors.postalCode.message}</p>}
                </div>
              </div>
            </section>
          </div>

          <div className="lg:sticky lg:top-32 h-fit">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wider">Order Summary</h2>
              
              <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 no-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-xl p-2 flex-shrink-0">
                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800 line-clamp-1">{item.title}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6 space-y-3">
                <div className="flex justify-between items-end pt-4">
                  <span className="text-sm font-black uppercase tracking-widest">Grand Total</span>
                  <span className="text-3xl font-black text-[#800020]">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#800020] text-white py-6 rounded-2xl mt-8 font-black uppercase tracking-[0.2em] shadow-lg hover:bg-[#600018] transition-all disabled:opacity-50 active:scale-[0.98]"
              >
                {isSubmitting ? 'Processing...' : 'Pay Now'}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Secure Encrypted Transaction</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
        .checkout-input {
          width: 100%;
          background-color: white;
          border: 2px solid #f3f4f6;
          border-radius: 0.75rem;
          padding: 1rem 1.25rem;
          font-size: 0.875rem;
          font-weight: 500;
          outline: none;
          transition: all 0.2s;
        }
        .checkout-input:focus {
          border-color: #800020;
        }
        .error-border {
          border-color: #ef4444 !important;
        }
        .error-msg {
          color: #ef4444;
          font-size: 10px;
          font-weight: 700;
          margin-top: 4px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}