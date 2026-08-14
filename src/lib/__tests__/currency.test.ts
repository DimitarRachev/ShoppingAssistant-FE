import { formatCurrency, formatPrice } from '../currency';

describe('currency', () => {
  describe('formatCurrency', () => {
    it('should format EUR currency', () => {
      const result = formatCurrency(10.5, 'EUR');
      expect(result).toContain('10,50');
      expect(result).toContain('€');
    });

    it('should format BGN currency', () => {
      const result = formatCurrency(10.5, 'BGN');
      expect(result).toContain('10,50');
      expect(result).toContain('лв');
    });

    it('should default to EUR', () => {
      const result = formatCurrency(10.5);
      expect(result).toContain('10,50');
      expect(result).toContain('€');
    });

    it('should handle zero', () => {
      const result = formatCurrency(0, 'EUR');
      expect(result).toContain('0,00');
      expect(result).toContain('€');
    });

    it('should handle large numbers', () => {
      const result = formatCurrency(1234.56, 'EUR');
      expect(result).toContain('1234,56');
      expect(result).toContain('€');
    });
  });

  describe('formatPrice', () => {
    it('should format price with default currency', () => {
      const result = formatPrice(10.5);
      expect(result).toContain('10,50');
      expect(result).toContain('€');
    });

    it('should format price with specified currency', () => {
      const result = formatPrice(10.5, 'BGN');
      expect(result).toContain('10,50');
      expect(result).toContain('лв');
    });
  });
});