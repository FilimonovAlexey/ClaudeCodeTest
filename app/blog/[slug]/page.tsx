import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import {
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
  extractTableOfContents,
} from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import { CategoryBadge } from '@/components/blog/CategoryBadge';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { BlogCard } from '@/components/blog/BlogCard';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';

/**
 * Blog post page
 * Displays a single blog post with content, TOC, and related posts
 */
interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post || !post.content) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post, 3);
  const toc = extractTableOfContents(post.content);
  const postUrl = `https://techblog.com/blog/${post.slug}`;

  return (
    <article className="pb-16">
      {/* Back button */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero section */}
      <header className="border-b border-border bg-muted/30">
        <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <CategoryBadge category={post.category} className="mb-4" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {post.title}
          </h1>
          <p className="mb-6 text-xl text-muted-foreground">
            {post.description}
          </p>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className="rounded-full bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Cover Image */}
      <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-border">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Main content with sidebar */}
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">
          {/* Article content */}
          <div className="mx-auto w-full max-w-3xl">
            {/* Share buttons */}
            <div className="mb-8 flex items-center justify-between border-b border-border pb-6">
              <ShareButtons title={post.title} url={postUrl} />
            </div>

            {/* MDX Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MDXRemote
                source={post.content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeHighlight,
                      rehypeSlug,
                      [
                        rehypeAutolinkHeadings,
                        {
                          behavior: 'wrap',
                          properties: {
                            className: ['anchor-link'],
                          },
                        },
                      ],
                    ],
                  },
                }}
              />
            </div>

            {/* Share buttons bottom */}
            <div className="mt-12 border-t border-border pt-6">
              <ShareButtons title={post.title} url={postUrl} />
            </div>
          </div>

          {/* Sidebar - Table of Contents */}
          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <TableOfContents items={toc} />
            </aside>
          )}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="mb-8 text-3xl font-bold tracking-tight">
              Related Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
