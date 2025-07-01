/* eslint-disable */
// @ts-nocheck

'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { removeFromCart, updateQuantity, clearCart, loadCartFromStorage } from '../../store/cartSlice';

// --- ICONS ---  
const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
    </svg>
);

const MinusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
    </svg>
);

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="M12 5v14" />
    </svg>
);

// --- LOADING COMPONENT ---
function CartLoading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-300 h-10 w-10"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
      <p className="text-lg text-gray-600 mt-4">Sepetiniz Yükleniyor...</p>
    </main>
  );
}

// --- ERROR COMPONENT ---
function CartError({ error }: { error: string }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Bir Hata Oluştu</h2>
        <p className="text-lg text-red-600 mb-6">Hata: {error}</p>
        <Link 
          href="http://localhost:3000" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </main>
  );
}

// --- MAIN CART CONTENT ---
export default function CartContent() {
  const dispatch = useAppDispatch();
  const { items: cartItems, totalPrice, loading, error } = useAppSelector(state => state.cart);

  // Client-side initialization
  useEffect(() => {
    dispatch(loadCartFromStorage());
  }, [dispatch]);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    if (confirm('Sepeti tamamen temizlemek istediğinizden emin misiniz?')) {
      dispatch(clearCart());
    }
  };

  if (loading) {
    return <CartLoading />;
  }

  if (error) {
    return <CartError error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <Link href="http://localhost:3000" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
                <ArrowLeftIcon className="h-5 w-5" />
                Alışverişe Devam Et
            </Link>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Alışveriş Sepetim
            </h1>
          </div>
          {cartItems.length > 0 && (
            <button 
              onClick={handleClearCart}
              className="px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
            >
              Sepeti Temizle
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center rounded-lg border-2 border-dashed border-gray-300 p-12">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-medium text-gray-900">Sepetinizde ürün bulunmuyor</h2>
            <p className="mt-2 text-sm text-gray-500">Hemen alışverişe başlayarak sepetinizi doldurun!</p>
            <Link href="http://localhost:3000" className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
              Ürünleri Keşfet
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-3">
            {/* Sepet ürünleri */}
            <div className="space-y-6 lg:col-span-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start gap-6 rounded-xl bg-white p-6 shadow-sm">
                  <Image src={item.imageUrl || '/placeholder.svg'} alt={item.name} width={100} height={100} className="h-24 w-24 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    {item.category && <p className="text-sm text-gray-500">{item.category}</p>}
                    <p className="mt-2 text-lg font-bold text-gray-900">{item.price}</p>
                    
                    {/* Quantity Controls */}
                    <div className="mt-4 flex items-center gap-3">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-medium min-w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                    title="Ürünü Kaldır"
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </div>
              ))}
            </div>

            {/* Sipariş özeti */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl bg-white p-8 shadow-lg">
                <h2 className="text-2xl font-bold border-b border-gray-200 pb-4 mb-6">Sipariş Özeti</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Ara Toplam</span>
                    <span className="font-medium text-gray-900">{totalPrice.toFixed(2)} TL</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Kargo</span>
                    <span className="font-medium text-green-600">Ücretsiz</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-4 mt-4 text-xl font-bold">
                    <span className="text-gray-900">Toplam</span>
                    <span className="text-gray-900">{totalPrice.toFixed(2)} TL</span>
                  </div>
                </div>
                <button className="mt-8 w-full rounded-lg bg-blue-600 py-4 text-lg font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Güvenli Ödemeye Geç
                </button>
                <p className="mt-3 text-xs text-gray-500 text-center">
                  {cartItems.length} ürün • {cartItems.reduce((sum, item) => sum + item.quantity, 0)} adet
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 