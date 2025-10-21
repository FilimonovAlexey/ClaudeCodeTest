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
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 border-b border-border pb-8">
        <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl">
          All Articles
        </h1>
        <p className="text-lg text-muted-foreground">
          Browse all articles on web development and technology
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
        <div className="grid gap-8 sm:grid-cols-2">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-lg text-muted-foreground">
            No articles found matching your filters.
          </p>
        </div>
      )}
    </div>
  );
}
