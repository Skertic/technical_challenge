import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { EmptyState, ErrorState, PageHeader } from '../../../../shared/components';
import { ProductListFacade } from '../../facades';
import { ProductCard } from '../../ui/product-card/product-card';

@Component({
  selector: 'app-product-list-page',
  imports: [
    FormsModule,
    RouterLink,
    ButtonModule,
    MessageModule,
    SelectModule,
    SkeletonModule,
    PageHeader,
    ProductCard,
    ErrorState,
    EmptyState,
  ],
  providers: [ProductListFacade],
  templateUrl: './product-list-page.html',
  styleUrl: './product-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListPage {
  readonly #productListFacade = inject(ProductListFacade);

  protected readonly productsResult = this.#productListFacade.productsResult;
  protected readonly categoriesResult = this.#productListFacade.categoriesResult;
  protected readonly filteredProducts = this.#productListFacade.filteredProducts;
  protected readonly searchTerm = this.#productListFacade.searchTerm;
  protected readonly selectedCategory = this.#productListFacade.selectedCategory;
  protected readonly sortOrder = this.#productListFacade.sortOrder;
  protected readonly categoryOptions = this.#productListFacade.categoryOptions;
  protected readonly sortOptions = this.#productListFacade.sortOptions;

  protected readonly updateSearch = (value: string): void => this.#productListFacade.updateSearch(value);
  protected readonly updateCategory = (value: unknown): void => this.#productListFacade.updateCategory(value);
  protected readonly updateSort = (value: unknown): void => this.#productListFacade.updateSort(value);
  protected readonly resetFilters = (): void => this.#productListFacade.resetFilters();
  protected readonly retryProducts = (): void => this.#productListFacade.retryProducts();
  protected readonly retryCategories = (): void => this.#productListFacade.retryCategories();
}
