import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { storage } from '../lib/storage';
import type { City } from '../api/types';

interface CityContextType {
  city: City | null;
  setCity: (city: City) => void;
  clearCity: () => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export function CityProvider({ children }: { children: ReactNode }) {
  const [city, setCityState] = useState<City | null>(() => {
    const storedCity = storage.getCity();
    return storedCity;
  });

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

  return (
    <CityContext.Provider value={{ city, setCity, clearCity }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
}