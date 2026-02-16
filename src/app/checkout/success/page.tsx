'use client';

import Link from 'next/link';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

export default function SuccessPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    // Используем requestAnimationFrame для установки mounted. 
    // Это убирает ошибку "cascading renders", так как обновление стейта 
    // происходит в следующем кадре анимации, а не синхронно в эффекте.
    const mountFrame = requestAnimationFrame(() => {
      setMounted(true);
    });
    
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      if (isCancelled) return; 

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#800020', '#FDFBF7']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#800020', '#FDFBF7']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    return () => {
      isCancelled = true;
      cancelAnimationFrame(mountFrame);
      confetti.reset();
    };
  }, []);

  // Пока не приземлились на клиент — не рендерим ничего, чтобы не было ошибок гидратации
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle2 size={48} className="text-green-600" />
          </div>
        </div>

        <h1 className="text-4xl font-serif font-bold italic text-gray-900 mb-4 tracking-tight">
          Thank you for your order!
        </h1>
        <p className="text-gray-500 mb-10 italic">
          Your payment was successful and your order is now being processed. 
          We&apos;ve sent a confirmation email to your inbox.
        </p>

        <div className="space-y-4">
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 w-full bg-[#800020] text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#600018] transition-all shadow-lg active:scale-95"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>
          
          <Link 
            href="/profile" 
            className="flex items-center justify-center gap-2 w-full text-gray-400 hover:text-gray-600 transition-colors text-xs font-black uppercase tracking-widest"
          >
            Track Order <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}