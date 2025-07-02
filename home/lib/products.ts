import { Product } from '../app/api/products/route';

// Development/Production URL handling
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side
    return '';
  }
  
  // Server-side
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com';
  }
  
  return 'http://localhost:3000';
};

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  total: number;
  timestamp: string;
  error?: string;
}

// Server-side product fetching
export async function getProducts(options?: {
  category?: string;
  inStock?: boolean;
  limit?: number;
}): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    
    if (options?.category) {
      params.append('category', options.category);
    }
    
    if (options?.inStock !== undefined) {
      params.append('inStock', options.inStock.toString());
    }
    
    if (options?.limit) {
      params.append('limit', options.limit.toString());
    }

    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/products${params.toString() ? `?${params}` : ''}`;
    
    const response = await fetch(url, {
      // ISR: 60 saniyede bir revalidate
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ProductsResponse = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch products');
    }

    return result.data;
  } catch (error) {
    console.error('getProducts error:', error);
    // Fallback: Return mock data on error
    return getMockProducts();
  }
}

// Mock data fallback
function getMockProducts(): Product[] {
  return [
    { 
      id: 1, 
      name: 'Akıllı Saat', 
      category: 'Elektronik', 
      price: '799.99 TL', 
      imageUrl: '/placeholder.svg',
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
      imageUrl: '/placeholder.svg',
      description: 'Yüksek kaliteli ses, aktif gürültü engelleme özelliği.',
      inStock: true,
      rating: 4.7,
      createdAt: '2024-01-10'
    },
    { 
      id: 3, 
      name: 'Mekanik Klavye', 
      category: 'Bilgisayar', 
      price: '1299.99 TL', 
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
      imageUrl: '/placeholder.svg',
      description: 'Yüksek DPI, programlanabilir tuşlar. E-spor için tasarlandı.',
      inStock: false,
      rating: 4.6,
      createdAt: '2024-01-05'
    }
  ];
}

// Static generation için tüm ürünleri al
export async function getAllProducts(): Promise<Product[]> {
  return getProducts();
}

// Category'lere göre ürünleri al
export async function getProductsByCategory(category: string): Promise<Product[]> {
  return getProducts({ category, inStock: true });
}

// Stokta olan ürünleri al  
export async function getInStockProducts(): Promise<Product[]> {
  return getProducts({ inStock: true });
} 