"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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


// --- DATA ---
interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  imageUrl: string;
}

// --- PAGE ---
export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('/cart/api/cart');
        if (!response.ok) {
          throw new Error('Sepet verileri alınamadı.');
        }
        const data = await response.json();
        setCartItems(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError('Bilinmeyen bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9,-]+/g,"").replace(',','.'));
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
        <p className="text-lg text-gray-600 animate-pulse">Sepetiniz Yükleniyor...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
        <p className="text-lg text-red-600">Hata: {error}</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
            <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
                <ArrowLeftIcon className="h-5 w-5" />
                Alışverişe Devam Et
            </Link>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Alışveriş Sepetim
            </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center rounded-lg border-2 border-dashed border-gray-300 p-12">
            <h2 className="text-xl font-medium text-gray-900">Sepetinizde ürün bulunmuyor</h2>
            <p className="mt-2 text-sm text-gray-500">Hemen alışverişe başlayarak sepetinizi doldurun!</p>
            <Link href="/" className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
              Ürünleri Keşfet
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-6 lg:col-span-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start gap-6 rounded-xl bg-white p-6 shadow-sm">
                  <Image src={item.imageUrl || '/placeholder.svg'} alt={item.name} width={100} height={100} className="h-24 w-24 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="mt-2 text-lg font-bold text-gray-900">{item.price}</p>
                    <p className="mt-1 text-sm text-gray-500">Adet: {item.quantity}</p>
                  </div>
                  <button className="text-gray-400 hover:text-red-600 transition-colors">
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl bg-white p-8 shadow-lg">
                <h2 className="text-2xl font-bold border-b border-gray-200 pb-4 mb-6">Sipariş Özeti</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Ara Toplam</span>
                    <span className="font-medium text-gray-900">{calculateTotal()} TL</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Kargo</span>
                    <span className="font-medium text-green-600">Ücretsiz</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-4 mt-4 text-xl font-bold">
                    <span className="text-gray-900">Toplam</span>
                    <span className="text-gray-900">{calculateTotal()} TL</span>
                  </div>
                </div>
                <button className="mt-8 w-full rounded-lg bg-blue-600 py-4 text-lg font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Güvenli Ödemeye Geç
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
