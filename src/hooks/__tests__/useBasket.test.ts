import { renderHook, act } from '@testing-library/react';
import { useBasket } from '../useBasket';
import { storage } from '../../lib/storage';
import { vi } from 'vitest';

// Mock storage
vi.mock('../../lib/storage');

describe('useBasket', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (storage.getBasket as ReturnType<typeof vi.fn>).mockReturnValue([]);
  });

  it('should initialize with empty basket', () => {
    const { result } = renderHook(() => useBasket());
    expect(result.current.basket).toEqual([]);
  });

  it('should add item to basket', () => {
    const { result } = renderHook(() => useBasket());
    
    act(() => {
      result.current.addItem(1, 2);
    });

    expect(result.current.basket).toEqual([{ productId: 1, quantity: 2 }]);
  });

  it('should update quantity of existing item', () => {
    const { result } = renderHook(() => useBasket());
    
    act(() => {
      result.current.addItem(1, 2);
    });

    act(() => {
      result.current.addItem(1, 3);
    });

    expect(result.current.basket).toEqual([{ productId: 1, quantity: 5 }]);
  });

  it('should remove item from basket', () => {
    const { result } = renderHook(() => useBasket());
    
    act(() => {
      result.current.addItem(1, 2);
      result.current.addItem(2, 1);
    });

    act(() => {
      result.current.removeItem(1);
    });

    expect(result.current.basket).toEqual([{ productId: 2, quantity: 1 }]);
  });

  it('should update quantity', () => {
    const { result } = renderHook(() => useBasket());
    
    act(() => {
      result.current.addItem(1, 2);
    });

    act(() => {
      result.current.updateQuantity(1, 5);
    });

    expect(result.current.basket).toEqual([{ productId: 1, quantity: 5 }]);
  });

  it('should remove item when quantity becomes 0', () => {
    const { result } = renderHook(() => useBasket());
    
    act(() => {
      result.current.addItem(1, 2);
    });

    act(() => {
      result.current.updateQuantity(1, 0);
    });

    expect(result.current.basket).toEqual([]);
  });

  it('should clear basket', () => {
    const { result } = renderHook(() => useBasket());
    
    act(() => {
      result.current.addItem(1, 2);
      result.current.addItem(2, 1);
    });

    act(() => {
      result.current.clearBasket();
    });

    expect(result.current.basket).toEqual([]);
  });

  it('should calculate total items', () => {
    const { result } = renderHook(() => useBasket());
    
    act(() => {
      result.current.addItem(1, 2);
      result.current.addItem(2, 3);
    });

    expect(result.current.getTotalItems()).toBe(5);
  });
});