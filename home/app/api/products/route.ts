import { NextResponse } from 'next/server';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  imageUrl: string;
  description?: string;
  inStock?: boolean;
  rating?: number;
  createdAt?: string;
  slug?: string;
}

// Product slug generator function
function nameToSlug(name: string): string {
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

// Generate product image URL
function getProductImageUrl(productName: string): string {
  const slug = nameToSlug(productName);
  
  // Map product slugs to their actual image paths
  const imageMap: { [key: string]: string } = {
    'smart-watch': '/products/smart-watch/main.jpg',
    'wireless-headphones': '/products/wireless-headphones/main.jpg',
    'mechanical-keyboard': '/products/mechanical-keyboard/main.jpg',
    'gaming-mouse': '/products/gaming-mouse/main.jpg',
    'smartphone': '/placeholder.svg',
    'tablet': '/products/tablet/main.jpg',
    // Legacy Turkish names for backwards compatibility
    'akilli-saat': '/products/smart-watch/main.jpg',
    'kablosuz-kulaklik': '/products/wireless-headphones/main.jpg',
    'mekanik-klavye': '/products/mechanical-keyboard/main.jpg',
    'oyuncu-faresi': '/products/gaming-mouse/main.jpg',
    'akilli-telefon': '/placeholder.svg'
  };
  
  return imageMap[slug] || '/placeholder.svg';
}

// Mock product database
const products: Product[] = [
  { 
    id: 1, 
    name: 'Smart Watch', 
    category: 'Electronics', 
    price: '799.99 TL', 
    imageUrl: getProductImageUrl('Smart Watch'),
    description: 'Next-generation smartwatch. Health tracking, sports modes and much more.',
    inStock: true,
    rating: 4.5,
    createdAt: '2024-01-15',
    slug: nameToSlug('Smart Watch')
  },
  { 
    id: 2, 
    name: 'Wireless Headphones', 
    category: 'Accessories', 
    price: '449.99 TL', 
    imageUrl: getProductImageUrl('Wireless Headphones'),
    description: 'High quality sound with active noise cancellation technology.',
    inStock: true,
    rating: 4.7,
    createdAt: '2024-01-10',
    slug: nameToSlug('Wireless Headphones')
  },
  { 
    id: 3, 
    name: 'Mechanical Keyboard', 
    category: 'Computers', 
    price: '1299.99 TL', 
    imageUrl: getProductImageUrl('Mechanical Keyboard'),
    description: 'RGB illuminated mechanical keyboard. Perfect for gaming and development.',
    inStock: true,
    rating: 4.3,
    createdAt: '2024-01-08',
    slug: nameToSlug('Mechanical Keyboard')
  },
  { 
    id: 4, 
    name: 'Gaming Mouse', 
    category: 'Computers', 
    price: '699.99 TL', 
    imageUrl: getProductImageUrl('Gaming Mouse'),
    description: 'High DPI, programmable buttons. Designed for esports.',
    inStock: false,
    rating: 4.6,
    createdAt: '2024-01-05',
    slug: nameToSlug('Gaming Mouse')
  },
  { 
    id: 5, 
    name: 'Smartphone', 
    category: 'Electronics', 
    price: '3999.99 TL', 
    imageUrl: getProductImageUrl('Smartphone'),
    description: 'Next-generation camera technology, fast charging and much more.',
    inStock: true,
    rating: 4.8,
    createdAt: '2024-01-20',
    slug: nameToSlug('Smartphone')
  },
  { 
    id: 6, 
    name: 'Tablet', 
    category: 'Electronics', 
    price: '2199.99 TL', 
    imageUrl: getProductImageUrl('Tablet'),
    description: '10.9 inch display, Apple Pencil support, lightweight design.',
    inStock: true,
    rating: 4.4,
    createdAt: '2024-01-12',
    slug: nameToSlug('Tablet')
  }
];

// GET /api/products
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const inStock = searchParams.get('inStock');
    const limit = searchParams.get('limit');

    let filteredProducts = [...products];

    // Category filter
    if (category) {
      filteredProducts = filteredProducts.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Stock filter
    if (inStock !== null) {
      const stockFilter = inStock === 'true';
      filteredProducts = filteredProducts.filter(
        product => product.inStock === stockFilter
      );
    }

    // Limit results
    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum)) {
        filteredProducts = filteredProducts.slice(0, limitNum);
      }
    }

    // Sort by newest first
    filteredProducts.sort((a, b) => 
      new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
    );

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json({
      success: true,
      data: filteredProducts,
      total: filteredProducts.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch products',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 