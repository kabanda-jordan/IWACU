// src/validators/property.validator.ts
import { z } from 'zod'

// ── Create Property ────────────────────────────────────
export const createPropertySchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title too long'),

  description: z
    .string()
    .min(20, 'Description must be at least 20 characters'),

  priceRwf: z
    .number()
    .positive('Price must be positive'),

  priceUsd: z
    .number()
    .positive('Price must be positive')
    .optional(),

  sizeSqm: z
    .number()
    .positive('Size must be positive'),

  propertyType: z.enum(['LAND', 'HOUSE', 'APARTMENT', 'COMMERCIAL', 'VILLA', 'OFFICE'] as const, {
    message: 'Invalid property type',
  }),

  priceType: z.enum(['sale', 'rent'] as const).optional(),

  district: z
    .string()
    .min(2, 'District is required'),

  sector: z
    .string()
    .min(2, 'Sector is required'),

  city: z.string().optional(),

  bedrooms: z.number().int().min(0).optional(),
  bathrooms: z.number().int().min(0).optional(),
  parking: z.number().int().min(0).optional(),
  floors: z.number().int().min(1).optional(),
  yearBuilt: z.number().int().min(1800).max(2100).optional(),

  amenities: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),

  isFeatured: z.boolean().optional(),

  latitude: z.number().optional(),
  longitude: z.number().optional(),
})

// ── Update Property ────────────────────────────────────
export const updatePropertySchema = createPropertySchema.partial()
// .partial() makes all fields optional for updates