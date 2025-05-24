import supabase from "./supabase";
import { PAGE_SIZE } from "../types/constants";
import type { FilterProp } from "./apiProducts";
import type { Order } from "../types/types";

type OrdersProps = {
  page: number;
  sortBy: string;
  name: string;
  status: FilterProp;
  payment: FilterProp;
  delivery: FilterProp;
};

export async function getOrders({
  page,
  sortBy,
  name,
  status,
  payment,
  delivery,
}: OrdersProps) {
  let query = supabase.from("orders").select(
    `
*,
customers ( * ),
order_items ( * )
`,
    { count: "exact" },
  );

  /* SORT BY */
  if (sortBy) {
    const [field, value] = sortBy.split("-");
    query = query.order(field ?? "createdAt", { ascending: value === "asc" });
  }

  /* FILTER BY STATUS */
  if (status) {
    query = (query as any)[status.method || "eq"](status.field, status.value);
  }
  /* FILTER BY PAYMENTS */
  if (payment) {
    query = (query as any)[payment.method || "eq"](
      payment.field,
      payment.value,
    );
  }
  /* FILTER BY DELIVERIES */
  if (delivery) {
    query = (query as any)[delivery.method || "eq"](
      delivery.field,
      delivery.value,
    );
  }

  /* PAGINATION */
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  /* FILTER BY NAME */
  if (name) {
    const { data: customerIds, error: customerError } = await supabase
      .from("customers")
      .select("id")
      .ilike("name", `%${name}%`);

    if (customerError) throw new Error("Could not filter customers");

    const ids = customerIds.map((c) => c.id);

    query = query.in("customerId", ids);
  }

  const { data: orders, error, count } = await query;

  if (error) throw new Error("Orders could not be loaded");

  return { orders, count };
}

export async function getOrder({ id }: { id: string }) {
  let { data, error } = await supabase
    .from("orders")
    .select(`*, customers ( * ), order_items ( * )`)
    .eq("id", id)
    .single();

  if (error) throw new Error("Order could not be loaded");

  return data;
}
