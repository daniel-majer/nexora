import React from "react";
import { useProducts } from "../../services/apiProducts";
import Table from "../../ui/Table";
import { ProductRow } from "./ProductRow";
import type { Product } from "../../types/types";
import { productHeader } from "../../data/table-headers";

export const ProductTable = () => {
  const { data: products, isLoading } = useProducts();

  if (products) console.log(products);

  return (
    <React.Fragment>
      <Table
        isLoading={isLoading}
        columns="0.2fr 0.2fr 3.5fr 1.5fr 1fr 1fr 1fr 1fr"
      >
        <Table.Header checkbox data={productHeader} />
        <Table.Body
          data={products}
          render={(product: Product) => (
            <ProductRow product={product} key={product.id} />
          )}
        />
      </Table>
    </React.Fragment>
  );
};
