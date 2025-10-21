import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { BlogPost, BlogFrontmatter, TocItem } from '@/types/blog';

// Directory where blog posts are stored
const postsDirectory = path.join(process.cwd(), 'content/posts');

/**
 * Get all blog post slugs
 * @returns Array of post slugs (filenames without .mdx extension)
 */
export function getAllPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => fileName.replace(/\.mdx$/, ''));
  } catch (error) {
    // Return empty array if directory doesn't exist
    return [];
  }
}

/**
 * Get post data by slug
 * @param slug - Post slug
 * @returns Blog post data with content
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse frontmatter
    const { data, content } = matter(fileContents);
    const frontmatter = data as BlogFrontmatter;

    // Calculate reading time
    const { text: readingTimeText } = readingTime(content);

    return {
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      date: frontmatter.date,
      author: frontmatter.author,
      coverImage: frontmatter.coverImage,
      category: frontmatter.category,
      tags: frontmatter.tags || [],
      readingTime: readingTimeText,
      featured: frontmatter.featured || false,
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all blog posts
 * @returns Array of all blog posts sorted by date (newest first)
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug))
  );

  // Filter out null values and sort by date
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

/**
 * Get posts by category
 * @param category - Category to filter by
 * @returns Array of posts in the category
 */
export async function getPostsByCategory(
  category: string
): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get posts by tag
 * @param tag - Tag to filter by
 * @returns Array of posts with the tag
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get all unique categories
 * @returns Array of unique categories
 */
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = posts.map((post) => post.category);
  return Array.from(new Set(categories));
}

/**
 * Get all unique tags
 * @returns Array of unique tags
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = posts.flatMap((post) => post.tags);
  return Array.from(new Set(tags));
}

/**
 * Get featured posts
 * @param limit - Maximum number of posts to return
 * @returns Array of featured posts
 */
export async function getFeaturedPosts(limit?: number): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.featured);
  return limit ? featuredPosts.slice(0, limit) : featuredPosts;
}

/**
 * Get related posts based on tags and category
 * @param currentPost - Current post to find related posts for
 * @param limit - Maximum number of related posts to return
 * @returns Array of related posts
 */
export async function getRelatedPosts(
  currentPost: BlogPost,
  limit: number = 3
): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();

  // Filter out current post and calculate relevance score
  const postsWithScore = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      let score = 0;

      // Same category gets highest score
      if (post.category === currentPost.category) {
        score += 10;
      }

      // Shared tags increase score
      const sharedTags = post.tags.filter((tag) =>
        currentPost.tags.includes(tag)
      );
      score += sharedTags.length * 5;

      return { post, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return postsWithScore.slice(0, limit).map(({ post }) => post);
}

/**
 * Search posts by query
 * @param query - Search query
 * @returns Array of posts matching the query
 */
export async function searchPosts(query: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  const lowerQuery = query.toLowerCase();

  return allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.description.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      post.category.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Extract table of contents from markdown content
 * @param content - Markdown content
 * @returns Array of table of contents items
 */
export function extractTableOfContents(content: string): TocItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    toc.push({ id, title, level });
  }

  return toc;
}

/**
 * Paginate posts
 * @param posts - Array of posts to paginate
 * @param page - Current page (1-indexed)
 * @param pageSize - Number of posts per page
 * @returns Paginated posts with metadata
 */
export function paginatePosts(
  posts: BlogPost[],
  page: number = 1,
  pageSize: number = 9
): {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
} {
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / pageSize);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    posts: posts.slice(startIndex, endIndex),
    currentPage,
    totalPages,
    totalPosts,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}
