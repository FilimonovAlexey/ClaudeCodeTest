/**
 * Blog post metadata interface
 * Contains all frontmatter data for blog posts
 */
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: {
    name: string;
    avatar?: string;
  };
  coverImage: string;
  category: string;
  tags: string[];
  readingTime: string;
  featured?: boolean;
  content?: string;
}

/**
 * Blog frontmatter interface
 * Data extracted from MDX frontmatter
 */
export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  author: {
    name: string;
    avatar?: string;
  };
  coverImage: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

/**
 * Table of contents item
 */
export interface TocItem {
  id: string;
  title: string;
  level: number;
}

/**
 * Search result interface
 */
export interface SearchResult {
  slug: string;
  title: string;
  description: string;
  category: string;
}
