import { useState, useEffect } from 'react';
import { useCity } from '../contexts/CityContext';
import { useBasket } from '../hooks/useBasket';
import { useBasketCompare } from '../hooks/useBasketCompare';
import { useBasketOptimize } from '../hooks/useBasketOptimize';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { formatPrice } from '../lib/currency';
import { Store, TrendingUp, AlertCircle, ArrowLeft, RotateCcw } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';

export function PricesPage() {
  const { city } = useCity();
  const { basket, getTotalItems } = useBasket();
  const navigate = useNavigate();
  const [maxStores, setMaxStores] = useState(2);
  const [hasResults, setHasResults] = useState(false);
  const { data: products } = useProducts();

  const compareMutation = useBasketCompare();
  const optimizeMutation = useBasketOptimize();

  // Helper function to get product name by ID
  const getProductName = (productId: number) => {
    const product = products?.find(p => p.id === productId);
    return product?.nameBg || `Продукт #${productId}`;
  };

  // Set hasResults when mutations complete
  useEffect(() => {
    if (compareMutation.isSuccess || optimizeMutation.isSuccess) {
      setHasResults(true);
    }
  }, [compareMutation.isSuccess, optimizeMutation.isSuccess]);

  const handleCompare = () => {
    if (!city) return;
    compareMutation.mutate({
      cityId: city.id,
      items: basket,
    });
  };

  const handleOptimize = () => {
    if (!city) return;
    optimizeMutation.mutate({
      cityId: city.id,
      maxStores,
      items: basket,
    });
  };

  const handleReset = () => {
    setHasResults(false);
    compareMutation.reset();
    optimizeMutation.reset();
  };

  const isLoading = compareMutation.isPending || optimizeMutation.isPending;
  const compareData = compareMutation.data;
  const optimizeData = optimizeMutation.data;
  const compareError = compareMutation.error;
  const optimizeError = optimizeMutation.error;

  if (!city) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 dark:bg-yellow-900/20 dark:border-yellow-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                Не е избран град
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                Моля, изберете град за да сравните цените.
              </p>
              <Button
                onClick={() => navigate('/')}
                className="mt-3"
                size="sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Обратно към пазаруване
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (getTotalItems() === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Празна кошница
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Добавете продукти в кошницата за да сравните цените.
              </p>
              <Button
                onClick={() => navigate('/')}
                className="mt-3"
                size="sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Обратно към пазаруване
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Сравнение на цени
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {city.nameBg} • {getTotalItems()} продукта
          </p>
        </div>
        <div className="flex items-center gap-2">
          {hasResults && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Ново изчисление
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
        </div>
      </div>

      {!hasResults && (
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleCompare}
            disabled={isLoading}
            size="lg"
            className="flex-1"
          >
            {isLoading ? 'Търсим...' : 'Най-изгоден един магазин'}
          </Button>
          <div className="flex items-center gap-2">
            <select
              value={maxStores}
              onChange={(e) => setMaxStores(Number(e.target.value))}
              className="h-12 px-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            >
              <option value={2}>2 магазина</option>
              <option value={3}>3 магазина</option>
              <option value={4}>4 магазина</option>
            </select>
            <Button
              onClick={handleOptimize}
              disabled={isLoading}
              size="lg"
              className="flex-1"
            >
              {isLoading ? 'Търсим...' : 'Оптимизирай между магазини'}
            </Button>
          </div>
        </div>
      )}

      {(compareError || optimizeError) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 dark:bg-red-900/20 dark:border-red-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200">
                Грешка при сравнение на цени
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                {(compareError as Error)?.message || (optimizeError as Error)?.message || 'Възникна грешка при обработката на заявката.'}
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                Моля, опитайте отново по-късно или се свържете с поддръжката.
              </p>
            </div>
          </div>
        </div>
      )}

      {compareData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5 text-primary-600" />
              Най-изгоден един магазин
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {compareData.cheapestSingleStore.store.nameBg}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {getTotalItems()} продукта
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary-600">
                  {formatPrice(compareData.cheapestSingleStore.total)}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {compareData.cheapestSingleStore.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm py-2 border-t border-gray-100 dark:border-gray-800"
                >
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white font-medium">
                      {getProductName(item.productId)}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      {item.quantity} x {formatPrice(item.unitPrice)}
                    </p>
                  </div>
                  <span className="text-gray-900 dark:text-white font-semibold">
                    {formatPrice(item.totalPrice)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {optimizeData && optimizeData.optimizedBasket.savings > 0 && (
        <Card className="border-primary-200 dark:border-primary-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary-600">
              <TrendingUp className="h-5 w-5" />
              Спестете {formatPrice(optimizeData.optimizedBasket.savings)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ако пазарувате от {optimizeData.optimizedBasket.stores.length} магазина
            </p>
            
            {optimizeData.optimizedBasket.stores.map((storeWithItems, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {storeWithItems.store.nameBg}
                  </h4>
                  <span className="font-semibold text-primary-600">
                    {formatPrice(storeWithItems.total)}
                  </span>
                </div>
                <div className="space-y-2">
                  {storeWithItems.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between text-sm py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
                    >
                      <div className="flex-1">
                        <p className="text-gray-900 dark:text-white font-medium">
                          {getProductName(item.productId)}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">
                          {item.quantity} x {formatPrice(item.unitPrice)}
                        </p>
                      </div>
                      <span className="text-gray-900 dark:text-white font-semibold">
                        {formatPrice(item.totalPrice)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Общо</span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(optimizeData.optimizedBasket.total)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-600 dark:text-gray-400">Само един магазин</span>
                <span className="text-gray-900 dark:text-white">
                  {formatPrice(optimizeData.cheapestSingleStore.total)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-semibold text-primary-600">Спестявате</span>
                <span className="text-xl font-bold text-primary-600">
                  {formatPrice(optimizeData.optimizedBasket.savings)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {optimizeData && optimizeData.optimizedBasket.savings === 0 && (
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-600 dark:text-gray-400">
              Няма по-изгоден вариант от няколко магазина за вашата кошница.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}