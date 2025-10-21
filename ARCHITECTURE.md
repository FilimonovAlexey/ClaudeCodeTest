# Architecture Documentation

## Overview

This is a modern, high-performance blog built with Next.js 14+ App Router, featuring Server Components, MDX support, and a minimalist design.

## Key Technologies

- **Next.js 14+**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **MDX**: Markdown with JSX for content
- **next-themes**: Dark mode support

## Project Structure

### `/app` - Next.js App Router

- **`layout.tsx`**: Root layout with theme provider and navigation
- **`page.tsx`**: Home page with featured and recent posts
- **`globals.css`**: Global styles and theme variables
- **`/blog`**: Blog section
  - **`page.tsx`**: Blog listing with category/tag filtering
  - **`/[slug]/page.tsx`**: Individual blog post with TOC and related posts
- **`/api/search`**: Search API endpoint
- **`/about`**: About page
- **`sitemap.ts`**: Auto-generated sitemap
- **`robots.ts`**: Robots.txt configuration

### `/components` - React Components

#### UI Components (`/ui`)
- **`Header.tsx`**: Main navigation with search and theme toggle
- **`Footer.tsx`**: Site footer with links and social media
- **`Card.tsx`**: Reusable card component with variants

#### Blog Components (`/blog`)
- **`BlogCard.tsx`**: Post preview card with image, metadata, and tags
- **`CategoryBadge.tsx`**: Colored category badges
- **`CategoryFilter.tsx`**: Category and tag filtering UI
- **`TableOfContents.tsx`**: Auto-generated TOC with active highlighting
- **`ShareButtons.tsx`**: Social sharing buttons

#### Theme Components
- **`theme-provider.tsx`**: Theme provider wrapper
- **`theme-toggle.tsx`**: Dark/light mode toggle button

### `/lib` - Utilities

- **`blog.ts`**: Blog post management
  - Get all posts, by slug, by category, by tag
  - Search functionality
  - Related posts
  - Table of contents extraction
  - Pagination
- **`utils.ts`**: General utilities
  - Class name merging (`cn`)
  - Date formatting
  - Text truncation
  - Slugification

### `/types` - TypeScript Types

- **`blog.ts`**: Blog-related type definitions
  - `BlogPost`: Complete post data
  - `BlogFrontmatter`: MDX frontmatter structure
  - `TocItem`: Table of contents items
  - `SearchResult`: Search result format

### `/content/posts` - Blog Content

MDX files with frontmatter:
- `getting-started-with-nextjs-14.mdx`
- `mastering-typescript-advanced-types.mdx`
- `react-server-components-deep-dive.mdx`
- `css-modern-layouts.mdx`
- `web-performance-optimization.mdx`
- `building-accessible-web-apps.mdx`

## Data Flow

### Blog Post Rendering

1. **Static Generation**: Posts are statically generated at build time
2. **File System**: MDX files stored in `/content/posts`
3. **Gray Matter**: Frontmatter parsed to extract metadata
4. **Reading Time**: Calculated automatically
5. **MDX Rendering**: Server-side with rehype/remark plugins
6. **Streaming**: Content streamed to client with Suspense

### Search Flow

1. User enters query in search page
2. Client makes GET request to `/api/search`
3. Server searches through all posts
4. Results returned as JSON
5. Client displays results with links

## Performance Optimizations

### Server Components

- Default rendering strategy
- Zero JavaScript for static content
- Direct data fetching on server

### Image Optimization

- `next/image` for automatic optimization
- AVIF and WebP formats
- Responsive sizes
- Lazy loading

### Code Splitting

- Automatic route-based splitting
- Dynamic imports for heavy components
- Minimal client-side JavaScript

### Caching

- Static page generation
- Request memoization
- Data cache with revalidation

## SEO Features

### Metadata

- Per-page metadata with Next.js Metadata API
- Open Graph tags for social sharing
- Twitter Cards
- Structured data ready

### Sitemap

- Auto-generated from blog posts
- Includes all routes
- Updated automatically

### Performance

- Core Web Vitals optimized
- Fast Time to Interactive
- Minimal Cumulative Layout Shift

## Styling System

### Tailwind CSS

- Utility-first approach
- Custom color scheme with CSS variables
- Dark mode via class strategy
- Typography plugin for prose

### Theme Variables

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... */
}
```

### Dark Mode

- Automatic system preference detection
- Manual toggle
- Persistent user preference
- Smooth transitions

## Content Management

### Writing Posts

1. Create MDX file in `/content/posts`
2. Add frontmatter with metadata
3. Write content in Markdown
4. Posts automatically indexed

### Frontmatter Schema

```yaml
title: string          # Required
description: string    # Required
date: string          # Required (YYYY-MM-DD)
author:               # Required
  name: string
  avatar: string      # Optional
coverImage: string    # Required
category: string      # Required
tags: string[]        # Required
featured: boolean     # Optional
```

## Deployment

### Build Process

1. `npm run build` - Build production bundle
2. Static pages generated
3. API routes compiled
4. Assets optimized

### Environment Variables

See `.env.example` for configuration options:
- Site URL
- Site name
- Analytics IDs
- Contact information

## Future Enhancements

Potential improvements:
- RSS feed generation
- Newsletter integration
- Comment system
- View tracking
- Reading progress indicator
- Copy code button
- Multi-author support
- Tag pages
- Archive page
- Related posts refinement
