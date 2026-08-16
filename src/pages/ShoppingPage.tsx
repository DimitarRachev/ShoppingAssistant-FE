import { CitySelector } from '../components/city/CitySelector';
import { ProductSearch } from '../components/products/ProductSearch';
import { Basket } from '../components/basket/Basket';
import { useCity } from '../contexts/CityContext';
import { useBasket } from '../hooks/useBasket';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Sparkles } from 'lucide-react';

export function ShoppingPage() {
  const { city } = useCity();
  const { basket, addItem, removeItem, updateQuantity, clearBasket, getTotalItems } = useBasket();
  const navigate = useNavigate();

  const handleComparePrices = () => {
    navigate('/prices');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Пазаруване
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Сравнете цени и спестете пари
            </p>
          </div>
          <CitySelector />
        </div>

        <div id="product-search">
          <ProductSearch onAddProduct={addItem} />
        </div>
      </div>

      <Basket 
        basket={basket}
        onRemoveItem={removeItem}
        onUpdateQuantity={updateQuantity}
        onClearBasket={clearBasket}
      />

      {getTotalItems() > 0 && city && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800 md:relative md:bg-transparent md:border-t-0 md:p-0">
          <div className="container mx-auto max-w-4xl">
            <Button
              onClick={handleComparePrices}
              size="lg"
              className="w-full md:w-auto"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Сравни цените
            </Button>
          </div>
        </div>
      )}

      {getTotalItems() > 0 && !city && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            Моля, изберете град за да сравните цените.
          </p>
        </div>
      )}
    </div>
  );
}