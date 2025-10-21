# TechBlog - Modern Next.js Blog

A modern, high-performance technology blog built with Next.js 14+, featuring Server Components, MDX support, and a beautiful, minimalist design inspired by Wylsa.com.

![TechBlog](https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=630&fit=crop)

## Features

- **Next.js 14+ with App Router** - Leveraging the latest React Server Components
- **TypeScript** - Full type safety throughout the application
- **MDX Support** - Write blog posts in Markdown with React components
- **Dark Mode** - Beautiful dark theme with `next-themes`
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **SEO Optimized** - Auto-generated sitemap, metadata, and Open Graph tags
- **Search Functionality** - Fast client-side search across all posts
- **Category & Tag Filtering** - Easy content discovery
- **Table of Contents** - Auto-generated for blog posts
- **Reading Time** - Estimated reading time for each article
- **Related Posts** - Smart recommendations based on tags and categories
- **Social Sharing** - Built-in sharing buttons for social media
- **Performance** - Optimized images, code splitting, and caching
- **Syntax Highlighting** - Beautiful code blocks with `rehype-highlight`

## Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: [MDX](https://mdxjs.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/tech-blog-nextjs.git
cd tech-blog-nextjs
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                      # Next.js App Router
│   ├── blog/                # Blog pages
│   │   ├── [slug]/         # Individual blog post
│   │   └── page.tsx        # Blog listing
│   ├── api/                # API routes
│   │   └── search/         # Search endpoint
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/              # React components
│   ├── blog/               # Blog-specific components
│   │   ├── BlogCard.tsx
│   │   ├── CategoryBadge.tsx
│   │   ├── TableOfContents.tsx
│   │   └── ShareButtons.tsx
│   └── ui/                 # UI components
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Card.tsx
├── content/                 # Blog content
│   └── posts/              # MDX blog posts
│       └── *.mdx
├── lib/                     # Utility functions
│   ├── blog.ts             # Blog utilities
│   └── utils.ts            # General utilities
├── types/                   # TypeScript types
│   └── blog.ts
└── public/                  # Static assets
    └── images/
```

## Creating Blog Posts

Create a new MDX file in `content/posts/` with the following frontmatter:

```mdx
---
title: 'Your Post Title'
description: 'A brief description of your post'
date: '2024-01-15'
author:
  name: 'Your Name'
  avatar: 'https://example.com/avatar.jpg'
coverImage: 'https://example.com/cover.jpg'
category: 'Category Name'
tags: ['tag1', 'tag2', 'tag3']
featured: false
---

## Your Content Here

Write your blog post content using Markdown and React components.
```

### Frontmatter Fields

- `title` - Post title (required)
- `description` - Brief description for SEO and previews (required)
- `date` - Publication date in YYYY-MM-DD format (required)
- `author` - Author information with name and optional avatar (required)
- `coverImage` - URL to cover image (required)
- `category` - Post category (required)
- `tags` - Array of tags (required)
- `featured` - Whether to feature on homepage (optional, default: false)

## Customization

### Colors

Edit the CSS variables in `app/globals.css` to customize the color scheme:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --background: 0 0% 100%;
  /* ... */
}
```

### Typography

Modify the font in `app/layout.tsx`:

```typescript
import { YourFont } from 'next/font/google';

const yourFont = YourFont({
  subsets: ['latin'],
  display: 'swap',
});
```

### Site Metadata

Update site information in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Your Blog Name',
  description: 'Your blog description',
  // ...
};
```

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/tech-blog-nextjs)

### Other Platforms

This is a standard Next.js application and can be deployed to:

- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Railway](https://railway.app/)
- Any Node.js hosting platform

## Performance

This blog is optimized for performance:

- **Server Components** - Reduced JavaScript bundle size
- **Image Optimization** - Automatic image optimization with next/image
- **Code Splitting** - Automatic code splitting by route
- **Static Generation** - Pre-rendered pages for fast loading
- **ISR** - Incremental Static Regeneration for dynamic content

## SEO Features

- Auto-generated sitemap at `/sitemap.xml`
- Robots.txt configuration
- Open Graph metadata for social sharing
- Twitter Card support
- Semantic HTML structure
- Structured data (coming soon)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Design inspired by [Wylsa.com](https://wylsa.com)
- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Contact us at support@techblog.com
- Join our community Discord (coming soon)

---

Made with ❤️ by the TechBlog Team
