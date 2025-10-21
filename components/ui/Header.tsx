import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Search } from 'lucide-react';

/**
 * Header component
 * Main navigation bar with logo, navigation links, and theme toggle
 */
export function Header() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight transition-colors hover:text-primary"
        >
          TechBlog
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="rounded-lg p-2 transition-colors hover:bg-muted"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
