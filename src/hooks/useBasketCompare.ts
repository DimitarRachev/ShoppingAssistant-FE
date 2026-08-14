import { useMutation, useQueryClient } from '@tanstack/react-query';
import { basketApi } from '../api/basket';
import { BASKET_COMPARE_QUERY_KEY } from '../lib/query-keys';
import type { BasketCompareRequest } from '../api/types';

export function useBasketCompare() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: BASKET_COMPARE_QUERY_KEY,
    mutationFn: (data: BasketCompareRequest) => basketApi.compareBasket(data),
    onSuccess: () => {
      // Invalidate related queries if needed
      queryClient.invalidateQueries({ queryKey: ['prices'] });
    },
  });
}