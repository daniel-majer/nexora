import React from "react";
import { useOrders } from "../../services/apiOrders";
import Table from "../../ui/Table";
import { orderHeader } from "../../data/table-headers";
import type { Order } from "../../types/types";
import { OrderRow } from "./OrderRow";
import { FilterByNameInput } from "../../ui/FilterByNameInput";
import { ToggleButtons } from "../../ui/ToggleButtons";
import { SortSelect } from "../../ui/SortSelect";
import {
  deliveryMethodOptions,
  filterOptions,
  paymentMethodOptions,
  statusOptions,
  toggleOptions,
} from "../../data/filterOptions";
import { sortOptions, sortOrders } from "../../data/sortOptions";
import { AddProduct } from "../products/AddProduct";
import { useSearchParams } from "react-router";
import { useSortBy } from "../../hooks/useSortBy";

export const OrderTable = () => {
  const { data, isLoading } = useOrders();
  const [searchParams] = useSearchParams();
  let filterOrders: Order[] = [];

  /* FILTER BY STATUS AND CATEGORY */
  const filterByStatus = searchParams.get("status") || "all";
  const filterByPayment = searchParams.get("paymentMethod") || "all";
  const filterByDelivery = searchParams.get("deliveryMethod") || "all";
  const filterByName = searchParams.get("name") || "";

  filterOrders = (data ?? [])
    .filter((p) =>
      filterByStatus === "all" ? true : p.status === filterByStatus,
    )
    .filter((p) =>
      filterByPayment === "all"
        ? true
        : String(p.paymentMethod) === filterByPayment,
    )
    .filter((p) =>
      filterByDelivery === "all"
        ? true
        : String(p.deliveryMethod) === filterByDelivery,
    )
    .filter((p) =>
      filterByName === "all"
        ? true
        : p.customers.name.toLowerCase().includes(filterByName.toLowerCase()),
    );

  /* SORT BY */
  const { sortedData } = useSortBy<Order>({
    field: "createdAt-asc",
    originData: data ?? [],
    filterData: filterOrders,
  });

  return (
    <React.Fragment>
      <div className="ml-auto flex w-full items-center gap-4">
        <FilterByNameInput />
        <SortSelect
          options={deliveryMethodOptions}
          field="deliveryMethod"
          value="all"
        />
        <SortSelect
          options={paymentMethodOptions}
          field="paymentMethod"
          value="all"
        />
        <SortSelect options={statusOptions} field="status" value="all" />
        <SortSelect options={sortOrders} field="sortBy" value="createdAt-asc" />
      </div>
      <Table
        isLoading={isLoading}
        columns="0.4fr 4fr 2.5fr 3fr 2fr 3fr 2fr 2.5fr 2fr"
      >
        <Table.Header data={orderHeader} />
        <Table.Body
          data={sortedData}
          render={(order: Order) => (
            <OrderRow order={order} key={order.createdAt.toString()} />
          )}
        />
      </Table>
    </React.Fragment>
  );
};
