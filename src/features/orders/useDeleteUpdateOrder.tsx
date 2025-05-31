import { useMutation } from "@tanstack/react-query";
import { updateDeleteOrder } from "../../services/apiOrders";
import { useParams } from "react-router";

export const useDeleteUpdateOrder = () => {
  const params = useParams();

  const { isPending, mutateAsync, data } = useMutation({
    mutationFn: ({ type }: { type?: string }) =>
      updateDeleteOrder(params.id, type),
  });

  return { isPending, mutateAsync, data };
};
