import { useMutation, useQueryClient } from '@tanstack/react-query';
import { basketApi } from '../api/basket';
import { BASKET_OPTIMIZE_QUERY_KEY } from '../lib/query-keys';
import type { BasketOptimizeRequest } from '../api/types';

export function useBasketOptimize() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: BASKET_OPTIMIZE_QUERY_KEY,
    mutationFn: (data: BasketOptimizeRequest) => basketApi.optimizeBasket(data),
    onSuccess: () => {
      // Invalidate related queries if needed
      queryClient.invalidateQueries({ queryKey: ['prices'] });
    },
  });
}