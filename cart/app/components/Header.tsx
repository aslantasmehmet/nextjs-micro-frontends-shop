'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

// --- SVG ICONS ---
const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ShoppingBagIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

// --- HEADER COMPONENT ---
export default function Header() {
  // Redux store'dan sepet sayısını alıyoruz
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          <button className="text-gray-700 hover:text-orange-500">
            <MenuIcon className="h-6 w-6" />
          </button>
          <Link href="http://localhost:3000" className="text-3xl font-bold tracking-tight">
            <span className="text-orange-500">kayra</span>
            <span className="text-gray-700">rug</span>
            <span className="block text-xs font-normal tracking-widest text-gray-500">leader in vintage</span>
          </Link>
        </div>

        {/* Middle Section - Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="http://localhost:3000" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">Home</Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">Rugs</Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">Pillows</Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">New Arrivals</Link>
          <Link href="#" className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors">Sale</Link>
        </nav>

        {/* Right Section */}
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
            <Link href="/cart" className="relative text-gray-700 hover:text-orange-500">
              <ShoppingBagIcon className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                  {totalItems}
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