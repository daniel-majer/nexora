import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../../types/types";
import { SUPABASE_URL } from "../../types/constants";
import { isFileList, removeDiacritics } from "../../utils/helper";
import supabase from "../../services/supabase";

type CreateProps = {
  product: Product;
  action?: "create" | "duplicate" | "edit" | "delete";
};

export function useProductOperations() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ product, action }: CreateProps) =>
      handleProduct({ product, action }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error creating product:", error);
    },
  });
}

async function handleProduct({ product, action = "create" }: CreateProps) {
  const hasImgPath =
    typeof product.imageUrl === "string" &&
    product.imageUrl?.includes("https://");

  const imageName =
    isFileList(product.imageUrl) && product.imageUrl.length > 0
      ? removeDiacritics(`${Math.random()}-${product.imageUrl[0]?.name}`)
      : null;

  const imgPath = imageName
    ? `${SUPABASE_URL}/product-image/${imageName}`
    : null;

  /* CREATE */
  if (action === "create") {
    const { error } = await supabase
      .from("products")
      .insert([
        {
          ...product,
          imageUrl: imgPath,
        },
      ])
      .select();
    if (error) throw new Error("Product could not be created");
  }

  /* DUPLICATE */
  if (action === "duplicate") {
    const { error } = await supabase
      .from("products")
      .insert([
        {
          ...product,
          id: crypto.randomUUID(),
        },
      ])
      .select();
    if (error) throw new Error("Product could not be duplicated");
    return;
  }

  /* EDIT */
  if (action === "edit") {
    const { error } = await supabase
      .from("products")
      .update({ ...product, imageUrl: hasImgPath ? product.imageUrl : imgPath })
      .eq("id", product.id)
      .select();
    if (error) throw new Error("Product could not be updated");
  }

  /* DELETE */
  if (action === "delete") {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

    if (error) throw new Error("Product could not be deleted");
    return;
  }

  if (!imageName) return;

  const { error: storageError } = await supabase.storage
    .from("product-image")
    .upload(imageName, product.imageUrl?.[0]!, {
      cacheControl: "3600",
      upsert: false,
    });

  if (storageError) throw new Error("Image could not be created");
}
