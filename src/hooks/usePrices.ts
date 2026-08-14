import { useQuery } from '@tanstack/react-query';
import { pricesApi } from '../api/prices';
import { PRICES_QUERY_KEY } from '../lib/query-keys';

export function usePrices(cityId: number, productId: number, enabled: boolean = true) {
  return useQuery({
    queryKey: PRICES_QUERY_KEY(cityId, productId),
    queryFn: () => pricesApi.getPrices(cityId, productId),
    enabled: enabled && cityId > 0 && productId > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}