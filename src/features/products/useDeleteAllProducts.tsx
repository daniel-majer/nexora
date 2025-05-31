import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProducts } from "../../services/apiProducts";

export function useDeleteAllProducts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ products }: { products: string[] }) =>
      deleteProducts({ products }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });
}
