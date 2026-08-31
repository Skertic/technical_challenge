import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { createPendingObserverResult, createSuccessObserverResult } from '@ngneat/query';
import { PRODUCT_FIXTURE, SECOND_PRODUCT_FIXTURE } from '../../../../../testing/product.fixture';
import { ProductQueries } from '../../data-access/product.queries';
import { ProductListPage } from './product-list-page';

describe('ProductListPage', () => {
  it('shows skeletons while products are loading', async () => {
    await configurePage(createPendingObserverResult());
    const fixture = TestBed.createComponent(ProductListPage);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).querySelectorAll('.skeleton-card')).toHaveLength(
      8,
    );
  });

  it('renders products and filters by title or category', async () => {
    await configurePage(createSuccessObserverResult([PRODUCT_FIXTURE, SECOND_PRODUCT_FIXTURE]));
    const fixture = TestBed.createComponent(ProductListPage);
    fixture.detectChanges();

    expect(
      (fixture.nativeElement as HTMLElement).querySelectorAll('app-product-card'),
    ).toHaveLength(2);

    const searchInput = (fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>(
      '#product-search',
    );
    if (!searchInput) {
      throw new Error('Expected the product search input to be rendered.');
    }
    searchInput.value = 'jewelery';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('app-product-card')).toHaveLength(1);
    expect(element.textContent).toContain(SECOND_PRODUCT_FIXTURE.title);
  });

  it('shows a retryable error state', async () => {
    const errorResult = {
      ...createPendingObserverResult(),
      error: new Error('Network error'),
      isError: true,
      isLoading: false,
      isPending: false,
      status: 'error' as const,
    };
    await configurePage(errorResult);
    const fixture = TestBed.createComponent(ProductListPage);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      "We couldn't load the products",
    );
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Try again');
  });
});

async function configurePage(productsResult: object): Promise<void> {
  TestBed.resetTestingModule();
  await TestBed.configureTestingModule({
    imports: [ProductListPage],
    providers: [
      provideRouter([]),
      {
        provide: ProductQueries,
        useValue: {
          products: () => ({ result: signal(productsResult) }),
          categories: () => ({
            result: signal(createSuccessObserverResult(["men's clothing", 'jewelery'])),
          }),
        },
      },
    ],
  }).compileComponents();
}
