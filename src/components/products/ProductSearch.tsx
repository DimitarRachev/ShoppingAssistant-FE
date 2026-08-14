import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useProductSearch, useProducts } from '../../hooks/useProducts';
import { Input } from '../ui/Input';
import { cn } from '../../lib/utils';

interface ProductSearchProps {
  onAddProduct: (productId: number) => void;
}

export function ProductSearch({ onAddProduct }: ProductSearchProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (debounceRef.current !== undefined) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      if (debounceRef.current !== undefined) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { data: products, isLoading } = useProductSearch(debouncedQuery, isOpen);
  const { data: allProducts } = useProducts();

  const handleSelectProduct = (productId: number) => {
    onAddProduct(productId);
    setQuery('');
    setDebouncedQuery('');
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Търсете продукт..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 dark:bg-gray-900 dark:border-gray-700">
          {isLoading ? (
            <div className="p-4 text-sm text-gray-500 text-center">
              Търсене...
            </div>
          ) : (query.length >= 2 ? products : allProducts) && (query.length >= 2 ? products : allProducts)!.length > 0 ? (
            <ul role="listbox">
              {(query.length >= 2 ? products : allProducts)!.map((product) => (
                <li
                  key={product.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSelectProduct(product.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectProduct(product.id);
                    }
                  }}
                  tabIndex={0}
                  className={cn(
                    'px-4 py-3 cursor-pointer',
                    'hover:bg-gray-100 dark:hover:bg-gray-800',
                    'border-b border-gray-100 dark:border-gray-800 last:border-b-0',
                    'focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800'
                  )}
                  role="option"
                >
                  <div className="font-medium text-gray-900 dark:text-white">
                    {product.nameBg}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {product.nameEn}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-sm text-gray-500 text-center">
              {query.length >= 2 ? 'Няма намерени продукти' : 'Започнете да пишете за търсене'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}