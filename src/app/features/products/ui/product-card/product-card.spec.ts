import { provideLocationMocks } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PRODUCT_FIXTURE } from '../../../../../testing/product.fixture';
import { ProductCard } from './product-card';

describe('ProductCard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
      providers: [provideRouter([]), provideLocationMocks()],
    }).compileComponents();
  });

  it('renders formatted product information and a detail link', () => {
    const fixture = TestBed.createComponent(ProductCard);
    fixture.componentRef.setInput('product', PRODUCT_FIXTURE);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain(PRODUCT_FIXTURE.title);
    expect(element.textContent).toContain('$49.95');
    expect(element.textContent).toContain(PRODUCT_FIXTURE.category);
    expect(element.querySelector<HTMLAnchorElement>('.details-link')?.getAttribute('href')).toBe(
      '/products/1',
    );
  });
});
