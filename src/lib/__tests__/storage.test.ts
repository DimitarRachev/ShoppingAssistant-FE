import { storage } from '../storage';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('storage', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('basket', () => {
    it('should get empty basket when nothing stored', () => {
      const basket = storage.getBasket();
      expect(basket).toEqual([]);
    });

    it('should save and retrieve basket', () => {
      const basket = [{ productId: 1, quantity: 2 }];
      storage.setBasket(basket);
      const retrieved = storage.getBasket();
      expect(retrieved).toEqual(basket);
    });

    it('should clear basket', () => {
      const basket = [{ productId: 1, quantity: 2 }];
      storage.setBasket(basket);
      storage.clearBasket();
      const retrieved = storage.getBasket();
      expect(retrieved).toEqual([]);
    });

    it('should handle invalid basket data', () => {
      localStorageMock.setItem('shopping-basket', 'invalid json');
      const basket = storage.getBasket();
      expect(basket).toEqual([]);
    });
  });

  describe('city', () => {
    it('should get null when no city stored', () => {
      const city = storage.getCity();
      expect(city).toBeNull();
    });

    it('should save and retrieve city', () => {
      const city = { 
        id: 1, 
        nameBg: 'Варна', 
        nameEn: 'Varna',
        municipalityBg: 'Варна',
        municipalityEn: 'Varna',
        regionBg: 'Варна',
        regionEn: 'Varna'
      };
      storage.setCity(city);
      const retrieved = storage.getCity();
      expect(retrieved).toEqual(city);
    });

    it('should clear city', () => {
      const city = { 
        id: 1, 
        nameBg: 'Варна', 
        nameEn: 'Varna',
        municipalityBg: 'Варна',
        municipalityEn: 'Varna',
        regionBg: 'Варна',
        regionEn: 'Varna'
      };
      storage.setCity(city);
      storage.clearCity();
      const retrieved = storage.getCity();
      expect(retrieved).toBeNull();
    });

    it('should handle invalid city data', () => {
      localStorageMock.setItem('selected-city', 'invalid json');
      const city = storage.getCity();
      expect(city).toBeNull();
    });
  });

  describe('theme', () => {
    it('should default to light theme', () => {
      const theme = storage.getTheme();
      expect(theme).toBe('light');
    });

    it('should save and retrieve theme', () => {
      storage.setTheme('dark');
      const retrieved = storage.getTheme();
      expect(retrieved).toBe('dark');
    });

    it('should handle invalid theme data', () => {
      localStorageMock.setItem('theme', 'invalid');
      const theme = storage.getTheme();
      expect(theme).toBe('light');
    });
  });
});