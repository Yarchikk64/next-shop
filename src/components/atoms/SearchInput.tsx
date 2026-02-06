'use client';

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  onSearch: (value: string) => void;
}

export const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [value, setValue] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      onSearch(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]); 

  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-600/40" size={18} />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search our collection..."
        className="w-full bg-white border-2 border-brand-100 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium outline-none focus:border-brand-600 transition-all placeholder:text-gray-300 shadow-sm"
      />
    </div>
  );
};