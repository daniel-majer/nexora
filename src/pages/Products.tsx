import React from "react";
import { ProductTable } from "../features/products/ProductTable";
import { Heading } from "../ui/Heading";

export const Products = () => {
  return (
    <React.Fragment>
      <Heading level="h1">Product List</Heading>
      <Heading level="h3" className="mt-2 mb-6 font-extralight text-zinc-500">
        Fill in the details below to create a new user account.
      </Heading>
      <ProductTable />
    </React.Fragment>
  );
};
