'use client';

import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearCart } from '@/store/cartSlice';
import { formatPrice } from '@/utils/formatPrice';
import Link from 'next/link';
import { ChevronLeft, CreditCard, ShieldCheck, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayNow = async () => {
    console.log("Попытка оплаты...");
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items,
          total: totalPrice,
          email: "customer@example.com",
        }),
      });

      if (response.ok) {
        alert('Заказ успешно создан в MongoDB!');
        dispatch(clearCart());
        router.push('/');
      } else {
        const errorData = await response.json();
        alert(`Ошибка: ${errorData.error || 'Не удалось создать заказ'}`);
      }
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      alert('Ошибка соединения с сервером');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-serif italic mb-6">Your bag is empty</h1>
        <Link href="/" className="bg-[#800020] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest">
          Go to Catalog
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div>
              <h1 className="text-4xl font-serif font-bold italic text-gray-900 mb-2">Checkout</h1>
              <p className="text-gray-500 italic">Please enter your shipping and payment details.</p>
            </div>

            <section className="space-y-4">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#800020] flex items-center gap-2">
                <Truck size={18} /> Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="checkout-input col-span-1" />
                <input type="text" placeholder="Last Name" className="checkout-input col-span-1" />
                <input type="email" placeholder="Email Address" className="checkout-input col-span-2" />
                <input type="text" placeholder="Address" className="checkout-input col-span-2" />
                <input type="text" placeholder="City" className="checkout-input col-span-1" />
                <input type="text" placeholder="Postal Code" className="checkout-input col-span-1" />
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#800020] flex items-center gap-2">
                <CreditCard size={18} /> Payment Method
              </h2>
              <div className="p-6 border-2 border-[#800020] rounded-2xl bg-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center font-bold text-[10px] text-gray-400">CARD</div>
                  <span className="font-bold text-gray-800">Credit or Debit Card</span>
                </div>
                <div className="w-5 h-5 border-4 border-[#800020] rounded-full"></div>
              </div>
            </section>
          </div>

          <div className="lg:sticky lg:top-32 h-fit">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-brand-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wider">Order Summary</h2>
              
              <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 no-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-brand-50 rounded-xl p-2 flex-shrink-0">
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

              <div className="border-t-2 border-brand-50 pt-6 space-y-3">
                <div className="flex justify-between text-gray-500">
                  <span className="text-sm">Subtotal</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span className="text-sm">Shipping</span>
                  <span className="font-medium text-green-600 font-bold uppercase text-[10px] tracking-widest">Free</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <span className="text-sm font-black uppercase tracking-widest">Grand Total</span>
                  <span className="text-3xl font-black text-[#800020]">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button 
                onClick={handlePayNow}
                disabled={isSubmitting}
                className="w-full bg-[#800020] text-white py-6 rounded-2xl mt-8 font-black uppercase tracking-[0.2em] shadow-xl shadow-brand-600/20 hover:bg-[#600018] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Pay Now'}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Secure Encrypted Transaction</span>
              </div>
            </div>
          </div>
        </div>
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
      `}</style>
    </div>
  );
}