/* eslint-disable */
// @ts-nocheck

'use client';

import { useState, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  category?: string;
  price: string;
  quantity: number;
  imageUrl?: string;
}

interface UseCartReturn {
  cartCount: number;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  loading: boolean;
}

// Browser kontrolü
const isBrowser = typeof window !== 'undefined';

export function useCart(): UseCartReturn {
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // LocalStorage'dan cart count'u yükle
  useEffect(() => {
    const loadCartCount = () => {
      if (!isBrowser) return;
      
      try {
        console.log('🔄 useCart: Loading cart from localStorage...');
        const stored = localStorage.getItem('cart-items');
        console.log('💾 useCart: Raw localStorage data:', stored);
        
        if (stored) {
          const items: CartItem[] = JSON.parse(stored);
          console.log('📦 useCart: Parsed cart items:', items);
          
          const count = items.reduce((sum, item) => sum + item.quantity, 0);
          console.log('🔢 useCart: Total cart count:', count);
          
          setCartCount(count);
        } else {
          console.log('⚠️ useCart: No items in localStorage');
        }
      } catch (error) {
        console.error('❌ useCart: Cart loading error:', error);
      }
    };

    loadCartCount();

    // Cart update event'ini dinle
    const handleCartUpdate = (event: CustomEvent) => {
      console.log('📣 useCart: Received cart-updated event:', event.detail);
      setCartCount(event.detail.count || 0);
    };

    if (isBrowser) {
      window.addEventListener('cart-updated', handleCartUpdate);
      
      return () => {
        window.removeEventListener('cart-updated', handleCartUpdate);
      };
    }
  }, []);

  // Ürün ekleme fonksiyonu
  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    if (!isBrowser) return;
    
    setLoading(true);
    console.log('➕ useCart: Adding item to cart:', newItem);
    
    try {
      // Mevcut cart'ı yükle
      const stored = localStorage.getItem('cart-items');
      console.log('💾 useCart: Current localStorage data:', stored);
      
      let items: CartItem[] = stored ? JSON.parse(stored) : [];
      
      // Ürün zaten varsa quantity artır, yoksa ekle
      const existingItem = items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        console.log('🔄 useCart: Updating existing item quantity');
        existingItem.quantity += 1;
      } else {
        console.log('➕ useCart: Adding new item to cart');
        const newCartItem = {
          ...newItem,
          quantity: 1
        };
        items.push(newCartItem);
      }
      
      // LocalStorage'a kaydet
      const jsonData = JSON.stringify(items);
      console.log('💾 useCart: Saving to localStorage:', jsonData);
      localStorage.setItem('cart-items', jsonData);
      
      // Cart count güncelle
      const newCount = items.reduce((sum, item) => sum + item.quantity, 0);
      console.log('🔢 useCart: Updated cart count:', newCount);
      setCartCount(newCount);
      
      // Event gönder (cart app'ı dinliyor olabilir)
      const eventData = { items, count: newCount };
      console.log('📣 useCart: Dispatching cart-updated event:', eventData);
      window.dispatchEvent(new CustomEvent('cart-updated', { 
        detail: eventData
      }));
      
    } catch (error) {
      console.error('❌ useCart: Add to cart error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    cartCount,
    addToCart,
    loading
  };
} 