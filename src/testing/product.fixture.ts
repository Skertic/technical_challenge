import { Product } from '../app/core/models/product.model';

export const PRODUCT_FIXTURE: Product = {
  id: 1,
  title: 'Everyday backpack',
  price: 49.95,
  description: 'A durable everyday backpack with enough room for a laptop and daily essentials.',
  category: "men's clothing",
  image: 'https://example.com/backpack.jpg',
  rating: {
    rate: 4.4,
    count: 120,
  },
};

export const SECOND_PRODUCT_FIXTURE: Product = {
  id: 2,
  title: 'Silver bracelet',
  price: 29.5,
  description: 'A polished silver bracelet designed for everyday wear.',
  category: 'jewelery',
  image: 'https://example.com/bracelet.jpg',
  rating: {
    rate: 3.8,
    count: 48,
  },
};
