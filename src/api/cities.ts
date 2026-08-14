import { request } from './client';
import type { CitiesResponse, City } from './types';

export const citiesApi = {
  getCities: async (): Promise<City[]> => {
    const response = await request<CitiesResponse>('/cities');
    return response.items;
  },
};