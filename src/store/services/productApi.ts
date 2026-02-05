import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, ProductsResponse } from '@/types/product';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, { search?: string; category?: string }>({
      query: ({ search, category }) => {
        if (category && category !== 'all') {
          return `products/category/${category}`;
        }
        if (search) {
          return `products/search?q=${search}`;
        }
        return 'products';
      },
    }),
    getCategories: builder.query<string[], void>({
      query: () => 'products/category-list',
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useGetCategoriesQuery, 
  useGetProductByIdQuery 
} = productApi;