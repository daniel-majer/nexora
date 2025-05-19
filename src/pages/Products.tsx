import { PlusIcon } from "lucide-react";
import React from "react";
import { ProductTable } from "../features/products/ProductTable";
import { Button } from "../ui/Button";
import { Heading } from "../ui/Heading";
import { AddProduct } from "../features/products/AddProduct";

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
