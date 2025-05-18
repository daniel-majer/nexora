import type { Product } from "../types/types";
import supabase from "./supabase";
import { useQuery } from "@tanstack/react-query";

export async function getProducts() {
  let { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw new Error("Products could not be loaded");

  return products as Product[];
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
