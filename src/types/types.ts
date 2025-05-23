import { z } from "zod";
export interface ChildrenProp {
  children: React.ReactNode;
}

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string | FileList;
  category: string;
  stock: number;
  isActive: string;
  reviews: number | null;
  rating: number | null;
};

export type Order = {
  customerId: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  totalAmount: number;
  paymentMethod: 1 | 2 | 3 | 4;
  deliveryMethod: 1 | 2 | 3 | 4;
  shippedAt?: Date;
  createdAt: Date;
  updatedAt?: Date;
  customers: Customer;
  employees?: Employee;
};

export type Customer = {
  name: string;
  email: string;
};

export type Employee = {
  name: string;
};

// 🧑‍💼 Employee schema
export const EmployeeSchema = z.object({
  name: z.string(),
});

// 👤 Customer schema
export const CustomerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

// 📦 Order schema
export const OrderSchema = z.object({
  customerId: z.string(),
  status: z.enum([
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]),
  totalAmount: z.number(),
  paymentMethod: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
  ]),
  deliveryMethod: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
  ]),
  shippedAt: z.coerce.date().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  customers: CustomerSchema,
  employees: EmployeeSchema,
});
export const OrdersArraySchema = z.array(OrderSchema);
