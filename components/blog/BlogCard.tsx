import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';
import { Calendar, Clock, User } from 'lucide-react';
import { CategoryBadge } from './CategoryBadge';

/**
 * BlogCard component
 * Displays a blog post preview in a card format
 */
interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card
        variant="hover"
        className={featured ? 'md:col-span-2 md:flex md:flex-row' : ''}
      >
        {/* Cover Image */}
        <div
          className={`relative overflow-hidden ${
            featured
              ? 'md:w-1/2'
              : 'aspect-[16/9] w-full'
          }`}
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
          />
        </div>

        {/* Content */}
        <div className={`p-6 ${featured ? 'md:w-1/2 md:flex md:flex-col md:justify-center' : ''}`}>
          {/* Category Badge */}
          <CategoryBadge category={post.category} />

          {/* Title */}
          <h3
            className={`mb-2 mt-3 font-bold leading-tight tracking-tight transition-colors group-hover:text-primary ${
              featured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
            }`}
          >
            {post.title}
          </h3>

          {/* Description */}
          <p
            className={`text-muted-foreground ${
              featured ? 'mb-4 text-base md:text-lg' : 'mb-4 text-sm'
            }`}
          >
            {post.description}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
