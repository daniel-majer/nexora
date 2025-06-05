import { PAGE_SIZE } from "../types/constants";
import supabase from "./supabase";

export type FilterProp = {
  field: string;
  method: string;
  value: string;
} | null;

type GetProductsProps = {
  page: number;
  sortBy?: string;
  filterByCategory?: FilterProp;
  filterByStatus?: FilterProp;
  name?: string | null;
};

/* get products from API */
export async function getProducts({
  page,
  sortBy,
  filterByCategory,
  filterByStatus,
  name,
}: GetProductsProps) {
  let query = supabase.from("products").select("*", { count: "exact" });

  /* PAGINATION */
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  /* SORT BY */
  if (sortBy) {
    const [field, order] = sortBy.split("-");
    query = query.order(field!, { ascending: order === "asc" });
  }

  /* FILTER BY CATEGORY */
  if (filterByCategory) {
    query = (query as any)[filterByCategory.method || "eq"](
      filterByCategory.field,
      filterByCategory.value,
    );
  }
  /* FILTER BY STATUS */
  if (filterByStatus) {
    query = (query as any)[filterByStatus.method || "eq"](
      filterByStatus.field,
      filterByStatus.value,
    );
  }

  /* FILTER BY NAME */
  if (name) {
    query = query.ilike("name", `%${name.trim()}%`);
  }

  const { data: products, error, count } = await query;

  if (error) throw new Error("Products could not be loaded");

  return { products, count };
}

export async function deleteProducts({ products }: { products: string[] }) {
  if (products.length === 0) return;

  const { error: orderItemsError } = await supabase
    .from("order_items")
    .delete()
    .in("productId", products);

  if (orderItemsError) {
    console.error("Error during deleting:", orderItemsError);
    throw orderItemsError;
  }

  const { error } = await supabase.from("products").delete().in("id", products);

  if (error) console.error("Error during deleting:", error);
}
