import React from "react";
import { ProductTable } from "../features/products/ProductTable";
import { Heading } from "../ui/Heading";

export const Products = () => {
  return (
    <React.Fragment>
      <Heading level="h1" className="mb-6">
        Product List
      </Heading>
      <ProductTable />
    </React.Fragment>
  );
};
