import React from "react";
import { AddProduct } from "../features/products/AddProduct";
import { ProductTable } from "../features/products/ProductTable";
import { Heading } from "../ui/Heading";

export const Products = () => {
  return (
    <React.Fragment>
      <div className="flex items-center justify-between">
        <Heading level="h1">Product List</Heading>
        <AddProduct />
      </div>
      <ProductTable />
    </React.Fragment>
  );
};
