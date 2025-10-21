import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

/**
 * Card component
 * Reusable card container with variants
 */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover';
}

export function Card({
  className,
  variant = 'default',
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-card text-card-foreground shadow-sm',
        variant === 'hover' &&
          'transition-all duration-300 hover:shadow-lg hover:border-primary/50',
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6', className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-6 pb-6', className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center px-6 pb-6', className)}
      {...props}
    />
  );
}
