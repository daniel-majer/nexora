import supabase from "./supabase";

interface FilterByPayment {
  field: string;
  value: string;
}

export async function getDashboardOrders({
  filterByPayment,
}: {
  filterByPayment: FilterByPayment | null;
}) {
  let query = supabase
    .from("orders")
    .select(`*, customers ( * ), order_items ( *, products ( * ))`)
    .order("createdAt", { ascending: false });

  if (filterByPayment)
    query = query.eq(filterByPayment.field, filterByPayment.value);

  const { data: orders, error } = await query;

  if (error) throw new Error(error.message);

  return orders;
}
