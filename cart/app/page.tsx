import { Metadata } from 'next/types';
import CartContent from './components/CartContent';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Alışveriş Sepeti - NextShop',
  description: 'Alışveriş sepetinizi görüntüleyin, ürün miktarlarını güncelleyin ve güvenli ödemeye geçin.',
  keywords: 'sepet, alışveriş sepeti, e-ticaret, ödeme, satın alma',
  openGraph: {
    title: 'Alışveriş Sepeti - NextShop',
    description: 'Sepetinizdeki ürünleri görüntüleyin ve satın alın.',
    type: 'website',
  },
  robots: {
    index: false, // Cart pages should not be indexed
    follow: true,
  },
};

// SSR: Bu sayfa dinamik içerik olduğu için cache'lenmez
export const dynamic = 'force-dynamic';

// --- SERVER COMPONENT PAGE ---
export default async function CartPage() {
  // Server-side metadata ve initial setup
  const timestamp = new Date().toISOString();
  
  return (
    <>
      {/* Hidden data for SEO and analytics */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Alışveriş Sepeti",
            "description": "Kullanıcının alışveriş sepeti sayfası",
            "url": "http://localhost:3001/cart",
            "dateModified": timestamp,
            "provider": {
              "@type": "Organization",
              "name": "NextShop"
            }
          })
        }}
      />
      
      {/* Client-side cart functionality */}
      <CartContent />
    </>
  );
}
