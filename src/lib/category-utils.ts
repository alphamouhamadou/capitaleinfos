// Category-related utilities extracted from data.ts
// This file is separate to avoid Turbopack bundling issues on Vercel

export type Category =
  | 'Politique'
  | 'Économie'
  | 'Sport'
  | 'Culture'
  | 'Société'
  | 'International'
  | 'Environnement';

export const categories: Category[] = [
  'Politique',
  'Économie',
  'Sport',
  'Culture',
  'Société',
  'International',
  'Environnement',
];

export const categoryColors: Record<string, string> = {
  'Politique': 'bg-red-100 text-red-700',
  'Économie': 'bg-amber-100 text-amber-700',
  'Sport': 'bg-green-100 text-green-700',
  'Culture': 'bg-purple-100 text-purple-700',
  'Société': 'bg-teal-100 text-teal-700',
  'International': 'bg-orange-100 text-orange-700',
  'Environnement': 'bg-emerald-100 text-emerald-700',
};

/**
 * Safe helper to get a category color class string.
 * Returns a neutral fallback for unknown categories instead of undefined.
 */
export function getCategoryColor(category: string): string {
  return categoryColors[category] || 'bg-muted text-muted-foreground';
}
