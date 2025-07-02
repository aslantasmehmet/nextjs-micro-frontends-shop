"use client";

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store/hooks';
import { RootState } from '../store/store';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { CartItem } from '../store/types';

// --- ICONS ---
const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2 2v2" />
    </svg>
);

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
    </svg>
);

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14m7-7H5" />
    </svg>
);

const MinusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
    </svg>
);

const ShoppingBagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="m16 10a4 4 0 0 1-8 0"/>
    </svg>
);

const CreditCardIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
);

// Helper function to format price
const formatPrice = (priceString: string): number => {
  // Remove currency symbols and extra spaces
  let cleanPrice = priceString.replace(/[^0-9,.]+/g, "");
  
  // Handle Turkish format: 1.299,99 -> 1299.99
  if (cleanPrice.includes(',') && cleanPrice.includes('.')) {
    // Format like "1.299,99" - dot is thousands, comma is decimal
    cleanPrice = cleanPrice.replace(/\./g, '').replace(',', '.');
  } else if (cleanPrice.includes(',')) {
    // Format like "499,99" - comma is decimal
    cleanPrice = cleanPrice.replace(',', '.');
  }
  
  return parseFloat(cleanPrice) || 0;
};

// Helper function to display price
const displayPrice = (price: number): string => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

// --- PAGE ---
export default function CartPage() {
  const dispatch = useAppDispatch();
  
  // Redux store'dan verileri al
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const loading = useSelector((state: RootState) => state.cart.loading);

  const handleRemoveItem = (id: number, name: string) => {
    dispatch(removeFromCart(id));
    toast.success(`${name} removed from cart!`, {
      duration: 2000,
      icon: '🗑️',
    });
  };

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared successfully!', {
      duration: 2000,
      icon: '🧹',
    });
  };

  // Calculate individual item totals
  const getItemTotal = (item: CartItem) => {
    const price = formatPrice(item.price);
    console.log(`Price debug - Original: "${item.price}", Parsed: ${price}, Quantity: ${item.quantity}`);
    return price * item.quantity;
  };

  // Calculate shipping
  const shippingCost = totalPrice >= 500 ? 0 : 29.99;
  const finalTotal = totalPrice + shippingCost;

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-lg text-gray-600">Loading your cart...</p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <Link href="http://localhost:3000" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium mb-6">
            <ArrowLeftIcon className="h-5 w-5" />
            Continue Shopping
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <ShoppingBagIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Shopping Cart
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center rounded-2xl border-2 border-dashed border-gray-200 bg-white p-16 shadow-sm">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBagIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Link href="http://localhost:3000" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-0.5">
              <ShoppingBagIcon className="h-5 w-5" />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-6 lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">Cart Items</h2>
                </div>
                
                {cartItems.map((item, index) => (
                  <div key={item.id} className={`flex items-start gap-6 p-6 ${index !== cartItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={item.imageUrl ? `http://localhost:3000${item.imageUrl}` : '/placeholder.jpg'}
                        alt={item.name} 
                        width={120} 
                        height={120} 
                        className="h-24 w-24 rounded-xl object-cover bg-gray-200 shadow-sm"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.jpg';
                        }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                      {item.category && (
                        <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Unit Price</span>
                          <span className="text-lg font-bold text-gray-900">{displayPrice(formatPrice(item.price))}</span>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <span className="text-sm text-gray-500">Total</span>
                          <span className="text-lg font-bold text-blue-600">{displayPrice(getItemTotal(item))}</span>
                        </div>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-700">Quantity:</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={item.quantity <= 1}
                            >
                              <MinusIcon className="h-4 w-4" />
                            </button>
                            <span className="w-12 text-center text-base font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                            >
                              <PlusIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors font-medium"
                        >
                          <TrashIcon className="h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              {cartItems.length > 0 && (
                <div className="flex justify-end">
                  <button
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors border border-red-200 hover:border-red-300 px-4 py-2 rounded-lg hover:bg-red-50"
                  >
                    Clear All Items
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                    <span className="font-semibold text-gray-900">{displayPrice(totalPrice)}</span>
                  </div>
                  
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Shipping</span>
                    <span className={`font-semibold ${shippingCost === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                      {shippingCost === 0 ? 'Free' : displayPrice(shippingCost)}
                    </span>
                  </div>
                  
                  {totalPrice < 500 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-700">
                        Add {displayPrice(500 - totalPrice)} more for free shipping!
                      </p>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">{displayPrice(finalTotal)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Including all taxes</p>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <button className="w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:-translate-y-0.5">
                    <CreditCardIcon className="h-5 w-5" />
                    Proceed to Checkout
                  </button>
                  
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                      Secure checkout • 256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
