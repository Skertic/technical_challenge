import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    title: 'Products | Product Catalog',
    loadComponent: () =>
      import('./pages/product-list-page/product-list-page').then(
        (module) => module.ProductListPage,
      ),
  },
  {
    path: 'new',
    title: 'Add Product | Product Catalog',
    loadComponent: () =>
      import('./pages/product-create-page/product-create-page').then(
        (module) => module.ProductCreatePage,
      ),
  },
  {
    path: ':id',
    title: 'Product Details | Product Catalog',
    loadComponent: () =>
      import('./pages/product-detail-page/product-detail-page').then(
        (module) => module.ProductDetailPage,
      ),
  },
];
