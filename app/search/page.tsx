'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
import { SearchResult } from '@/types/blog';
import { CategoryBadge } from '@/components/blog/CategoryBadge';

/**
 * Search page
 * Search through blog posts
 */
export default function SearchPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const initialQuery = searchParams.get('q');
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();

      if (response.ok) {
        setResults(data.results);
      } else {
        console.error('Search error:', data.error);
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Search
        </h1>
        <p className="text-lg text-muted-foreground">
          Find articles, tutorials, and insights
        </p>
      </div>

      {/* Search form */}
      <form onSubmit={handleSubmit} className="mb-12">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for articles..."
            className="w-full rounded-lg border border-border bg-background py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </form>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Results */}
      {!loading && searched && (
        <div>
          <p className="mb-6 text-sm text-muted-foreground">
            {results.length} result{results.length !== 1 ? 's' : ''} found
            {query && ` for "${query}"`}
          </p>

          {results.length > 0 ? (
            <div className="space-y-6">
              {results.map((result) => (
                <Link
                  key={result.slug}
                  href={`/blog/${result.slug}`}
                  className="block rounded-lg border border-border p-6 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="mb-2">
                    <CategoryBadge category={result.category} />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold hover:text-primary">
                    {result.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {result.description}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">
                No results found. Try different keywords.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!loading && !searched && (
        <div className="py-12 text-center">
          <SearchIcon className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
          <p className="text-lg text-muted-foreground">
            Enter a search query to find articles
          </p>
        </div>
      )}
    </div>
  );
}
