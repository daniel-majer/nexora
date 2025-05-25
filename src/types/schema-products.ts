import { z } from "zod";
import { Constants } from "./supabase";
import type { Product } from "./supabase-types";

const ProductCategoryEnum = z.enum(Constants.public.Enums.categories);

export const ProductSchema: z.ZodSchema<Product> = z.object({
  category: ProductCategoryEnum,
  created_at: z.string(),
  description: z.string(),
  id: z.string(),
  imageUrl: z.string().nullable(),
  isActive: z.string(),
  name: z.string(),
  price: z.number(),
  rating: z.number().nullable(),
  reviews: z.number().nullable(),
  stock: z.number(),
});
