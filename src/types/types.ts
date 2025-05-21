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
  rating: z.number().optional(),
  reviews: z.number().optional(),
  isActive: z.boolean(),
});

export const customerSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

export const employeeSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  position: z.string(),
  phone: z.string(),
  hired: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, expected YYYY-MM-DD"),
  birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, expected YYYY-MM-DD"),
  department: z.string(),
});

export const orderItemSchema = z.object({
  id: z.number(),
  orderId: z.number(),
  productId: z.number(),
  quantity: z.number(),
  unitPrice: z.number(),
  product: productSchema.optional(),
});

export const orderSchema = z.object({
  id: z.number(),
  orderDate: z.date(),
  customerId: z.number(),
  employeeId: z.number().nullable(),
  status: z.enum([
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]),
  totalAmount: z.number(),
  shippedDate: z.coerce.date().nullable(),
  customers: customerSchema.optional(),
  employees: employeeSchema.optional(),
  orderItems: z.array(orderItemSchema).optional(),
  paymentMethodId: z.number(),
  deliveryMethodId: z.number(),
});

export type Order = z.infer<typeof orderSchema>;
export type Employees = z.infer<typeof employeeSchema>;

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string | FileList;
  category: string;
  stock: number;
  isActive: string;
};
