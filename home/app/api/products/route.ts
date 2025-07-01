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
}

// Mock product database
const products: Product[] = [
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
  },
  { 
    id: 5, 
    name: 'Akıllı Telefon', 
    category: 'Elektronik', 
    price: '3,999.99 TL', 
    imageUrl: '/products/smartphone/main.jpg',
    description: 'Yeni nesil kamera teknolojisi, hızlı şarj ve daha fazlası.',
    inStock: true,
    rating: 4.8,
    createdAt: '2024-01-20'
  },
  { 
    id: 6, 
    name: 'Tablet', 
    category: 'Elektronik', 
    price: '2,199.99 TL', 
    imageUrl: '/products/tablet/main.jpg',
    description: '10.9 inç ekran, Apple Pencil desteği, hafif tasarım.',
    inStock: true,
    rating: 4.4,
    createdAt: '2024-01-12'
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