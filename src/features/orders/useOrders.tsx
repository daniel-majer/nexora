import { useSearchParams } from "react-router";
import { getOrders } from "../../services/apiOrders";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PAGE_SIZE } from "../../types/constants";

export const useOrders = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sortBy") || "createdAt-asc";
  const name = searchParams.get("name") || "";
  const status = searchParams.get("status");
  const payment = searchParams.get("paymentMethod");
  const delivery = searchParams.get("deliveryMethod");

  const queryClient = useQueryClient();

  const filterByStatus =
    !status || status === "all"
      ? null
      : {
          field: "status",
          value: status,
          method: "eq",
        };

  const filterByPayment =
    !payment || payment === "all"
      ? null
      : {
          field: "paymentMethod",
          value: payment,
          method: "eq",
        };

  const filterByDelivery =
    !delivery || delivery === "all"
      ? null
      : {
          field: "deliveryMethod",
          value: delivery,
          method: "eq",
        };

  const { data: { orders, count } = {}, isLoading } = useQuery({
    queryKey: ["orders", sortBy, name, status, payment, delivery, page],
    queryFn: () =>
      getOrders({
        sortBy,
        name,
        status: filterByStatus,
        payment: filterByPayment,
        delivery: filterByDelivery,
        page,
      }),
  });

  /* PRE-FETCH */

  const pageCount = Math.ceil(count ?? 0 / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["orders", sortBy, name, status, payment, delivery, page + 1],
      queryFn: () =>
        getOrders({
          sortBy,
          name,
          status: filterByStatus,
          payment: filterByPayment,
          delivery: filterByDelivery,
          page: page + 1,
        }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["orders", sortBy, name, status, payment, delivery, page - 1],
      queryFn: () =>
        getOrders({
          sortBy,
          name,
          status: filterByStatus,
          payment: filterByPayment,
          delivery: filterByDelivery,
          page: page - 1,
        }),
    });
  }

  return { orders, isLoading, count };
};
