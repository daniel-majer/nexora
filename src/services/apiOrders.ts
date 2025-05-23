import { data } from "react-router";
import supabase from "./supabase";
import type { Order } from "../types/types";
import { useQuery } from "@tanstack/react-query";

async function getOrders() {
  const { data: orders, error } = await supabase.from("orders").select(
    `
    *,
    customers ( * ),
    order_items ( * ),
    employees ( name )
  `,
  );

  if (error) throw new Error("Orders could not be loaded");

  return orders;
}

export function useOrders() {
  return useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
}
