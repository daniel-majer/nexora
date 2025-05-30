import React from "react";
import { ProductTable } from "../features/products/ProductTable";
import { Heading } from "../ui/Heading";

export const Products = () => {
  return (
    <React.Fragment>
      <Heading level="h1">Product List</Heading>
      <Heading
        level="h3"
        className="mt-2 mb-6 font-extralight text-zinc-500 transition duration-500 dark:text-zinc-300"
      >
        Here you can find a table listing all available products. Browse through the list to view details and manage your product inventory efficiently.
      </Heading>
      <ProductTable />
    </React.Fragment>
  );
};
