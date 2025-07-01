// Product image utilities and configurations

export interface ProductImagePaths {
  main: string;
  gallery: string[];
  thumbnail: string;
}

export interface ProductImageConfig {
  [productSlug: string]: ProductImagePaths;
}

// Centralized product image configuration
export const PRODUCT_IMAGES: ProductImageConfig = {
  'smart-watch': {
    main: '/products/smart-watch/main.jpg',
    gallery: [
      '/products/smart-watch/gallery-1.png',
      '/products/smart-watch/gallery-2.jpg',
      '/products/smart-watch/gallery-3.jpg',
    ],
    thumbnail: '/products/smart-watch/thumbnail.jpg'
  },
  'wireless-headphones': {
    main: '/products/wireless-headphones/main.jpg',
    gallery: [
      '/products/wireless-headphones/gallery-1.jpg',
      '/products/wireless-headphones/gallery-2.jpg',
    ],
    thumbnail: '/products/wireless-headphones/thumbnail.jpg'
  },
  'mechanical-keyboard': {
    main: '/products/mechanical-keyboard/main.jpg',
    gallery: [
      '/products/mechanical-keyboard/gallery-1.jpg',
      '/products/mechanical-keyboard/gallery-2.jpg',
    ],
    thumbnail: '/products/mechanical-keyboard/thumbnail.jpg'
  },
  'gaming-mouse': {
    main: '/products/gaming-mouse/main.jpg',
    gallery: [
      '/products/gaming-mouse/gallery-1.jpg',
      '/products/gaming-mouse/gallery-2.jpg',
    ],
    thumbnail: '/products/gaming-mouse/thumbnail.jpg'
  },
  'smartphone': {
    main: '/products/smartphone/main.jpg',
    gallery: [
      '/products/smartphone/gallery-1.jpg',
      '/products/smartphone/gallery-2.jpg',
      '/products/smartphone/gallery-3.jpg',
    ],
    thumbnail: '/products/smartphone/thumbnail.jpg'
  },
  'tablet': {
    main: '/products/tablet/main.jpg',
    gallery: [
      '/products/tablet/gallery-1.jpg',
      '/products/tablet/gallery-2.jpg',
    ],
    thumbnail: '/products/tablet/thumbnail.jpg'
  }
};

/**
 * Get main image URL for a product
 */
export function getProductImage(productSlug: string): string {
  const config = PRODUCT_IMAGES[productSlug];
  return config?.main || '/placeholder.jpg';
}

/**
 * Get all gallery images for a product
 */
export function getProductGallery(productSlug: string): string[] {
  const config = PRODUCT_IMAGES[productSlug];
  return config?.gallery || [];
}

/**
 * Get thumbnail image for a product
 */
export function getProductThumbnail(productSlug: string): string {
  const config = PRODUCT_IMAGES[productSlug];
  return config?.thumbnail || config?.main || '/placeholder.jpg';
}

/**
 * Convert product name to slug format
 */
export function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Get product image with fallback logic
 */
export function getProductImageWithFallback(
  productName: string, 
  explicitUrl?: string
): string {
  // If explicit URL is provided, use it
  if (explicitUrl && explicitUrl !== '/placeholder.jpg') {
    return explicitUrl;
  }
  
  // Generate slug from product name and try to find image
  const slug = nameToSlug(productName);
  return getProductImage(slug);
} 