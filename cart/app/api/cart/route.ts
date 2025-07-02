import { NextRequest, NextResponse } from 'next/server';

interface Product {
  id: number;
  name: string;
  price: string;
  quantity: number;
  imageUrl: string;
}

// Şimdilik sepet verilerini bellekte tutuyoruz.
// Gerçek bir uygulamada bu veritabanında veya başka bir kalıcı depolama alanında olmalıdır.
const cartItems: Product[] = [];

// GET /api/cart - Sepetteki ürünleri getirir
export async function GET() {
  return NextResponse.json(cartItems);
}

// POST /api/cart - Sepete yeni ürün ekler
export async function POST(request: NextRequest) {
  try {
    const item: Product = await request.json();

    // Basit bir doğrulama. Gelen verinin bir "name" ve "price" alanı olmalı.
    if (!item.name || !item.price) {
      return NextResponse.json({ error: 'Ürün adı ve fiyatı zorunludur.' }, { status: 400 });
    }

    // Ürünün sepette olup olmadığını kontrol et. Varsa miktarını artır, yoksa ekle.
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cartItems.push({ ...item, quantity: 1 });
    }

    return NextResponse.json({ message: 'Ürün sepete eklendi.', cart: cartItems }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek.' }, { status: 400 });
  }
}