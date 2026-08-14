import { useState, useEffect } from 'react';
import { storage } from '../lib/storage';
import type { BasketItem } from '../api/types';

export function useBasket() {
  const [basket, setBasketState] = useState<BasketItem[]>(() => storage.getBasket());

  useEffect(() => {
    storage.setBasket(basket);
  }, [basket]);

  const addItem = (productId: number, quantity: number = 1) => {
    console.log('addItem called with:', productId, quantity);
    setBasketState(prev => {
      console.log('Previous basket:', prev);
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        const newState = prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        console.log('New basket (updated):', newState);
        return newState;
      }
      const newState = [...prev, { productId, quantity }];
      console.log('New basket (added):', newState);
      return newState;
    });
  };

  const removeItem = (productId: number) => {
    setBasketState(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setBasketState(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearBasket = () => {
    setBasketState([]);
  };

  const getTotalItems = () => {
    return basket.reduce((sum, item) => sum + item.quantity, 0);
  };

  return {
    basket,
    addItem,
    removeItem,
    updateQuantity,
    clearBasket,
    getTotalItems,
  };
}