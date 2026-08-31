import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductQueries } from '../data-access/product.queries';

@Injectable()
export class ProductDetailFacade {
  readonly #route = inject(ActivatedRoute);
  readonly #productQueries = inject(ProductQueries);

  readonly productId = parseProductId(this.#route.snapshot.paramMap.get('id'));
  readonly #productQuery = this.#productQueries.product(this.productId);
  readonly productResult = this.#productQuery.result;

  retry(): void {
    void this.productResult().refetch();
  }
}

export function parseProductId(value: string | null): number | null {
  if (value === null || value.trim() === '') {
    return null;
  }

  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}
