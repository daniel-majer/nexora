import React from "react";
import { useProducts } from "../services/apiProducts";
import { Heading } from "../ui/Heading";
import Table from "../ui/Table";
import { ProductRow } from "../ui/ProductRow";
import type { Product } from "../types/types";

export const Products = () => {
  const { data: products, isLoading } = useProducts();
  console.log(products);

  if (products) console.log(products);

  return (
    <React.Fragment>
      <Heading level="h1">Products List</Heading>
      <Table
        isLoading={isLoading}
        columns="0.2fr 0.2fr 3.5fr 1.5fr 1fr 1fr 1fr 1fr"
      >
        <Table.Header>
          <th></th>
          <th className="flex items-center">
            <input id="indigoCheckBox" type="checkbox" className="h-4 w-4" />
          </th>
          <th>Product</th>
          <th>Category</th>
          <th>Stock</th>
          <th>Price</th>
          <th>Status</th>
          <th>Action</th>
        </Table.Header>
        <Table.Body
          products={products}
          render={(product: Product) => (
            <ProductRow product={product} key={product.id} />
          )}
        />
      </Table>
    </React.Fragment>
  );
};
