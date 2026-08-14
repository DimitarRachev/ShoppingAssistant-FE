import { ShoppingBag } from 'lucide-react';
import { Button } from '../ui/Button';

export function EmptyBasket() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-primary-100 rounded-full p-6 mb-4 dark:bg-primary-900/20">
        <ShoppingBag className="h-12 w-12 text-primary-600 dark:text-primary-400" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Вашата кошница е празна
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm">
        Добавете продукти и ще намерим най-изгодния вариант за вас.
      </p>
    </div>
  );
}