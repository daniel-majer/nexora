import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase";
import type { Product } from "../../types/types";

/* get products from API */
async function getProducts() {
  let { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error("Products could not be loaded");

  return products as Product[];
}

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
