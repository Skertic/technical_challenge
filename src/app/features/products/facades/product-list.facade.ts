import { computed, inject, Injectable, signal } from '@angular/core';
import { ProductQueries } from '../data-access/product.queries';
import { isSortOrder, type SortOrder } from './helpers/sort-order.helper';

interface FilterOption<T> {
  readonly label: string;
  readonly value: T;
}

@Injectable()
export class ProductListFacade {
  readonly #productQueries = inject(ProductQueries);
  readonly #productsQuery = this.#productQueries.products();
  readonly #categoriesQuery = this.#productQueries.categories();
  readonly #searchTerm = signal('');
  readonly #selectedCategory = signal<string | null>(null);
  readonly #sortOrder = signal<SortOrder>('featured');

  readonly productsResult = this.#productsQuery.result;
  readonly categoriesResult = this.#categoriesQuery.result;
  readonly searchTerm = this.#searchTerm.asReadonly();
  readonly selectedCategory = this.#selectedCategory.asReadonly();
  readonly sortOrder = this.#sortOrder.asReadonly();

  readonly categoryOptions = computed<FilterOption<string | null>[]>(() => [
    { label: 'All categories', value: null },
    ...(this.categoriesResult().data ?? []).map((category) => ({
      label: category,
      value: category,
    })),
  ]);

  readonly sortOptions: FilterOption<SortOrder>[] = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: low to high', value: 'price-asc' },
    { label: 'Price: high to low', value: 'price-desc' },
    { label: 'Rating: high to low', value: 'rating-desc' },
  ];

  readonly filteredProducts = computed(() => {
    const search = this.#searchTerm().trim().toLocaleLowerCase();
    const category = this.#selectedCategory();
    const products = (this.productsResult().data ?? []).filter((product) => {
      const matchesSearch =
        !search ||
        product.title.toLocaleLowerCase().includes(search) ||
        product.category.toLocaleLowerCase().includes(search);
      return matchesSearch && (!category || product.category === category);
    });

    return [...products].sort((first, second) => {
      switch (this.#sortOrder()) {
        case 'price-asc':
          return first.price - second.price;
        case 'price-desc':
          return second.price - first.price;
        case 'rating-desc':
          return second.rating.rate - first.rating.rate;
        default:
          return 0;
      }
    });
  });

  updateSearch(value: string): void {
    this.#searchTerm.set(value);
  }

  updateCategory(value: unknown): void {
    this.#selectedCategory.set(typeof value === 'string' ? value : null);
  }

  updateSort(value: unknown): void {
    if (isSortOrder(value)) {
      this.#sortOrder.set(value);
    }
  }

  resetFilters(): void {
    this.#searchTerm.set('');
    this.#selectedCategory.set(null);
    this.#sortOrder.set('featured');
  }

  retryProducts(): void {
    void this.productsResult().refetch();
  }

  retryCategories(): void {
    void this.categoriesResult().refetch();
  }
}
