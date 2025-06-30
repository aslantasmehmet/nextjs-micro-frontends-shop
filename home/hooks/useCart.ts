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

export function useCart(): UseCartReturn {
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // LocalStorage'dan cart count'u yükle
  useEffect(() => {
    const loadCartCount = () => {
      try {
        const stored = localStorage.getItem('cart-items');
        if (stored) {
          const items: CartItem[] = JSON.parse(stored);
          const count = items.reduce((sum, item) => sum + item.quantity, 0);
          setCartCount(count);
        }
      } catch (error) {
        console.error('Cart loading error:', error);
      }
    };

    loadCartCount();

    // Cart update event'ini dinle
    const handleCartUpdate = (event: CustomEvent) => {
      setCartCount(event.detail.count || 0);
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);

  // Ürün ekleme fonksiyonu
  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setLoading(true);
    
    try {
      // Mevcut cart'ı yükle
      const stored = localStorage.getItem('cart-items');
      let items: CartItem[] = stored ? JSON.parse(stored) : [];
      
      // Ürün zaten varsa quantity artır, yoksa ekle
      const existingItem = items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        items.push({
          ...newItem,
          quantity: 1
        });
      }
      
      // LocalStorage'a kaydet
      localStorage.setItem('cart-items', JSON.stringify(items));
      
      // Cart count güncelle
      const newCount = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(newCount);
      
      // Event gönder (cart app'ı dinliyor olabilir)
      window.dispatchEvent(new CustomEvent('cart-updated', { 
        detail: { items, count: newCount }
      }));
      
    } catch (error) {
      console.error('Add to cart error:', error);
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