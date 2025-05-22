import { XIcon } from "lucide-react";
import { FormProvider, useForm, type UseFormReturn } from "react-hook-form";
import type { Product } from "../../types/types";
import { Button } from "../../ui/Button";
import { Heading } from "../../ui/Heading";
import { Input } from "../../ui/Input";
import { FileUpload } from "../../ui/InputFile";
import { Select } from "../../ui/Select";
import { SpinnerMini } from "../../ui/SpinnerMini";
import { Textarea } from "../../ui/Textarea";
import { useProductOperations } from "../../services/products/useProductOperations";

export const AddProductForm = ({
  close,
  product,
}: {
  close?: () => void;
  product?: Product;
}) => {
  const { mutate, isPending } = useProductOperations();

  const methods: UseFormReturn<Product> = useForm<Product>({
    defaultValues: product
      ? {
          ...product,
        }
      : {
          name: "Apple",
          description: "Example text, lol",
          price: 199,
          category: "smartphone",
          stock: 99,
          isActive: "true",
        },
    mode: "onChange",
  });

  const { handleSubmit } = methods;
  console.log(product);
  function onSubmit(data: Product) {
    if (product?.id) {
      return mutate(
        { product: data, action: "edit" },
        {
          onSuccess: () => close && close(),
          onError: (error) => console.error("Error update product:", error),
        },
      );
    }

    mutate(
      { product: data },
      {
        onSuccess: () => close && close(),
        onError: (error) => console.error("Error create product:", error),
      },
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="mb-4 flex items-center justify-between border-b border-b-zinc-200 pb-4">
        <Heading level="h2" className="dark:text-white">
          {product?.id ? "Update product" : "Add new product"}
        </Heading>
        <XIcon
          onClick={close}
          className="cursor-pointer rounded-sm border border-zinc-200 text-zinc-600 hover:bg-zinc-200 dark:text-white dark:hover:bg-zinc-600"
        />
      </div>
      <form
        className="flex h-full flex-col justify-between gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-start justify-between gap-4">
          <Input
            name="name"
            label="Product name"
            placeholder="Enter product name"
            validation={{
              required: "This field is required.",
            }}
          />
          <Input
            name="price"
            label="Price"
            type="number"
            placeholder="Set product price"
            validation={{
              required: "This field is required.",
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Price must be greater than 0",
              },
            }}
          />
        </div>
        <Textarea
          name="description"
          label="Description"
          placeholder="Enter product description"
          validation={{
            required: "Description is required.",
            minLength: { value: 10, message: "Minimum 10 characters" },
          }}
        />
        <div className="flex items-start justify-between gap-4">
          <Select
            name="category"
            label="Category"
            options={[
              { value: "", label: "-- Choose category --" },
              { value: "smartphone", label: "Smartphone" },
              { value: "keyboard", label: "Keyboard" },
              { value: "watch", label: "Watch" },
              { value: "tablet", label: "Tablet" },
              { value: "earbuds", label: "Earbuds" },
              { value: "laptop", label: "Laptop" },
            ]}
            validation={{ required: "Choose category" }}
          />
          <Select
            name="isActive"
            label="Status"
            options={[
              { value: "", label: "-- Set status --" },
              { value: "true", label: "Active" },
              { value: "false", label: "Inactive" },
            ]}
            validation={{ required: "Set status" }}
          />
        </div>
        <div className="flex items-start justify-between gap-4">
          <FileUpload
            name="imageUrl"
            label="Image"
            // validation={{ required: "Image is required" }}
          />

          <Input
            name="stock"
            label="Stock number"
            type="number"
            placeholder="Enter product count in stock"
            validation={{
              required: "This field is required.",
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Stock must be positive number",
              },
            }}
          />
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="mt-4 rounded px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? <SpinnerMini /> : product?.id ? "Update" : "Submit"}
        </Button>
      </form>
    </FormProvider>
  );
};
