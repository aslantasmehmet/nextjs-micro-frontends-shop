// Cart Item Interface
export interface CartItem {
  id: number;
  name: string;
  category?: string;
  price: string;
  quantity: number;
  imageUrl?: string;
}

// Cart State Interface
export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  error: string | null;
}

// API Response Types
export interface AddToCartRequest {
  id: number;
  name: string;
  category?: string;
  price: string;
  imageUrl?: string;
}

export interface CartApiResponse {
  success: boolean;
  message?: string;
  cart?: CartItem[];
} 