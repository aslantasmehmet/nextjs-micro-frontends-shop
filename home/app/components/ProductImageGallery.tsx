/* eslint-disable */
// @ts-nocheck

'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductImageGalleryProps {
  productId: number;
  productName: string;
  productSlug: string;
  images?: string[];
}

export default function ProductImageGallery({ 
  productId, 
  productName, 
  productSlug,
  images = []
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Default image paths based on product slug
  const defaultImages = [
    `/products/${productSlug}/main.jpg`,
    `/products/${productSlug}/gallery-1.jpg`,
    `/products/${productSlug}/gallery-2.jpg`,
    `/products/${productSlug}/gallery-3.jpg`,
  ];

  const imageList = images.length > 0 ? images : defaultImages;
  const currentImage = imageList[selectedImage];

  return (
    <div className="flex flex-col space-y-4">
      {/* Main Image */}
      <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={currentImage}
          alt={`${productName} - Görsel ${selectedImage + 1}`}
          width={600}
          height={600}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          priority={selectedImage === 0}
          onError={(e) => {
            // Fallback to placeholder if image doesn't exist
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-2">
        {imageList.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 hover:border-blue-400 ${
              selectedImage === index 
                ? 'border-blue-500 ring-2 ring-blue-200' 
                : 'border-gray-200'
            }`}
          >
            <Image
              src={image}
              alt={`${productName} - Küçük görsel ${index + 1}`}
              width={150}
              height={150}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </button>
        ))}
      </div>

      {/* Image Counter */}
      <div className="text-center text-sm text-gray-500">
        {selectedImage + 1} / {imageList.length}
      </div>

      {/* Zoom Button */}
      <button 
        onClick={() => {
          // TODO: Open in modal or fullscreen
          console.log('Zoom image:', currentImage);
        }}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
      >
        🔍 Büyük Görüntüle
      </button>
    </div>
  );
} 