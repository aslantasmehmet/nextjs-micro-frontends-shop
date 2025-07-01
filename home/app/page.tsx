import Link from 'next/link';
import ProductList from './components/ProductList';
import { Metadata } from 'next/types';
import { Product } from './api/products/route';

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

// Static products data - mikro frontend için basit yaklaşım
function getProducts(): Product[] {
  return [
    { 
      id: 1, 
      name: 'Akıllı Saat', 
      category: 'Elektronik', 
      price: '799.99 TL', 
      imageUrl: '/products/smart-watch/main.jpg',
      description: 'Yeni nesil akıllı saat. Sağlık takibi, spor modları ve daha fazlası.',
      inStock: true,
      rating: 4.5,
      createdAt: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Kablosuz Kulaklık', 
      category: 'Aksesuar', 
      price: '449.99 TL', 
      imageUrl: '/products/wireless-headphones/main.jpg',
      description: 'Yüksek kaliteli ses, aktif gürültü engelleme özelliği.',
      inStock: true,
      rating: 4.7,
      createdAt: '2024-01-10'
    },
    { 
      id: 3, 
      name: 'Mekanik Klavye', 
      category: 'Bilgisayar', 
      price: '1,299.99 TL', 
      imageUrl: '/products/mechanical-keyboard/main.jpg',
      description: 'RGB aydınlatmalı mekanik klavye. Oyun ve yazılım geliştirme için ideal.',
      inStock: true,
      rating: 4.3,
      createdAt: '2024-01-08'
    },
    { 
      id: 4, 
      name: 'Oyuncu Faresi', 
      category: 'Bilgisayar', 
      price: '699.99 TL', 
      imageUrl: '/products/gaming-mouse/main.jpg',
      description: 'Yüksek DPI, programlanabilir tuşlar. E-spor için tasarlandı.',
      inStock: false,
      rating: 4.6,
      createdAt: '2024-01-05'
    }
  ];
}

// --- SERVER COMPONENT PAGE ---
export default function Home() {
  // Static data - no async needed
  const products = getProducts();

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
