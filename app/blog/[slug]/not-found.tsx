import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

/**
 * Not found page for blog posts
 */
export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <h2 className="mb-4 text-3xl font-semibold">Post Not Found</h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Sorry, we couldn't find the blog post you're looking for.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </div>
    </div>
  );
}
