import React from 'react';

interface Props {
  sort: string;
  onSortChange: (value: string) => void;
}

export const CollectionHeader = ({ sort, onSortChange }: Props) => (
  <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
    <div>
      <h1 className="text-5xl font-serif font-bold italic mb-2 text-gray-900">Our Collection</h1>
      <p className="text-[#800020]/60 font-medium italic">Exquisite items curated for you</p>
    </div>
    
    <div className="relative">
      <select 
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="appearance-none bg-transparent border-b-2 border-[#800020] pr-8 py-2 font-black text-[#800020] outline-none cursor-pointer uppercase text-xs tracking-widest"
      >
        <option value="default">Sort: Newest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Top Rated</option>
      </select>
      <div className="absolute right-0 bottom-3 pointer-events-none text-[#800020]">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </div>
    </div>
  </div>
);