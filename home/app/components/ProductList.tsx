/* eslint-disable */
// @ts-nocheck

'use client';

import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useCart } from '../../hooks/useCart';
import { Product } from '../api/products/route';
import React from 'react';

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

const SpinnerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
    <path d="M21 12a9 9 0 11-6.219-8.56"/>
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
            Out of Stock
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
            className="relative z-10 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:transform-none disabled:shadow-md"
          >
            {isLoading ? (
              <>
                <SpinnerIcon className="h-4 w-4" />
                <span>Adding...</span>
              </>
            ) : !product.inStock ? (
              <>
                <span className="inline-block w-4 h-4 rounded-full bg-red-400"></span>
                <span>Out of Stock</span>
              </>
            ) : (
              <>
                <PlusIcon className="h-4 w-4" />
                <span>Add to Cart</span>
              </>
            )}
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
  const [loadingProducts, setLoadingProducts] = React.useState<Set<number>>(new Set());

  const handleAddToCart = async (product: Product) => {
    if (!product.inStock) {
      toast.error('This product is currently out of stock!', {
        duration: 3000,
        icon: '❌',
        style: {
          background: '#FEF2F2',
          color: '#DC2626',
          border: '1px solid #FECACA'
        }
      });
      return;
    }

    // Set loading state for this specific product
    setLoadingProducts(prev => new Set(prev).add(product.id));

    try {
      addToCart({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        imageUrl: product.imageUrl,
      });
      
      toast.success(`${product.name} added to cart!`, {
        duration: 2000,
        icon: '🛒',
        style: {
          background: '#F0FDF4',
          color: '#15803D',
          border: '1px solid #BBF7D0'
        }
      });
    } catch (error) {
      toast.error('Failed to add product to cart. Please try again.', {
        duration: 3000,
        icon: '⚠️',
        style: {
          background: '#FFFBEB',
          color: '#D97706',
          border: '1px solid #FED7AA'
        }
      });
    } finally {
      // Remove loading state for this product after a short delay
      setTimeout(() => {
        setLoadingProducts(prev => {
          const newSet = new Set(prev);
          newSet.delete(product.id);
          return newSet;
        });
      }, 500);
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No products found</h3>
        <p className="mt-2 text-sm text-gray-500">No products available to display at the moment.</p>
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
          isLoading={loadingProducts.has(product.id)}
        />
      ))}
    </div>
  );
} 