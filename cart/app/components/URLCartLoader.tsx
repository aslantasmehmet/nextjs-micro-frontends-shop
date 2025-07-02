'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addToCart, clearCart } from '../../store/cartSlice';

interface CartItem {
  id: number;
  name: string;
  category?: string;
  price: string;
  quantity: number;
  imageUrl?: string;
}

export default function URLCartLoader() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // URL parametresinden cart verilerini yükle
    console.log('🔍 URLCartLoader: Checking URL for cart data...');
    console.log('🌐 Current URL:', window.location.href);
    
    const urlParams = new URLSearchParams(window.location.search);
    const cartData = urlParams.get('data');

    console.log('🔑 URL Params:', Object.fromEntries(urlParams.entries()));
    console.log('📦 Cart data found:', cartData ? 'YES' : 'NO');

    if (cartData) {
      try {
        console.log('🔄 URLCartLoader: Found cart data in URL');
        
        // Base64 decode et
        const decoded = atob(decodeURIComponent(cartData));
        console.log('🔓 URLCartLoader: Decoded data:', decoded);
        
        const items: CartItem[] = JSON.parse(decoded);
        console.log('📦 URLCartLoader: Parsed cart items:', items);

        // Önce sepeti temizle
        dispatch(clearCart());

        // Her item için Redux'a ekle
        items.forEach((item) => {
          console.log(`➕ URLCartLoader: Adding item ${item.id} to Redux store (${item.quantity}x)`);
          // Her quantity için ayrı dispatch et
          for (let i = 0; i < item.quantity; i++) {
            dispatch(addToCart({
              id: item.id,
              name: item.name,
              category: item.category,
              price: item.price,
              imageUrl: item.imageUrl
            }));
          }
        });

        console.log('✅ URLCartLoader: Cart loaded successfully');

        // URL'i temizle (opsiyonel)
        window.history.replaceState({}, '', window.location.pathname);

      } catch (e) {
        console.error('❌ URLCartLoader: Error parsing cart data:', e);
      }
    } else {
      // LocalStorage'dan yüklemeyi dene
      console.log('📭 URLCartLoader: No cart data found in URL, checking localStorage...');
      try {
        const stored = localStorage.getItem('cart-items');
        console.log('💾 URLCartLoader: LocalStorage data:', stored);
        
        if (stored) {
          const items = JSON.parse(stored);
          console.log('📦 URLCartLoader: Found items in localStorage:', items);
        } else {
          console.log('⚠️ URLCartLoader: No items in localStorage');
        }
      } catch (err) {
        console.error('❌ URLCartLoader: Error checking localStorage:', err);
      }
    }
  }, [dispatch]);

  return null;
} 