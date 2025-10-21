import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'TechBlog - Modern Technology Insights',
    template: '%s | TechBlog',
  },
  description:
    'Explore cutting-edge technology trends, web development tutorials, and software engineering best practices.',
  keywords: [
    'technology',
    'web development',
    'programming',
    'software engineering',
    'tutorials',
    'Next.js',
    'React',
    'TypeScript',
  ],
  authors: [{ name: 'TechBlog Team' }],
  creator: 'TechBlog',
  metadataBase: new URL('https://techblog.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://techblog.com',
    siteName: 'TechBlog',
    title: 'TechBlog - Modern Technology Insights',
    description:
      'Explore cutting-edge technology trends, web development tutorials, and software engineering best practices.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TechBlog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechBlog - Modern Technology Insights',
    description:
      'Explore cutting-edge technology trends, web development tutorials, and software engineering best practices.',
    images: ['/og-image.png'],
    creator: '@techblog',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
