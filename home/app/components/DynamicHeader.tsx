/* eslint-disable */
// @ts-nocheck

'use client';

import { Header } from "../../shared";
import { useCart } from '../../hooks/useCart';

export default function DynamicHeader() {
  const { cartCount } = useCart();

  return (
    <Header 
      cartCount={cartCount} 
      cartUrl="http://localhost:3001/cart" 
      homeUrl="/" 
    />
  );
} 