import React from "react";
import Table from "../../ui/Table";
import { ProductRow } from "./ProductRow";
import type { Product } from "../../types/types";
import { productHeader } from "../../data/table-headers";
import { useGetProducts } from "../../services/products/useGetProducts";
import Tooltip from "../../ui/Tooltip";

export const ProductTable = () => {
  const { data: products, isLoading } = useGetProducts();

  return (
    <React.Fragment>
      <Tooltip>
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
      </Tooltip>
    </React.Fragment>
  );
};
