import React from "react";
import {
  deliveryMethodOptions,
  paymentMethodOptions,
  statusOptions,
} from "../../data/filterOptions";
import { sortOrders } from "../../data/sortOptions";
import { orderHeader } from "../../data/table-headers";
import type { Order } from "../../types/types";
import { FilterByNameInput } from "../../ui/FilterByNameInput";
import { Pagination } from "../../ui/Pagination";
import { SortSelect } from "../../ui/SortSelect";
import Table from "../../ui/Table";
import { OrderRow } from "./OrderRow";
import { useOrders } from "./useOrders";
import type { Orders } from "../../types/supabase-types";

export const OrderTable = () => {
  const { orders, isLoading, count } = useOrders();
  console.log(orders);

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
        columns="0.4fr 4fr 2.5fr 3fr 2fr 3fr 2fr 2.5fr"
      >
        <Table.Header data={orderHeader} />
        <Table.Body
          data={orders}
          render={(order: Orders) => <OrderRow order={order} key={order.id} />}
        />
      </Table>
      <Pagination count={count} />
    </React.Fragment>
  );
};
