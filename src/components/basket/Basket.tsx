import { useProducts } from '../../hooks/useProducts';
import { BasketItem } from './BasketItem';
import { EmptyBasket } from './EmptyBasket';
import { Button } from '../ui/Button';
import { ShoppingCart } from 'lucide-react';
import type { BasketItem as BasketItemType } from '../../api/types';

interface BasketProps {
  basket: BasketItemType[];
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onClearBasket: () => void;
}

export function Basket({ basket, onRemoveItem, onUpdateQuantity, onClearBasket }: BasketProps) {
  const { data: allProducts } = useProducts();

  // Recreate the map whenever basket or products change
  const productsMap = new Map(allProducts?.map(p => [p.id, p]) || []);

  const getTotalItems = () => {
    return basket.reduce((sum, item) => sum + item.quantity, 0);
  };

  if (basket.length === 0) {
    return <EmptyBasket />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary-600" />
          Вашата кошница
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearBasket}
          className="text-red-600 hover:text-red-700 dark:text-red-400"
        >
          Изчисти
        </Button>
      </div>

      <div className="space-y-2">
        {basket.map((item) => (
          <BasketItem
            key={`${item.productId}-${item.quantity}`}
            item={item}
            product={productsMap.get(item.productId) || null}
            onRemove={onRemoveItem}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {getTotalItems()} {getTotalItems() === 1 ? 'продукт' : 'продукта'}
        </span>
      </div>
    </div>
  );
}