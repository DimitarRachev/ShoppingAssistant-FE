import { useQuery } from '@tanstack/react-query';
import { citiesApi } from '../api/cities';
import { CITIES_QUERY_KEY } from '../lib/query-keys';

export function useCities() {
  return useQuery({
    queryKey: CITIES_QUERY_KEY,
    queryFn: citiesApi.getCities,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}