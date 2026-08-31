import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { createSuccessObserverResult } from '@ngneat/query';
import { CreateProductRequest, CreatedProduct } from '../../../../core/models/product.model';
import { ProductMutations, ProductQueries } from '../../data-access/product.queries';
import { ProductForm } from '../../ui/product-form/product-form';
import { ProductCreatePage } from './product-create-page';

describe('ProductCreatePage', () => {
  it('shows an explicit simulated-success message after mutation success', async () => {
    const mutationResult = signal({
      ...createSuccessObserverResult<CreatedProduct | undefined>(undefined),
      isSuccess: false,
      status: 'idle' as const,
    });

    await TestBed.configureTestingModule({
      imports: [ProductCreatePage],
      providers: [
        provideRouter([]),
        {
          provide: ProductQueries,
          useValue: {
            categories: () => ({
              result: signal(createSuccessObserverResult(['electronics'])),
            }),
          },
        },
        {
          provide: ProductMutations,
          useValue: {
            createProduct: () => ({
              result: mutationResult,
              mutate: (
                product: CreateProductRequest,
                options?: { readonly onSuccess?: (created: CreatedProduct) => void },
              ) => options?.onSuccess?.({ ...product, id: 21 }),
            }),
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(ProductCreatePage);
    const request: CreateProductRequest = {
      title: 'Desk lamp',
      price: 32.5,
      description: 'A dimmable desk lamp for focused work.',
      category: 'electronics',
      image: 'https://example.com/lamp.jpg',
    };
    fixture.debugElement
      .query(By.directive(ProductForm))
      .componentInstance.productSubmit.emit(request);
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('accepted by the API as product #21');
    expect(text).toContain('simulated creation');
  });
});
