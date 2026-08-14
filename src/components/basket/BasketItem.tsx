import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import type { BasketItem as BasketItemType, Product } from '../../api/types';

interface BasketItemProps {
  item: BasketItemType;
  product: Product | null;
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

export function BasketItem({ item, product, onRemove, onUpdateQuantity }: BasketItemProps) {
  const handleIncrement = () => {
    onUpdateQuantity(item.productId, item.quantity + 1);
  };

  const handleDecrement = () => {
    onUpdateQuantity(item.productId, item.quantity - 1);
  };

  const handleRemove = () => {
    onRemove(item.productId);
  };

  return (
    <div className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 dark:text-white truncate">
          {product?.nameBg || 'Продукт'}
        </h3>
        {product?.groupBg && (
          <Badge variant="default" className="mt-1">
            {product.groupBg}
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDecrement}
          aria-label="Намали количество"
          className="h-8 w-8 p-0"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
          {item.quantity}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleIncrement}
          aria-label="Увеличи количество"
          className="h-8 w-8 p-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleRemove}
        aria-label="Премахни от кошницата"
        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}