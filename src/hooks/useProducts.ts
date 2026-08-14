import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../api/products';
import { PRODUCTS_QUERY_KEY, PRODUCT_SEARCH_QUERY_KEY, PRODUCT_QUERY_KEY } from '../lib/query-keys';

export function useProducts() {
  return useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: productsApi.getProducts,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useProductSearch(query: string, enabled: boolean = true) {
  return useQuery({
    queryKey: PRODUCT_SEARCH_QUERY_KEY(query),
    queryFn: () => productsApi.searchProducts(query),
    enabled: enabled && query.length >= 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useProduct(productId: number, enabled: boolean = true) {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEY(productId),
    queryFn: () => productsApi.getProduct(productId),
    enabled: enabled && productId > 0,
  });
}