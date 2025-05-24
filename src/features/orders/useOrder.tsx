import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../../services/apiOrders";
import { useParams } from "react-router";
import type { Order } from "../../types/types";

export const useOrder = () => {
  const params = useParams();
  console.log("params:", params);
  const { data, isLoading, isPending } = useQuery<Order>({
    queryKey: ["order", params],
    queryFn: () => getOrder({ id: params.id as string }),
  });

  return { data, isLoading, isPending };
};
