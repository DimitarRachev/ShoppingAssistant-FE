import { request } from './client';
import type { PricesResponse } from './types';

export const pricesApi = {
  getPrices: async (cityId: number, productId: number): Promise<PricesResponse> => {
    return request<PricesResponse>(`/prices?cityId=${cityId}&productId=${productId}`);
  },
};