import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CreateProductRequest } from '../../../../core/models/product.model';
import { PageHeader } from '../../../../shared/components';
import { ProductCreateFacade } from '../../facades';
import { ProductForm } from '../../ui/product-form/product-form';

@Component({
  selector: 'app-product-create-page',
  imports: [RouterLink, ButtonModule, MessageModule, PageHeader, ProductForm],
  providers: [ProductCreateFacade],
  templateUrl: './product-create-page.html',
  styleUrl: './product-create-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCreatePage {
  readonly #productCreateFacade = inject(ProductCreateFacade);

  protected readonly categoriesResult = this.#productCreateFacade.categoriesResult;
  protected readonly createResult = this.#productCreateFacade.createResult;
  protected readonly createdProduct = this.#productCreateFacade.createdProduct;
  protected readonly createProduct = (product: CreateProductRequest): void =>
    this.#productCreateFacade.createProduct(product);
  protected readonly retryCategories = (): void => this.#productCreateFacade.retryCategories();
}
