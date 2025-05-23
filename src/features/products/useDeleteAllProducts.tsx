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
      console.error("Error creating product:", error);
    },
  });
}

async function deleteProducts({ products }: { products: string[] }) {
  if (products.length === 0) return;
  console.log(products);

  const { error } = await supabase.from("products").delete().in("id", products);

  if (error) console.error("Chyba pri mazani:", error);
}
