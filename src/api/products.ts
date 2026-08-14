import { request } from './client';
import type { ProductsResponse, Product } from './types';

export const productsApi = {
  getProducts: async (): Promise<Product[]> => {
    const response = await request<ProductsResponse>('/products');
    return response.items;
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await request<ProductsResponse>(`/products?q=${query}`);
    return response.items;
  },

  getProduct: async (productId: number): Promise<Product> => {
    return request<Product>(`/products/${productId}`);
  },
};