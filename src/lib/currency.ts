export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('bg-BG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPrice(amount: number, currency: string = 'EUR'): string {
  return formatCurrency(amount, currency);
}