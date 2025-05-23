import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getProducts } from "../../services/apiProducts";

export function useGetProducts() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const category = searchParams.get("category");
  const status = searchParams.get("isActive");
  const name = searchParams.get("name");

  const filterByCategory =
    !category || category === "all"
      ? null
      : {
          field: "category",
          value: category,
          method: "eq",
        };

  const filterByStatus =
    !status || status === "all"
      ? null
      : {
          field: "isActive",
          value: status,
          method: "eq",
        };

  const { data: { products, count } = {}, isLoading } = useQuery({
    queryKey: ["products", page, sortBy, category, status, name],
    queryFn: () =>
      getProducts({ page, sortBy, filterByCategory, filterByStatus, name }),
  });

  return { products, isLoading, count };
}
