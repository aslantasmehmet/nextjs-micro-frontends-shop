import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://your-domain.com'
    : 'http://localhost:3000'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/cart',           // Cart pages should not be indexed
          '/api/',           // API routes
          '/admin/',         // Admin pages
          '/_next/',         // Next.js internals
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/cart', '/api/', '/admin/'],
        crawlDelay: 2,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
} 