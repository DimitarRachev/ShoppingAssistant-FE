export const CITIES_QUERY_KEY = ['cities'] as const;
export const PRODUCTS_QUERY_KEY = ['products'] as const;
export const PRODUCT_SEARCH_QUERY_KEY = (query: string) => ['products', 'search', query] as const;
export const PRODUCT_QUERY_KEY = (id: number) => ['products', id] as const;
export const PRICES_QUERY_KEY = (cityId: number, productId: number) => ['prices', cityId, productId] as const;
export const BASKET_COMPARE_QUERY_KEY = ['basket', 'compare'] as const;
export const BASKET_OPTIMIZE_QUERY_KEY = ['basket', 'optimize'] as const;