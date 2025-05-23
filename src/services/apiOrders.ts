import supabase from "./supabase";
import { OrdersArraySchema, type Order } from "../types/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../types/constants";

async function getOrders(page: number) {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  console.log(page, from, to);

  const {
    data: orders,
    error,
    count,
  } = await supabase
    .from("orders")
    .select(
      `
    *,
    customers ( * ),
    order_items ( * ),
    employees ( name )
  `,
      { count: "exact" },
    )
    .range(from, to);

  if (error) throw new Error("Orders could not be loaded");

  console.log(orders);

  return { orders: orders as Order[], count };
}

export function useOrders() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  return useQuery({
    queryKey: ["orders", page],
    queryFn: () => getOrders(page),
  });
}
