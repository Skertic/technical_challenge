export type SortOrder = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc';

export function isSortOrder(value: unknown): value is SortOrder {
  return (
    value === 'featured' ||
    value === 'price-asc' ||
    value === 'price-desc' ||
    value === 'rating-desc'
  );
}
