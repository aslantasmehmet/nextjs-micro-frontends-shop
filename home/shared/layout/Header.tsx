/* eslint-disable */
// @ts-nocheck
'use client';

import Link from 'next/link';
import { MenuIcon, SearchIcon, UserIcon, ShoppingBagIcon } from '../icons';

interface HeaderProps {
  cartCount?: number;
  cartUrl?: string;
  homeUrl?: string;
}

export default function Header({ 
  cartCount = 0, 
  cartUrl = '/cart', 
  homeUrl = '/' 
}: HeaderProps) {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-6">
        {/* Sol bölüm */}
        <div className="flex items-center gap-6">
          <button className="text-gray-700 hover:text-orange-500">
            <MenuIcon className="h-6 w-6" />
          </button>
          <Link href={homeUrl} className="text-3xl font-bold tracking-tight">
            <span className="text-orange-500">kayra</span>
            <span className="text-gray-700">rug</span>
            <span className="block text-xs font-normal tracking-widest text-gray-500">leader in vintage</span>
          </Link>
        </div>

        {/* Navigasyon menüsü */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">Rugs</Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">Pillows</Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">New Arrivals</Link>
          <Link href="#" className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors">Sale</Link>
        </nav>

        {/* Sağ bölüm */}
        <div className="flex items-center gap-6">
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-64 rounded-full border border-gray-300 bg-gray-100 py-2 pl-10 pr-4 text-sm focus:border-orange-500 focus:ring-orange-500"
            />
            <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-gray-700 hover:text-orange-500">
              <UserIcon className="h-6 w-6" />
            </Link>
            <Link href={cartUrl} className="relative text-gray-700 hover:text-orange-500">
              <ShoppingBagIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full border-b border-gray-200"></div>
    </header>
  );
} 