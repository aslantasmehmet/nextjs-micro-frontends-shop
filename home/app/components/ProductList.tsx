/* eslint-disable */
// @ts-nocheck

'use client';

import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useCart } from '../../hooks/useCart';
import { Product } from '../api/products/route';

// --- ICONS ---
const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

// --- COMPONENTS ---
function ProductCard({ product, onAddToCart, isLoading }: { 
  product: Product; 
  onAddToCart: (product: Product) => void; 
  isLoading: boolean;
}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
      <div className="aspect-square overflow-hidden relative">
        <Image 
          src={product.imageUrl} 
          alt={product.name} 
          width={400} 
          height={400} 
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        
        {/* Stock Status Badge */}
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Stokta Yok
          </div>
        )}
        
        {/* Rating Badge */}
        {product.rating && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <StarIcon className="h-3 w-3" />
            {product.rating}
          </div>
        )}
      </div>
      
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-gray-800">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        
        {/* Description */}
        {product.description && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
        )}
        
        <div className="mt-auto flex items-end justify-between pt-4">
          <p className="text-xl font-bold text-gray-900">{product.price}</p>
          <button
            onClick={() => onAddToCart(product)}
            disabled={isLoading || !product.inStock}
            className="z-10 flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            <PlusIcon className="h-4 w-4" />
            <span>
              {!product.inStock ? 'Stokta Yok' : isLoading ? 'Ekleniyor...' : 'Ekle'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---
interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const { addToCart, loading } = useCart();

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) {
      toast.error('Bu ürün şu anda stokta bulunmuyor!', {
        duration: 3000,
        icon: '❌',
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    
    toast.success(`${product.name} sepete eklendi!`, {
      duration: 2000,
      icon: '🛒',
    });
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Ürün bulunamadı</h3>
        <p className="mt-2 text-sm text-gray-500">Şu anda görüntülenecek ürün bulunmuyor.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={handleAddToCart}
          isLoading={loading}
        />
      ))}
    </div>
  );
} 