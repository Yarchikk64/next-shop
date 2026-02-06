'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetCategoriesQuery } from '@/store/services/productApi';

export default function CategoryBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const currentCategory = searchParams.get('category') || 'all';

  const handleUpdate = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    cat === 'all' ? params.delete('category') : params.set('category', cat);
    params.delete('search');
    router.push(`/?${params.toString()}`);
  };

  if (isLoading) return <div className="h-12 animate-pulse bg-brand-100 rounded-xl mb-8" />;

  return (
    <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar items-center">
      {['all', ...(categories || [])].map((cat) => {
        const isActive = currentCategory === cat;
        
        return (
          <button
            key={cat}
            onClick={() => handleUpdate(cat)}
            className={`
              px-6 py-3 rounded-xl transition-all duration-200 whitespace-nowrap
              /* Базовые настройки шрифта: жирный и четкий */
              text-[13px] font-extrabold tracking-wider uppercase
              ${isActive 
                ? 'bg-[#800020] text-white shadow-xl ring-2 ring-[#800020] ring-offset-2' 
                : 'bg-white text-[#800020] border-2 border-[#800020]/10 hover:border-[#800020]'
              }
            `}
          >
            {cat.replace('-', ' ')}
          </button>
        );
      })}
    </div>
  );
}