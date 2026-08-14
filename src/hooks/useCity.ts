import { useState, useEffect } from 'react';
import { storage } from '../lib/storage';
import type { City } from '../api/types';

export function useCity() {
  const [city, setCityState] = useState<City | null>(() => storage.getCity());

  useEffect(() => {
    if (city) {
      storage.setCity(city);
    } else {
      storage.clearCity();
    }
  }, [city]);

  const setCity = (city: City) => {
    setCityState(city);
  };

  const clearCity = () => {
    setCityState(null);
  };

  return {
    city,
    setCity,
    clearCity,
  };
}