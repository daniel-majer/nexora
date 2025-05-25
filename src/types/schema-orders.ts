import { z } from "zod";
import type { Customer, OrderItems, Orders } from "./supabase-types";
import { Constants } from "./supabase";
import { ProductSchema } from "./schema-products";

const CustomerSchema: z.ZodSchema<Customer> = z.object({
  address: z.string(),
  created_at: z.string(),
  email: z.string().email().nullable(),
  id: z.string(),
  name: z.string(),
  phone: z.string().nullable(),
});

const OrderItemSchema: z.ZodSchema<OrderItems> = z.object({
  created_at: z.string(),
  id: z.string(),
  orderId: z.string(),
  productId: z.string(),
  quantity: z.number(),
  products: ProductSchema.optional(),
});

const OrderStatusEnum = z.enum(Constants.public.Enums.orderStatus);
const PaymentStatusEnum = z.enum(Constants.public.Enums.paymentStatus);

export const OrderSchema: z.ZodSchema<Orders> = z.object({
  createdAt: z.string(),
  customerId: z.string(),
  deliveredAt: z.string().nullable(),
  deliveryMethod: z.number(),
  id: z.string(),
  paymentMethod: z.number(),
  paymentStatus: PaymentStatusEnum,
  shippedAt: z.string().nullable(),
  status: OrderStatusEnum,
  totalAmount: z.number(),
  updatedAt: z.string().nullable(),
  customers: CustomerSchema,
  order_items: z.array(OrderItemSchema),
});

export const OrdersWithRelationsSchema = z.array(OrderSchema);
