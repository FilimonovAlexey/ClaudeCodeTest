import { getAllPosts, getAllCategories, getAllTags } from '@/lib/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { CategoryFilter } from '@/components/blog/CategoryFilter';

/**
 * Blog page
 * Displays all blog posts with filtering options
 */
export const metadata = {
  title: 'Blog',
  description: 'Browse all our articles on web development, technology, and software engineering.',
};

interface BlogPageProps {
  searchParams: {
    category?: string;
    tag?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const allPosts = await getAllPosts();
  const categories = await getAllCategories();
  const tags = await getAllTags();

  // Filter posts based on search params
  let filteredPosts = allPosts;

  if (searchParams.category) {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.category.toLowerCase() === searchParams.category?.toLowerCase()
    );
  }

  if (searchParams.tag) {
    filteredPosts = filteredPosts.filter((post) =>
      post.tags.some(
        (tag) => tag.toLowerCase() === searchParams.tag?.toLowerCase()
      )
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Blog
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Explore our collection of articles on web development, technology
          trends, and software engineering.
        </p>
      </div>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        tags={tags}
        selectedCategory={searchParams.category}
        selectedTag={searchParams.tag}
      />

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-lg text-muted-foreground">
            No posts found matching your filters.
          </p>
        </div>
      )}

      {/* Posts count */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        Showing {filteredPosts.length} of {allPosts.length} articles
      </div>
    </div>
  );
}
