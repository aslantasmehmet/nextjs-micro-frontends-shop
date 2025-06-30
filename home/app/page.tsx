"use client";

import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

// --- ICONS ---
const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

// --- DATA ---
interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  imageUrl: string;
}

const products: Product[] = [
  { id: 1, name: 'Akıllı Saat', category: 'Elektronik', price: '799.99 TL', imageUrl: '/placeholder.svg' },
  { id: 2, name: 'Kablosuz Kulaklık', category: 'Aksesuar', price: '449.99 TL', imageUrl: '/placeholder.svg' },
  { id: 3, name: 'Mekanik Klavye', category: 'Bilgisayar', price: '1,299.99 TL', imageUrl: '/placeholder.svg' },
  { id: 4, name: 'Oyuncu Faresi', category: 'Bilgisayar', price: '699.99 TL', imageUrl: '/placeholder.svg' },
];

// --- COMPONENTS ---
function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product) => void; }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
      <div className="aspect-square overflow-hidden">
        <Image src={product.imageUrl} alt={product.name} width={400} height={400} className="object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-gray-800">
          <Link href="#" className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        <div className="mt-auto flex items-end justify-between pt-4">
          <p className="text-xl font-bold text-gray-900">{product.price}</p>
          <button
            onClick={() => onAddToCart(product)}
            className="z-10 flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Ekle</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// --- PAGE ---
export default function Home() {
  const handleAddToCart = async (product: Product) => {
    try {
      const response = await fetch('/cart/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        toast.success(`${product.name} sepete eklendi!`);
      } else {
        toast.error('Ürün eklenirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Sepete ekleme hatası:', error);
      toast.error('İstek gönderilirken bir hata oluştu.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Yeni Sezon Ürünleri
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              En yeni trendleri keşfedin ve gardırobunuzu güncelleyin.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} NextShop. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="#" className="transition-colors hover:text-gray-800">Gizlilik Politikası</Link>
              <Link href="#" className="transition-colors hover:text-gray-800">Kullanım Şartları</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
