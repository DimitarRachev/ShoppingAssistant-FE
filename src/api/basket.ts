import { request } from './client';
import type { BasketCompareRequest, BasketCompareResponse, BasketOptimizeRequest, BasketOptimizeResponse } from './types';

export const basketApi = {
  compareBasket: async (data: BasketCompareRequest): Promise<BasketCompareResponse> => {
    return request<BasketCompareResponse>('/basket/compare', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  optimizeBasket: async (data: BasketOptimizeRequest): Promise<BasketOptimizeResponse> => {
    return request<BasketOptimizeResponse>('/basket/optimize', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};