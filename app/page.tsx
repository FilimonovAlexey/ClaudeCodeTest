import { getAllPosts } from '@/lib/blog';
import { BlogCard } from '@/components/blog/BlogCard';

/**
 * Home page - Wylsa.com inspired minimalist design
 * Clean, content-focused layout with emphasis on typography
 */
export default async function Home() {
  const allPosts = await getAllPosts();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Simple Hero */}
      <section className="mb-12 border-b border-border pb-8">
        <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Latest Articles
        </h1>
        <p className="text-lg text-muted-foreground">
          Insights on web development and technology
        </p>
      </section>

      {/* Posts Grid - Wylsa style */}
      <section>
        <div className="grid gap-8 sm:grid-cols-2">
          {allPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
