import type { Database } from "./supabase";

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type Customer = Database["public"]["Tables"]["customers"]["Row"];
export type OrderItems = Database["public"]["Tables"]["order_items"]["Row"] & {
  products?: Product;
};
export type Orders = Database["public"]["Tables"]["orders"]["Row"] & {
  customers: Customer;
  order_items: OrderItems[];
};
