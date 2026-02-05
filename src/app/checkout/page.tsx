'use client';

import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { useIsMounted } from '@/store/useIsMounted';
import { formatPrice } from '@/utils/formatPrice';
import Link from 'next/link';
import Button from '@/components/atoms/Button';

export default function CheckoutPage() {
  const isMounted = useIsMounted();
  const { items } = useAppSelector((state) => state.cart);
  
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isMounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-xl font-medium text-gray-400">Loading...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Add some products from our catalog to place an order.</p>
        <Link href="/">
          <Button size="lg">Back to Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10 text-gray-900">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          <section className="bg-white p-6 rounded-2xl border shadow-sm">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm text-white">1</span>
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <input type="text" placeholder="John" className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" placeholder="Doe" className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" placeholder="john.doe@example.com" className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl border shadow-sm">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm text-white">2</span>
              Shipping Address
            </h2>
            <input type="text" placeholder="Street, apartment, city, zip code..." className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
          </section>

          <Button className="w-full py-6 text-lg" onClick={() => alert('Order Placed! (Demo)')}>
            Place Order • {formatPrice(totalPrice)}
          </Button>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-gray-50 p-6 rounded-2xl border sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-100">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border">
                    <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{item.title}</h4>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t pt-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({items.length} items)</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-xl font-extrabold text-gray-900 pt-3 border-t">
                <span>Total:</span>
                <span className="text-blue-600">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}