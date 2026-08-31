import { inject, Injectable } from '@angular/core';
import { injectMutation, injectQuery } from '@ngneat/query';
import { ProductApiService } from '../../../core/api/product-api.service';
import { CreateProductRequest } from '../../../core/models/product.model';

const FIVE_MINUTES = 5 * 60 * 1000;

export const productQueryKeys = {
  all: ['products'] as const,
  list: () => [...productQueryKeys.all, 'list'] as const,
  detail: (id: number | null) => [...productQueryKeys.all, 'detail', id] as const,
  categories: () => [...productQueryKeys.all, 'categories'] as const,
};

@Injectable({ providedIn: 'root' })
export class ProductQueries {
  readonly #api = inject(ProductApiService);
  readonly #useQuery = injectQuery();

  products() {
    return this.#useQuery({
      queryKey: productQueryKeys.list(),
      queryFn: () => this.#api.getProducts(),
      staleTime: FIVE_MINUTES,
    });
  }

  product(id: number | null) {
    return this.#useQuery({
      queryKey: productQueryKeys.detail(id),
      queryFn: () => this.#api.getProduct(id ?? 0),
      enabled: id !== null,
      staleTime: FIVE_MINUTES,
    });
  }

  categories() {
    return this.#useQuery({
      queryKey: productQueryKeys.categories(),
      queryFn: () => this.#api.getCategories(),
      staleTime: FIVE_MINUTES,
    });
  }
}

@Injectable({ providedIn: 'root' })
export class ProductMutations {
  readonly #api = inject(ProductApiService);
  readonly #useMutation = injectMutation();

  createProduct() {
    return this.#useMutation({
      mutationKey: [...productQueryKeys.all, 'create'],
      mutationFn: (product: CreateProductRequest) => this.#api.createProduct(product),
    });
  }
}
