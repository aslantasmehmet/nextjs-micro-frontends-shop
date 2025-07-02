import Link from 'next/link';
import ProductList from './components/ProductList';
import { Metadata } from 'next/types';
import { Product } from './api/products/route';

// Metadata export for SEO
export const metadata: Metadata = {
  title: 'Next Shop - Latest Tech Products',
  description: 'Discover the latest technology trends and upgrade your tech setup. Electronics, accessories and computer products.',
  keywords: 'e-commerce, electronics, accessories, computers, shopping, technology',
  openGraph: {
    title: 'Next Shop - Latest Tech Products',
    description: 'Discover the latest technology trends and upgrade your tech setup.',
    type: 'website',
  },
};

// ISR: This page will be revalidated every 60 seconds
export const revalidate = 60;

// Static products data - simple approach for micro frontend
function getProducts(): Product[] {
  return [
    { 
      id: 1, 
      name: 'Smart Watch', 
      category: 'Electronics', 
      price: '799.99 TL', 
      imageUrl: '/products/smart-watch/main.jpg',
      description: 'Next-generation smartwatch. Health tracking, sports modes and much more.',
      inStock: true,
      rating: 4.5,
      createdAt: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Wireless Headphones', 
      category: 'Accessories', 
      price: '449.99 TL', 
      imageUrl: '/products/wireless-headphones/main.jpg',
      description: 'High quality sound with active noise cancellation technology.',
      inStock: true,
      rating: 4.7,
      createdAt: '2024-01-10'
    },
    { 
      id: 3, 
      name: 'Mechanical Keyboard', 
      category: 'Computers', 
      price: '1299.99 TL', 
      imageUrl: '/products/mechanical-keyboard/main.jpg',
      description: 'RGB illuminated mechanical keyboard. Perfect for gaming and development.',
      inStock: true,
      rating: 4.3,
      createdAt: '2024-01-08'
    },
    { 
      id: 4, 
      name: 'Gaming Mouse', 
      category: 'Computers', 
      price: '699.99 TL', 
      imageUrl: '/products/gaming-mouse/main.jpg',
      description: 'High DPI, programmable buttons. Designed for esports.',
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
      {/* Main content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Latest Tech Products
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Discover cutting-edge technology and upgrade your digital experience.
            </p>
            
            {/* Stats */}
            <div className="mt-8 flex justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{products.filter(p => p.inStock).length} items in stock</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>{products.length} total products</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>Free shipping</span>
              </div>
            </div>
          </div>

          {/* Product Grid - Client Component */}
          <ProductList products={products} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Next Shop. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="#" className="transition-colors hover:text-gray-800">Privacy Policy</Link>
              <Link href="#" className="transition-colors hover:text-gray-800">Terms of Service</Link>
              <Link href="#" className="transition-colors hover:text-gray-800">Contact</Link>
            </div>
          </div>
          
          {/* Build Info */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-center text-xs text-gray-400">
              Server-Side Rendered • ISR with {revalidate}s cache • Build: {new Date().toISOString().split('T')[0]}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
