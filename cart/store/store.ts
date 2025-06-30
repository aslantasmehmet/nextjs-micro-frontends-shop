import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Redux Store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => store.dispatch;
export const useAppSelector = (selector: (state: RootState) => any) => selector(store.getState()); 