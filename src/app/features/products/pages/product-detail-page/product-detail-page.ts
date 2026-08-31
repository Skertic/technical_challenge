import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { EmptyState, ErrorState } from '../../../../shared/components';
import { ProductDetailFacade } from '../../facades';

@Component({
  selector: 'app-product-detail-page',
  imports: [
    CurrencyPipe,
    DecimalPipe,
    RouterLink,
    DividerModule,
    SkeletonModule,
    TagModule,
    ErrorState,
    EmptyState,
  ],
  providers: [ProductDetailFacade],
  templateUrl: './product-detail-page.html',
  styleUrl: './product-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailPage {
  readonly #productDetailFacade = inject(ProductDetailFacade);

  protected readonly productId = this.#productDetailFacade.productId;
  protected readonly productResult = this.#productDetailFacade.productResult;
  protected readonly retry = (): void => this.#productDetailFacade.retry();
}
