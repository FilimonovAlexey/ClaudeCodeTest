import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { formatDate } from '@/lib/utils';

/**
 * BlogCard component - Wylsa.com inspired minimalist design
 * Clean card with large typography and simple metadata
 */
interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Cover Image */}
        <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-90"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          {/* Category */}
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {post.category}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold leading-tight tracking-tight transition-colors group-hover:text-primary sm:text-3xl">
            {post.title}
          </h2>

          {/* Description */}
          <p className="line-clamp-2 text-base text-muted-foreground">
            {post.description}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-3 pt-2 text-sm text-muted-foreground">
            <span>{post.author.name}</span>
            <span>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
