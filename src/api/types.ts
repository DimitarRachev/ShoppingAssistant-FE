// API Types based on actual backend responses

export interface City {
  id: number;
  nameBg: string;
  nameEn: string;
  municipalityBg: string;
  municipalityEn: string;
  regionBg: string;
  regionEn: string;
}

export interface CitiesResponse {
  items: City[];
}

export interface Product {
  id: number;
  nameBg: string;
  nameEn: string;
  groupBg: string;
  groupEn: string;
}

export interface ProductsResponse {
  items: Product[];
}

export interface Store {
  id: number;
  nameBg: string;
  nameEn: string;
}

export interface Price {
  store: Store;
  value: number;
  currency: string;
}

export interface PricesResponse {
  city: City;
  product: Product;
  prices: Price[];
}

export interface BasketItem {
  productId: number;
  quantity: number;
}

export interface BasketItemWithPrice {
  productId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface SingleStoreResult {
  store: Store;
  total: number;
  items: BasketItemWithPrice[];
}

export interface BasketCompareRequest {
  cityId: number;
  items: BasketItem[];
}

export interface BasketCompareResponse {
  city: City;
  cheapestSingleStore: SingleStoreResult;
}

export interface StoreWithItems {
  store: Store;
  total: number;
  items: BasketItemWithPrice[];
}

export interface OptimizedBasketResult {
  total: number;
  stores: StoreWithItems[];
  savings: number;
}

export interface BasketOptimizeRequest {
  cityId: number;
  maxStores: number;
  items: BasketItem[];
}

export interface BasketOptimizeResponse {
  city: City;
  maxStores: number;
  cheapestSingleStore: SingleStoreResult;
  optimizedBasket: OptimizedBasketResult;
}