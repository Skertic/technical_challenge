import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProductRequest, CreatedProduct, Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductApiService {
  readonly #http = inject(HttpClient);
  readonly #productsUrl = 'https://fakestoreapi.com/products';

  getProducts(): Observable<readonly Product[]> {
    return this.#http.get<readonly Product[]>(this.#productsUrl);
  }

  getProduct(id: number): Observable<Product | null> {
    return this.#http.get<Product | null>(`${this.#productsUrl}/${id}`);
  }

  getCategories(): Observable<readonly string[]> {
    return this.#http.get<readonly string[]>(`${this.#productsUrl}/categories`);
  }

  createProduct(product: CreateProductRequest): Observable<CreatedProduct> {
    return this.#http.post<CreatedProduct>(this.#productsUrl, product);
  }
}
