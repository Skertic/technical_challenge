import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PRODUCT_FIXTURE } from '../../../testing/product.fixture';
import { Product } from '../models/product.model';
import { ProductApiService } from './product-api.service';

describe('ProductApiService', () => {
  let service: ProductApiService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductApiService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpController.verify());

  it('loads the product catalog from the centralized endpoint', () => {
    let products: readonly Product[] = [];
    service.getProducts().subscribe((response) => (products = response));

    const request = httpController.expectOne('https://fakestoreapi.com/products');
    expect(request.request.method).toBe('GET');
    request.flush([PRODUCT_FIXTURE]);
    expect(products).toEqual([PRODUCT_FIXTURE]);
  });

  it('posts a typed creation payload', () => {
    const payload = {
      title: 'Desk lamp',
      price: 32.5,
      description: 'A dimmable desk lamp for focused work.',
      category: 'electronics',
      image: 'https://example.com/lamp.jpg',
    };
    service.createProduct(payload).subscribe();

    const request = httpController.expectOne('https://fakestoreapi.com/products');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(payload);
    request.flush({ ...payload, id: 21 });
  });
});
