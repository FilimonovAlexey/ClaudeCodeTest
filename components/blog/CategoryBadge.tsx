import { cn } from '@/lib/utils';

/**
 * CategoryBadge component
 * Displays a colored badge for blog post categories
 */
interface CategoryBadgeProps {
  category: string;
  className?: string;
}

const categoryColors: Record<string, string> = {
  JavaScript: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
  TypeScript: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  React: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400',
  'Next.js': 'bg-black/10 text-black dark:bg-white/10 dark:text-white',
  CSS: 'bg-pink-500/10 text-pink-700 dark:text-pink-400',
  DevOps: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
  AI: 'bg-green-500/10 text-green-700 dark:text-green-400',
  Web: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
  Tutorial: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400',
  default: 'bg-gray-500/10 text-gray-700 dark:text-gray-400',
};

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const colorClass = categoryColors[category] || categoryColors.default;

  return (
    <span
      className={cn(
        'inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        colorClass,
        className
      )}
    >
      {category}
    </span>
  );
}
