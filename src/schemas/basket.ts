import { z } from 'zod';

export const BasketItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1),
});

export const BasketSchema = z.array(BasketItemSchema);

export const CitySelectionSchema = z.object({
  id: z.number(),
  nameBg: z.string(),
  nameEn: z.string(),
  municipalityBg: z.string().optional(),
  municipalityEn: z.string().optional(),
  regionBg: z.string().optional(),
  regionEn: z.string().optional(),
});

export const ThemeSchema = z.enum(['light', 'dark']);