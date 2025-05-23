import React from "react";
import { filterOptions, toggleOptions } from "../../data/filterOptions";
import { sortOptions } from "../../data/sortOptions";
import { CSVHeader, productHeader } from "../../data/table-headers";

import type { Product } from "../../types/types";
import { Button } from "../../ui/Button";
import { Delete } from "../../ui/Delete";
import { FilterByNameInput } from "../../ui/FilterByNameInput";
import { Modal } from "../../ui/Modal";
import { SortSelect } from "../../ui/SortSelect";
import Table from "../../ui/Table";
import { ToggleButtons } from "../../ui/ToggleButtons";
import Tooltip from "../../ui/Tooltip";
import { AddProduct } from "./AddProduct";
import { ProductRow } from "./ProductRow";
import { CSVLink } from "react-csv";
import { Pagination } from "../../ui/Pagination";
import { useGetProducts } from "./useGetProducts";
import { useDeleteAllProducts } from "./useDeleteAllProducts";

export const ProductTable = () => {
  const { products, isLoading, count } = useGetProducts();
  const { mutateAsync, isPending } = useDeleteAllProducts();
  const [productsDelete, setProductsDelete] = React.useState<string[]>([]);
  const [allSelected, setAllSelected] = React.useState(false);

  const toggleSelectAll = () => {
    if (!products) return;

    if (allSelected) {
      setProductsDelete([]);
    } else {
      setProductsDelete(products.map((u) => u.id));
    }
    setAllSelected(!allSelected);
  };

  return (
    <React.Fragment>
      <Tooltip>
        <div className="flex items-center justify-between gap-4">
          <Modal>
            {productsDelete.length && products ? (
              <div className="flex gap-2">
                <Modal.Open openName="delete">
                  <Button size="md" variant="delete">
                    Delete products
                  </Button>
                </Modal.Open>
                <CSVLink
                  data={products}
                  headers={CSVHeader}
                  filename="products.csv"
                  className="cursor-pointer rounded-md bg-purple-900 px-4 py-2 text-base font-semibold whitespace-nowrap text-white transition duration-500 hover:bg-purple-800 hover:opacity-80 dark:bg-purple-700 dark:hover:bg-purple-600"
                >
                  Export to CSV
                </CSVLink>
              </div>
            ) : null}
            <Modal.Window name="delete">
              <Delete
                isPending={isPending}
                handle={async () => {
                  await mutateAsync(
                    { products: productsDelete },
                    {
                      onSuccess: () => {
                        setProductsDelete([]);
                        setAllSelected(false);
                      },
                      onError: (error) =>
                        console.error("Error update product:", error),
                    },
                  );
                }}
              ></Delete>
            </Modal.Window>
          </Modal>
          <div className="ml-auto flex w-full items-center gap-4">
            <FilterByNameInput />
            <ToggleButtons
              options={toggleOptions}
              field="isActive"
              value="all"
            />
            <SortSelect options={filterOptions} field="category" value="all" />
            <SortSelect options={sortOptions} field="sortBy" value="name-asc" />

            <AddProduct />
          </div>
        </div>
        <Table
          isLoading={isLoading}
          columns="0.2fr 0.2fr 3.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr"
        >
          <Table.Header
            checkbox
            data={productHeader}
            toggleSelectAll={toggleSelectAll}
            allSelected={allSelected}
          />
          <Table.Body
            data={products ?? []}
            render={(product: Product) => (
              <ProductRow
                product={product}
                productsDelete={productsDelete}
                setProductsDelete={setProductsDelete}
                key={product.id}
                allSelected={allSelected}
                setAllSelected={setAllSelected}
              />
            )}
          />
        </Table>
        <Pagination count={count} />
      </Tooltip>
    </React.Fragment>
  );
};
