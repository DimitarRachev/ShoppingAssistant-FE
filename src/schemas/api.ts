import { z } from 'zod';

export const CitySchema = z.object({
  id: z.number(),
  nameBg: z.string(),
  nameEn: z.string(),
  municipalityBg: z.string(),
  municipalityEn: z.string(),
  regionBg: z.string(),
  regionEn: z.string(),
});

export const ProductSchema = z.object({
  id: z.number(),
  nameBg: z.string(),
  nameEn: z.string(),
  groupBg: z.string(),
  groupEn: z.string(),
});

export const StoreSchema = z.object({
  id: z.number(),
  nameBg: z.string(),
  nameEn: z.string(),
});

export const PriceSchema = z.object({
  store: StoreSchema,
  value: z.number(),
  currency: z.string(),
});

export const BasketItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1),
});

export const BasketCompareRequestSchema = z.object({
  cityId: z.number(),
  items: z.array(BasketItemSchema),
});

export const BasketOptimizeRequestSchema = z.object({
  cityId: z.number(),
  maxStores: z.number().min(1),
  items: z.array(BasketItemSchema),
});