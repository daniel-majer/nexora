import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../../services/apiOrders";
import { useParams } from "react-router";

export const useOrder = () => {
  const params = useParams();

  const { data, isLoading, isPending } = useQuery({
    queryKey: ["order", params],
    queryFn: () => getOrder({ id: params.id as string }),
  });

  return { data, isLoading, isPending };
};
