import { NextRequest, NextResponse } from 'next/server';
import { searchPosts } from '@/lib/blog';
import { SearchResult } from '@/types/blog';

/**
 * Search API endpoint
 * Searches blog posts by query
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query || query.trim().length === 0) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    );
  }

  try {
    const posts = await searchPosts(query);

    // Map to search result format
    const results: SearchResult[] = posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      category: post.category,
    }));

    return NextResponse.json({ results, count: results.length });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
