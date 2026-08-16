import { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronDown, X } from 'lucide-react';
import { useCities } from '../../hooks/useCities';
import { useCity } from '../../contexts/CityContext';
import { Input } from '../ui/Input';
import { cn } from '../../lib/utils';
import type { City } from '../../api/types';

export function CitySelector() {
  const { city, setCity, clearCity } = useCity();
  const { data: cities, isLoading, error } = useCities();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCities = cities ? cities.filter(
    (c) =>
      c.nameBg.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const handleSelectCity = (selectedCity: City) => {
    setCity(selectedCity);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleClearCity = () => {
    clearCity();
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <MapPin className="h-4 w-4" />
        <span>Зареждане на градове...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-sm text-red-600">
        <MapPin className="h-4 w-4" />
        <span>Грешка при зареждане на градове</span>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-lg border',
          'bg-white hover:bg-gray-50',
          'border-gray-300',
          'focus:outline-none focus:ring-2 focus:ring-primary-500',
          'dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800',
          'min-w-[200px]'
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <MapPin className="h-4 w-4 text-primary-600" />
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {city ? city.nameBg : 'Изберете град'}
        </span>
        {city && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleClearCity();
            }}
            className="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </div>
        )}
        {!city && <ChevronDown className="h-4 w-4 ml-auto text-gray-400" />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 dark:bg-gray-900 dark:border-gray-700">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <Input
              placeholder="Търсете град..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredCities.length === 0 ? (
              <div className="p-4 text-sm text-gray-500 text-center">
                Няма намерени градове
              </div>
            ) : (
              <ul role="listbox">
                {filteredCities.map((c) => (
                  <li
                    key={c.id}
                    onClick={() => handleSelectCity(c)}
                    className={cn(
                      'px-4 py-2 cursor-pointer text-sm',
                      'hover:bg-gray-100 dark:hover:bg-gray-800',
                      'text-gray-900 dark:text-white',
                      city?.id === c.id && 'bg-primary-50 dark:bg-primary-900/20'
                    )}
                    role="option"
                    aria-selected={city?.id === c.id}
                  >
                    {c.nameBg}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}