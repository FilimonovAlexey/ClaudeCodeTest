'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

/**
 * CategoryFilter component
 * Filter blog posts by category or tag
 */
interface CategoryFilterProps {
  categories: string[];
  tags: string[];
  selectedCategory?: string;
  selectedTag?: string;
}

export function CategoryFilter({
  categories,
  tags,
  selectedCategory,
  selectedTag,
}: CategoryFilterProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  return (
    <div className="mb-8 space-y-6">
      {/* Categories */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          <Link
            href={pathname}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors',
              !selectedCategory && !selectedTag
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`${pathname}?${createQueryString('category', category)}`}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Popular Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 10).map((tag) => (
              <Link
                key={tag}
                href={`${pathname}?${createQueryString('tag', tag)}`}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                  selectedTag === tag
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
