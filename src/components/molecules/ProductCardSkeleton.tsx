import React from 'react';
import Skeleton from '../atoms/Skeleton';

const ProductCardSkeleton = () => {
  return (
    <div className="rounded-xl border border-gray-100 p-4">
      <Skeleton className="aspect-square w-full rounded-lg" />
      
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>

      <div className="mt-auto pt-6 flex items-center justify-between">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;