'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '@/store/cartSlice'; // Добавь clearCart в слайс
import { formatPrice } from '@/utils/formatPrice';
import Button from '@/components/atoms/Button';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useState } from 'react';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    console.log("Кнопка нажата! Начинаем оформление...");
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items, // Реальные товары из Redux
          total: totalPrice,
          email: "customer@example.com", // Пока заглушка, позже прикрутим Auth
        }),
      });

      if (response.ok) {
        alert('Заказ успешно оформлен!');
        dispatch(clearCart()); // Очищаем Redux стор
      } else {
        alert('Ошибка при оформлении заказа');
      }
    } catch (error) {
      console.error(error);
      alert('Произошла ошибка');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Корзина пуста</h2>
        <Link href="/">
          <Button variant="primary">Вернуться в каталог</Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Ваша корзина</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border-b pb-4">
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
              <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
            </div>

            <div className="flex flex-1 flex-col">
              <h3 className="font-medium text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500">{formatPrice(item.price)}</p>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button 
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Plus size={16} />
              </button>
            </div>

            <button 
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-500 hover:text-red-700 p-2"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t pt-6 flex flex-col items-end">
        <div className="text-xl font-bold mb-4">
          Итого: {formatPrice(totalPrice)}
        </div>
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full sm:w-auto"
          onClick={handleCheckout} // Привязываем функцию!
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Оформление...' : 'Оформить заказ'}
        </Button>
      </div>
    </main>
  );
}