import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../../services/supabase";

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

async function deleteProducts({ products }: { products: string[] }) {
  if (products.length === 0) return;

  const { error: orderItemsError } = await supabase
    .from("order_items")
    .delete()
    .in("productId", products);

  if (orderItemsError) {
    console.error("Chyba pri mazani order_items:", orderItemsError);
    throw orderItemsError;
  }

  const { error } = await supabase.from("products").delete().in("id", products);

  if (error) console.error("Chyba pri mazani:", error);
}
