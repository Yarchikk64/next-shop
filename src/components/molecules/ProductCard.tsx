'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Product } from '@/types/product';
import Button from '@/components/atoms/Button';
import { formatPrice } from '@/utils/formatPrice';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/cartSlice';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-lg">
      <Link href={`/product/${product.id}`} className="flex flex-col flex-1">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover object-center transition-transform group-hover:scale-105"
          />
        </div>

        <div className="mt-4 flex flex-1 flex-col">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
            {product.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 capitalize">
            {product.category}
          </p>
        </div>
      </Link>

      <div className="mt-auto pt-3 flex items-center justify-between">
        <span className="text-lg font-bold text-gray-900">
          {formatPrice(product.price)}
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;