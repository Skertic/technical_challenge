import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { createSuccessObserverResult } from '@ngneat/query';
import { PRODUCT_FIXTURE } from '../../../../../testing/product.fixture';
import { ProductQueries } from '../../data-access/product.queries';
import { parseProductId } from '../../facades';
import { ProductDetailPage } from './product-detail-page';

describe('ProductDetailPage', () => {
  it('renders the complete product data', async () => {
    await configureDetail(PRODUCT_FIXTURE, '1');
    const fixture = TestBed.createComponent(ProductDetailPage);
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain(PRODUCT_FIXTURE.title);
    expect(text).toContain(PRODUCT_FIXTURE.description);
    expect(text).toContain('$49.95');
    expect(text).toContain('120 ratings');
  });

  it('shows a not-found state when the API has no product', async () => {
    await configureDetail(null, '999');
    const fixture = TestBed.createComponent(ProductDetailPage);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Product not found');
  });

  it('rejects invalid route ids', () => {
    expect(parseProductId('not-a-number')).toBeNull();
    expect(parseProductId('-2')).toBeNull();
    expect(parseProductId('2')).toBe(2);
  });
});

async function configureDetail(product: typeof PRODUCT_FIXTURE | null, id: string): Promise<void> {
  TestBed.resetTestingModule();
  await TestBed.configureTestingModule({
    imports: [ProductDetailPage],
    providers: [
      provideRouter([]),
      {
        provide: ActivatedRoute,
        useValue: { snapshot: { paramMap: convertToParamMap({ id }) } },
      },
      {
        provide: ProductQueries,
        useValue: {
          product: () => ({ result: signal(createSuccessObserverResult(product)) }),
        },
      },
    ],
  }).compileComponents();
}
