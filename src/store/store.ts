import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { localStorageMiddleware } from './middleware';
import { productApi } from '@/store/services/productApi';

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware, localStorageMiddleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];