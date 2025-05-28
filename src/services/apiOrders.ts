import supabase from "./supabase";
import { PAGE_SIZE } from "../types/constants";
import type { FilterProp } from "./apiProducts";
import { OrderSchema, OrdersWithRelationsSchema } from "../types/schema-orders";

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

  /* PAGINATION */
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  /* SORT BY */
  if (sortBy) {
    const [field, value] = sortBy.split("-");
    console.log(field, value);

    if (field) {
      query = query.order(field, { ascending: value === "asc" });
    }
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

  const { data, error, count } = await query;

  if (error) throw new Error("Orders could not be loaded");

  /* VALIDATION */
  try {
    const orders = OrdersWithRelationsSchema.parse(data);
    return { orders, count };
  } catch (e) {
    console.error("Validation failed:", e, "Data was:", data);
    throw new Error("Validation failed for orders");
  }
}

export async function getOrder({ id }: { id: string }) {
  const { data: order, error } = await supabase
    .from("orders")
    .select(`*, customers ( * ), order_items ( *, products ( * ) )`)
    .eq("id", id)
    .single();

  if (error) throw new Error("Order could not be loaded");

  /* VALIDATION */
  try {
    const data = OrderSchema.parse(order);
    return data;
  } catch (e) {
    console.error("Validation failed:", e, "Data was:", order);
    throw new Error("Validation failed for orders");
  }
}

export async function updateDeleteOrder(id?: string, state?: string) {
  if (!id) return;

  /*  Update matching rows */
  if (state) {
    const { data, error } = await supabase
      .from("orders")
      .update({ status: state })
      .eq("id", id)
      .select();

    if (error) throw new Error("Order could not be updated");

    return data;
  }
}
