import { inject, Injectable, signal } from '@angular/core';
import { CreateProductRequest, CreatedProduct } from '../../../core/models/product.model';
import { ProductMutations, ProductQueries } from '../data-access/product.queries';

@Injectable()
export class ProductCreateFacade {
  readonly #productQueries = inject(ProductQueries);
  readonly #productMutations = inject(ProductMutations);
  readonly #categoriesQuery = this.#productQueries.categories();
  readonly #createMutation = this.#productMutations.createProduct();
  readonly #createdProduct = signal<CreatedProduct | null>(null);

  readonly categoriesResult = this.#categoriesQuery.result;
  readonly createResult = this.#createMutation.result;
  readonly createdProduct = this.#createdProduct.asReadonly();

  createProduct(product: CreateProductRequest): void {
    if (this.createResult().isPending) {
      return;
    }

    this.#createdProduct.set(null);
    this.#createMutation.mutate(product, {
      onSuccess: (createdProduct) => this.#createdProduct.set(createdProduct),
    });
  }

  retryCategories(): void {
    void this.categoriesResult().refetch();
  }
}
