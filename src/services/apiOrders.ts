import { data } from "react-router";
import supabase from "./supabase";
import type { Order } from "../types/types";
import { useQuery } from "@tanstack/react-query";

async function getOrders() {
  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      `
    *,
    customers ( * ),
    employees ( * )
  `,
    )
    .order("id", { ascending: true });

  if (error) throw new Error("Orders could not be loaded");

  return orders as Order[];
}

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
}
