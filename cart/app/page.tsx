"use client";

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store/hooks';
import { RootState } from '../store/store';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

// --- ICONS ---
const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2 2v2" />
    </svg>
);

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
    </svg>
);

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14m7-7H5" />
    </svg>
);

const MinusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
    </svg>
);

// --- PAGE ---
export default function CartPage() {
  const dispatch = useAppDispatch();
  
  // Redux store'dan verileri al
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const loading = useSelector((state: RootState) => state.cart.loading);

  const handleRemoveItem = (id: number, name: string) => {
    dispatch(removeFromCart(id));
    toast.success(`${name} sepetten kaldırıldı!`, {
      duration: 2000,
      icon: '🗑️',
    });
  };

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Sepet temizlendi!', {
      duration: 2000,
      icon: '🧹',
    });
  };

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
        <p className="text-lg text-gray-600 animate-pulse">Sepetiniz Yükleniyor...</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
            <Link href="http://localhost:3000" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
                <ArrowLeftIcon className="h-5 w-5" />
                Alışverişe Devam Et
            </Link>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Alışveriş Sepetim ({totalItems} ürün)
            </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center rounded-lg border-2 border-dashed border-gray-300 p-12">
            <h2 className="text-xl font-medium text-gray-900">Sepetinizde ürün bulunmuyor</h2>
            <p className="mt-2 text-sm text-gray-500">Hemen alışverişe başlayarak sepetinizi doldurun!</p>
            <Link href="http://localhost:3000" className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
              Ürünleri Keşfet
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-6 lg:col-span-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start gap-6 rounded-xl bg-white p-6 shadow-sm">
                  <Image 
                    src={item.imageUrl || '/placeholder.jpg'} 
                    alt={item.name} 
                    width={100} 
                    height={100} 
                    className="h-24 w-24 rounded-lg object-cover bg-gray-200"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.jpg';
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    {item.category && (
                      <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                    )}
                    <p className="mt-2 text-lg font-bold text-gray-900">{item.price}</p>
                    
                    {/* Quantity Controls */}
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                        disabled={item.quantity <= 1}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRemoveItem(item.id, item.name)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </div>
              ))}

              {/* Clear Cart Button */}
              {cartItems.length > 0 && (
                <div className="pt-4">
                  <button
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                  >
                    Sepeti Temizle
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl bg-white p-8 shadow-lg">
                <h2 className="text-2xl font-bold border-b border-gray-200 pb-4 mb-6">Sipariş Özeti</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Ürün Sayısı</span>
                    <span className="font-medium text-gray-900">{totalItems} adet</span>
                  </div>
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
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
