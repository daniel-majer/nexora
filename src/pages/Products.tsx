import { PlusIcon } from "lucide-react";
import React from "react";
import { ProductTable } from "../features/products/ProductTable";
import { Button } from "../ui/Button";
import { Heading } from "../ui/Heading";

export const Products = () => {
  return (
    <React.Fragment>
      <div className="flex items-center justify-between">
        <Heading level="h1">Product List</Heading>
        <Button size="lg" className="flex items-center gap-2">
          <PlusIcon />
          <span>Add product</span>
        </Button>
      </div>
      <ProductTable />
    </React.Fragment>
  );
};
