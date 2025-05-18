import { z } from "zod";
export interface ChildrenProp {
  children: React.ReactNode;
}

export const productSchema = z.object({
  created_at: z.date(),
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  category: z.string(),
  stock: z.number(),
  rating: z.number(),
  reviews: z.number(),
  status: z.string(),
  isActive: z.boolean(),
});

export type Product = z.infer<typeof productSchema>;
