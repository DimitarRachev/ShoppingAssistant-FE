import { BasketSchema, CitySelectionSchema, ThemeSchema } from '../schemas/basket';
import type { BasketItem, City } from '../api/types';

const STORAGE_KEYS = {
  BASKET: 'shopping-basket',
  CITY: 'selected-city',
  THEME: 'theme',
} as const;

export const storage = {
  // Basket
  getBasket: (): BasketItem[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BASKET);
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      const result = BasketSchema.safeParse(parsed);
      return result.success ? result.data : [];
    } catch {
      return [];
    }
  },

  setBasket: (basket: BasketItem[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.BASKET, JSON.stringify(basket));
    } catch (error) {
      console.error('Failed to save basket:', error);
    }
  },

  clearBasket: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.BASKET);
    } catch (error) {
      console.error('Failed to clear basket:', error);
    }
  },

  // City
  getCity: (): City | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CITY);
      if (!stored) return null;
      
      const parsed = JSON.parse(stored);
      const result = CitySelectionSchema.safeParse(parsed);
      if (result.success) {
        // Ensure all required fields are present with fallbacks
        const data = result.data;
        return {
          id: data.id,
          nameBg: data.nameBg,
          nameEn: data.nameEn,
          municipalityBg: data.municipalityBg ?? '',
          municipalityEn: data.municipalityEn ?? '',
          regionBg: data.regionBg ?? '',
          regionEn: data.regionEn ?? '',
        };
      }
      return null;
    } catch {
      return null;
    }
  },

  setCity: (city: City): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.CITY, JSON.stringify(city));
    } catch (error) {
      console.error('Failed to save city:', error);
    }
  },

  clearCity: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CITY);
    } catch (error) {
      console.error('Failed to clear city:', error);
    }
  },

  // Theme
  getTheme: (): 'light' | 'dark' => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.THEME);
      if (!stored) {
        // Check system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark';
        }
        return 'light';
      }
      
      const result = ThemeSchema.safeParse(stored);
      return result.success ? result.data : 'light';
    } catch {
      return 'light';
    }
  },

  setTheme: (theme: 'light' | 'dark'): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  },
};