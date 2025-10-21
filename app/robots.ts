import { MetadataRoute } from 'next';

/**
 * Generate robots.txt for SEO
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://techblog.com/sitemap.xml',
  };
}
