import React from "react";
import {
  deliveryMethodOptions,
  paymentMethodOptions,
  statusOptions,
} from "../../data/filterOptions";
import { sortOrders } from "../../data/sortOptions";
import { orderHeader } from "../../data/table-headers";
import { FilterByNameInput } from "../../ui/FilterByNameInput";
import { Pagination } from "../../ui/Pagination";
import { SortSelect } from "../../ui/SortSelect";
import Table from "../../ui/Table";
import { OrderRow } from "./OrderRow";
import { useOrders } from "./useOrders";
import type { Orders } from "../../types/supabase-types";

export const OrderTable = () => {
  const { orders, isLoading, count } = useOrders();

  return (
    <React.Fragment>
      <div className="ml-auto flex w-full flex-col items-center gap-4 lg:flex-row">
        <FilterByNameInput />
        <div className="grid w-full grid-cols-2 gap-1 sm:grid-cols-4 sm:gap-2">
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
          <SortSelect
            options={sortOrders}
            field="sortBy"
            value="createdAt-asc"
          />
        </div>
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
