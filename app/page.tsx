import { getAllPosts, getFeaturedPosts } from '@/lib/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

/**
 * Home page
 * Displays featured posts and recent articles
 */
export default async function Home() {
  const featuredPosts = await getFeaturedPosts(2);
  const allPosts = await getAllPosts();
  const recentPosts = allPosts.slice(0, 6);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            TechBlog
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Discover the latest insights in web development, cutting-edge
          technologies, and software engineering best practices.
        </p>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Articles
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            Recent Articles
          </h2>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-16 rounded-lg bg-gradient-to-r from-primary to-blue-600 p-8 text-center text-white sm:p-12">
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
          Stay Updated
        </h2>
        <p className="mb-6 text-lg opacity-90">
          Get the latest articles delivered straight to your inbox.
        </p>
        <form className="mx-auto flex max-w-md gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="rounded-lg bg-white px-6 py-2 font-medium text-primary transition-colors hover:bg-gray-100"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
