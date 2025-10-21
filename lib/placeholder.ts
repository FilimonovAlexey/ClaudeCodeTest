/**
 * Placeholder image component
 * Generates colored placeholder images for blog posts
 */
export function PlaceholderImage({
  category,
  width = 1200,
  height = 630
}: {
  category: string;
  width?: number;
  height?: number;
}) {
  // Generate consistent colors based on category
  const colors: Record<string, { from: string; to: string }> = {
    'Next.js': { from: '#000000', to: '#333333' },
    'TypeScript': { from: '#3178c6', to: '#235a97' },
    'React': { from: '#61dafb', to: '#21a1c4' },
    'CSS': { from: '#1572b6', to: '#33a9dc' },
    'Web': { from: '#f06529', to: '#e44d26' },
    'AI': { from: '#10a37f', to: '#0e8c6f' },
    'Tutorial': { from: '#7c3aed', to: '#5b21b6' },
    'default': { from: '#6366f1', to: '#4f46e5' },
  };

  const color = colors[category] || colors.default;

  // Create data URI for gradient
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color.from};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color.to};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)" />
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle" opacity="0.3">${category}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// Export pre-generated placeholder URLs for each category
export const placeholders = {
  'Next.js': PlaceholderImage({ category: 'Next.js' }),
  'TypeScript': PlaceholderImage({ category: 'TypeScript' }),
  'React': PlaceholderImage({ category: 'React' }),
  'CSS': PlaceholderImage({ category: 'CSS' }),
  'Web': PlaceholderImage({ category: 'Web' }),
  'AI': PlaceholderImage({ category: 'AI' }),
  'Tutorial': PlaceholderImage({ category: 'Tutorial' }),
};
