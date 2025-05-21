import React from "react";
import Table from "../../ui/Table";
import { ProductRow } from "./ProductRow";
import type { Product } from "../../types/types";
import { productHeader } from "../../data/table-headers";
import { useGetProducts } from "../../services/products/useGetProducts";
import Tooltip from "../../ui/Tooltip";
import { Button } from "../../ui/Button";
import { Modal } from "../../ui/Modal";
import { Delete } from "../../ui/Delete";
import { useDeleteAllProducts } from "../../services/products/useDeleteAllProducts";

export const ProductTable = () => {
  const { data: products, isLoading } = useGetProducts();
  const [productsDelete, setProductsDelete] = React.useState<string[]>([]);
  const { mutate, isPending } = useDeleteAllProducts();
  console.log(productsDelete);

  return (
    <React.Fragment>
      <Tooltip>
        <Modal>
          <Modal.Open openName="delete">
            <Button size="sm" variant="delete" className="mt-6">
              Delete products
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <Delete
              handle={() => mutate({ products: productsDelete })}
            ></Delete>
          </Modal.Window>
        </Modal>
        <Table
          isLoading={isLoading}
          columns="0.2fr 0.2fr 3.5fr 1.5fr 1fr 1fr 1fr 1fr"
        >
          <Table.Header checkbox data={productHeader} />
          <Table.Body
            data={products}
            render={(product: Product) => (
              <ProductRow
                product={product}
                productsDelete={productsDelete}
                setProductsDelete={setProductsDelete}
                key={product.id}
              />
            )}
          />
        </Table>
      </Tooltip>
    </React.Fragment>
  );
};
