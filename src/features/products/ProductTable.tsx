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
import { AddProduct } from "./AddProduct";
import { SortSelect } from "../../ui/SortSelect";
import { Heading } from "../../ui/Heading";
import { useSearchParams } from "react-router";
import { filterOptions, toggleOptions } from "../../data/filterOptions";
import { ToggleButtons } from "../../ui/ToggleButton";
import { sortOptions } from "../../data/sortOptions";
import { FilterByNameInput } from "../../ui/FilterByNameInput";

export const ProductTable = () => {
  const { data, isLoading } = useGetProducts();
  const [productsDelete, setProductsDelete] = React.useState<string[]>([]);
  const [allSelected, setAllSelected] = React.useState(false);
  const { mutateAsync, isPending } = useDeleteAllProducts();
  const [searchParams] = useSearchParams();
  let filterProducts: Product[] = [];

  /* FILTER BY STATUS AND CATEGORY */
  const filterByStatus = searchParams.get("isActive") || "all";
  const filterByCategory = searchParams.get("category") || "all";
  const filterByName = searchParams.get("name") || "all";

  filterProducts = (data ?? [])
    .filter((p) =>
      filterByStatus === "all" ? true : String(p.isActive) === filterByStatus,
    )
    .filter((p) =>
      filterByCategory === "all" ? true : p.category === filterByCategory,
    ).filter((p) =>
      filterByName === "all"
        ? true
        : p.name.toLowerCase().includes(filterByName.toLowerCase())
    );

  /* SORT BY */
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [filteredKey, value] = sortBy.split("-");

  const prods = () => {
    if (!data || !filteredKey) return data;

    return [...filterProducts].sort((a, b) => {
      const aValue = a[filteredKey as keyof Product];
      const bValue = b[filteredKey as keyof Product];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return value === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return value === "asc" ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
  };

  const products = prods();

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
        <div className="flex items-center justify-between">
          <Modal>
            {productsDelete.length ? (
              <div className="flex gap-2">
                <Modal.Open openName="delete">
                  <Button size="md" variant="delete">
                    Delete products
                  </Button>
                </Modal.Open>
                <Button size="md" variant="primary">
                  Export CSV
                </Button>
              </div>
            ) : null}
            <Modal.Window name="delete">
              <Delete
                isPending={isPending}
                handle={async () => {
                  await mutateAsync(
                    { products: productsDelete },
                    {
                      onSuccess: () => setAllSelected(false),
                      onError: (error) =>
                        console.error("Error update product:", error),
                    },
                  );
                }}
              ></Delete>
            </Modal.Window>
          </Modal>
          <div className="ml-auto flex items-center gap-4">
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
            data={products}
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
      </Tooltip>
    </React.Fragment>
  );
};
