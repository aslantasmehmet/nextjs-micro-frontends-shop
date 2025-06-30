/* eslint-disable */
// @ts-nocheck

'use client';

import { Header } from "../../shared";
import { useAppSelector } from '../../store/hooks';

export default function DynamicHeader() {
  const totalItems = useAppSelector(state => state.cart.totalItems);

  return (
    <Header 
      cartCount={totalItems} 
      cartUrl="/" 
      homeUrl="http://localhost:3000" 
    />
  );
} 