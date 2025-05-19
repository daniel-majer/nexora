import React from "react";
import { FormProvider, useForm, type UseFormReturn } from "react-hook-form";
import type { Product } from "../../types/types";
import { Input } from "../../ui/Input";
import { Heading } from "../../ui/Heading";
import { Button } from "../../ui/Button";
import { Textarea } from "../../ui/Textarea";
import { Select } from "../../ui/Select";
import { FileUpload } from "../../ui/InputFile";

export const AddProductForm = () => {
  const methods: UseFormReturn<Product> = useForm<Product>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      imageUrl: "",
    },
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  function onSubmit(data: Product) {
    console.log(data);
  }

  return (
    <FormProvider {...methods}>
      <Heading level="h2" className="mb-4 border-b border-b-zinc-200 pb-4">
        Add new product
      </Heading>
      <form
        className="flex h-full flex-col justify-between gap-4"
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
                message: "Cena musí byť kladné číslo",
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
        <Select
          name="category"
          label="Category"
          options={[
            { value: "smartphone", label: "Smartphone" },
            { value: "keyboard", label: "Keyboard" },
            { value: "watch", label: "Watch" },
            { value: "tablet", label: "Tablet" },
            { value: "earbuds", label: "Earbuds" },
            { value: "laptop", label: "Laptop" },
          ]}
          validation={{ required: "Choose category" }}
        />

        <FileUpload
          name="image"
          label="Image"
          validation={{ required: "Image is required" }}
        />
        <Button
          type="submit"
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};
