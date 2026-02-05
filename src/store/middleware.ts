import { Middleware } from '@reduxjs/toolkit';

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(state.cart.items));
  }
  
  return result;
};