import React from "react";
import { ProductTable } from "../features/products/ProductTable";
import { Heading } from "../ui/Heading";

export const Products = () => {
  return (
    <React.Fragment>
      <div className="mb-4 border-b border-b-zinc-200 pb-8 transition duration-500 sm:mb-6 dark:border-b-zinc-700">
        <Heading level="h1">Product List</Heading>
        <Heading
          level="h3"
          className="mt-2 font-extralight text-zinc-500 transition duration-500 dark:text-zinc-300"
        >
          Here you can find a table listing all available products. Browse
          through the list to view details and manage your product inventory
          efficiently.
        </Heading>
      </div>
      <ProductTable />
    </React.Fragment>
  );
};
