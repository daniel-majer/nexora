import React from "react";
import { useProducts } from "../services/apiProducts";
import { Heading } from "../ui/Heading";
import { ProductTable } from "../features/products/ProductTable";

export const Products = () => {
  return (
    <React.Fragment>
      <Heading level="h1">Product List</Heading>
      <ProductTable />
    </React.Fragment>
  );
};
