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
  
  // Check if we have the actual image, otherwise use placeholder
  const imageMap: { [key: string]: string } = {
    'akilli-saat': '/products/smart-watch/main.jpg',
    'smart-watch': '/products/smart-watch/main.jpg'
  };
  
  return imageMap[slug] || '/placeholder.svg';
}

// Mock product database
const products: Product[] = [
  { 
    id: 1, 
    name: 'Akıllı Saat', 
    category: 'Elektronik', 
    price: '799.99 TL', 
    imageUrl: getProductImageUrl('Akıllı Saat'),
    description: 'Yeni nesil akıllı saat. Sağlık takibi, spor modları ve daha fazlası.',
    inStock: true,
    rating: 4.5,
    createdAt: '2024-01-15',
    slug: nameToSlug('Akıllı Saat')
  },
  { 
    id: 2, 
    name: 'Kablosuz Kulaklık', 
    category: 'Aksesuar', 
    price: '449.99 TL', 
    imageUrl: getProductImageUrl('Kablosuz Kulaklık'),
    description: 'Yüksek kaliteli ses, aktif gürültü engelleme özelliği.',
    inStock: true,
    rating: 4.7,
    createdAt: '2024-01-10',
    slug: nameToSlug('Kablosuz Kulaklık')
  },
  { 
    id: 3, 
    name: 'Mekanik Klavye', 
    category: 'Bilgisayar', 
    price: '1,299.99 TL', 
    imageUrl: getProductImageUrl('Mekanik Klavye'),
    description: 'RGB aydınlatmalı mekanik klavye. Oyun ve yazılım geliştirme için ideal.',
    inStock: true,
    rating: 4.3,
    createdAt: '2024-01-08',
    slug: nameToSlug('Mekanik Klavye')
  },
  { 
    id: 4, 
    name: 'Oyuncu Faresi', 
    category: 'Bilgisayar', 
    price: '699.99 TL', 
    imageUrl: getProductImageUrl('Oyuncu Faresi'),
    description: 'Yüksek DPI, programlanabilir tuşlar. E-spor için tasarlandı.',
    inStock: false,
    rating: 4.6,
    createdAt: '2024-01-05',
    slug: nameToSlug('Oyuncu Faresi')
  },
  { 
    id: 5, 
    name: 'Akıllı Telefon', 
    category: 'Elektronik', 
    price: '3,999.99 TL', 
    imageUrl: getProductImageUrl('Akıllı Telefon'),
    description: 'Yeni nesil kamera teknolojisi, hızlı şarj ve daha fazlası.',
    inStock: true,
    rating: 4.8,
    createdAt: '2024-01-20',
    slug: nameToSlug('Akıllı Telefon')
  },
  { 
    id: 6, 
    name: 'Tablet', 
    category: 'Elektronik', 
    price: '2,199.99 TL', 
    imageUrl: getProductImageUrl('Tablet'),
    description: '10.9 inç ekran, Apple Pencil desteği, hafif tasarım.',
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