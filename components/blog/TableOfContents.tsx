'use client';

import { useEffect, useState } from 'react';
import { TocItem } from '@/types/blog';
import { cn } from '@/lib/utils';

/**
 * TableOfContents component
 * Displays a table of contents with active section highlighting
 */
interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    // Observe all headings
    items.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-auto lg:block">
      <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
        Table of Contents
      </h4>
      <ul className="space-y-2 border-l-2 border-border">
        {items.map((item) => {
          const isActive = activeId === item.id;
          const paddingLeft = `${(item.level - 2) * 0.75}rem`;

          return (
            <li key={item.id} style={{ paddingLeft }}>
              <a
                href={`#${item.id}`}
                className={cn(
                  'block border-l-2 py-1 pl-4 text-sm transition-colors hover:text-foreground',
                  isActive
                    ? 'border-primary text-foreground font-medium'
                    : 'border-transparent text-muted-foreground'
                )}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
