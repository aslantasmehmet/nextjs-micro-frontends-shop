import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import DynamicHeader from "./components/DynamicHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'NextShop - E-Ticaret Platformu',
    template: '%s | NextShop'
  },
  description: "NextShop ile en yeni teknoloji ürünlerini keşfedin. Elektronik, aksesuar ve bilgisayar ürünlerinde güvenli alışveriş.",
  keywords: ['e-ticaret', 'elektronik', 'aksesuar', 'bilgisayar', 'alışveriş', 'teknoloji'],
  authors: [{ name: 'NextShop Team' }],
  creator: 'NextShop',
  publisher: 'NextShop',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'http://localhost:3000',
    siteName: 'NextShop',
    title: 'NextShop - E-Ticaret Platformu',
    description: 'En yeni teknoloji ürünlerini keşfedin ve güvenli alışveriş yapın.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NextShop E-Ticaret',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextShop - E-Ticaret Platformu',
    description: 'En yeni teknoloji ürünlerini keşfedin.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  category: 'e-commerce',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NextShop',
    description: 'E-Ticaret Platformu',
    url: 'http://localhost:3000',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'http://localhost:3000/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'NextShop',
      url: 'http://localhost:3000',
    },
  };

  return (
    <html lang="tr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        <DynamicHeader />
        {children}
      </body>
    </html>
  );
}
