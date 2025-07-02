/* eslint-disable */
// @ts-nocheck

'use client';

import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useEffect } from 'react';
import { loadCartFromStorage } from '../../store/cartSlice';

interface ReduxProviderProps {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan cart'ı yükle
    store.dispatch(loadCartFromStorage());
  }, []);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
} 