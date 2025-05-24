import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getProducts } from "../../services/apiProducts";
import { PAGE_SIZE } from "../../types/constants";

export function useGetProducts() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const category = searchParams.get("category") || "all";
  const status = searchParams.get("isActive") || "all";
  const name = searchParams.get("name") || "";

  const queryClient = useQueryClient();

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
    queryKey: ["products", sortBy, category, status, name, page],
    queryFn: () =>
      getProducts({ sortBy, filterByCategory, filterByStatus, name, page }),
  });

  /* PRE-FETCH */

  const pageCount = Math.ceil((count ?? 0) / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["products", sortBy, category, status, name, page + 1],
      queryFn: () =>
        getProducts({
          sortBy,
          filterByCategory,
          filterByStatus,
          name,
          page: page + 1,
        }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["products", sortBy, category, status, name, page - 1],
      queryFn: () =>
        getProducts({
          sortBy,
          filterByCategory,
          filterByStatus,
          name,
          page: page - 1,
        }),
    });
  }

  return { products, isLoading, count };
}
