import Link from 'next/link';
import { getAllProducts } from '../lib/products';
import ProductList from './components/ProductList';
import { Metadata } from 'next/types';

// Metadata export for SEO
export const metadata: Metadata = {
  title: 'NextShop - Yeni Sezon Ürünleri',
  description: 'En yeni trendleri keşfedin ve gardırobunuzu güncelleyin. Elektronik, aksesuar ve bilgisayar ürünleri.',
  keywords: 'e-ticaret, elektronik, aksesuar, bilgisayar, alışveriş',
  openGraph: {
    title: 'NextShop - Yeni Sezon Ürünleri',
    description: 'En yeni trendleri keşfedin ve gardırobunuzu güncelleyin.',
    type: 'website',
  },
};

// ISR: Bu sayfa 60 saniyede bir revalidate edilecek
export const revalidate = 60;

// --- SERVER COMPONENT PAGE ---
export default async function Home() {
  // Server-side data fetching
  const products = await getAllProducts();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Ana içerik */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Yeni Sezon Ürünleri
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              En yeni trendleri keşfedin ve gardırobunuzu güncelleyin.
            </p>
            
            {/* Stats */}
            <div className="mt-8 flex justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{products.filter(p => p.inStock).length} ürün stokta</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>{products.length} toplam ürün</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>Ücretsiz kargo</span>
              </div>
            </div>
          </div>

          {/* Product Grid - Client Component */}
          <ProductList products={products} />
        </div>
      </main>

      {/* Alt bilgi */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} NextShop. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="#" className="transition-colors hover:text-gray-800">Gizlilik Politikası</Link>
              <Link href="#" className="transition-colors hover:text-gray-800">Kullanım Şartları</Link>
              <Link href="#" className="transition-colors hover:text-gray-800">İletişim</Link>
            </div>
          </div>
          
          {/* Build Info */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-center text-xs text-gray-400">
              Server-Side Rendered • ISR ile {revalidate}s cache • Build: {new Date().toISOString().split('T')[0]}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
