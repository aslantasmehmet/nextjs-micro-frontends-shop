import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem, AddToCartRequest } from './types';

// Fiyat hesaplama yardımcı fonksiyonu
const calculatePrice = (priceString: string): number => {
  return parseFloat(priceString.replace(/[^0-9,-]+/g, "").replace(',', '.'));
};

// LocalStorage helper
const saveToStorage = (items: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart-items', JSON.stringify(items));
    // Cross-app event gönder
    window.dispatchEvent(new CustomEvent('cart-updated', { 
      detail: { items, count: items.reduce((sum, item) => sum + item.quantity, 0) }
    }));
  }
};

const loadFromStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('cart-items');
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

// Initial state
const initialItems = loadFromStorage();
const initialState: CartState = {
  items: initialItems,
  totalItems: initialItems.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: initialItems.reduce((sum, item) => sum + (calculatePrice(item.price) * item.quantity), 0),
  loading: false,
  error: null,
};

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartRequest>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      }
      
      // Toplamları güncelle
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + (calculatePrice(item.price) * item.quantity), 0);
      
      // LocalStorage'a kaydet
      saveToStorage(state.items);
      state.error = null;
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + (calculatePrice(item.price) * item.quantity), 0);
      saveToStorage(state.items);
    },

    updateQuantity: (state, action: PayloadAction<{id: number, quantity: number}>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          item.quantity = quantity;
        }
        
        state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
        state.totalPrice = state.items.reduce((sum, item) => sum + (calculatePrice(item.price) * item.quantity), 0);
        saveToStorage(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      saveToStorage([]);
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    loadCartFromStorage: (state) => {
      const items = loadFromStorage();
      state.items = items;
      state.totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = items.reduce((sum, item) => sum + (calculatePrice(item.price) * item.quantity), 0);
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setLoading,
  setError,
  loadCartFromStorage
} = cartSlice.actions;

export default cartSlice.reducer; 