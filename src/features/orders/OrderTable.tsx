import React from "react";
import { useOrders } from "../../services/apiOrders";
import Table from "../../ui/Table";
import { orderHeader } from "../../data/table-headers";
import type { Order } from "../../types/types";
import { OrderRow } from "./OrderRow";

export const OrderTable = () => {
  const { data: orders, isLoading } = useOrders();

  if (orders) console.log(orders);

  return (
    <React.Fragment>
      <Table
        isLoading={isLoading}
        columns="0.4fr 3fr 2.5fr 3fr 2fr 3fr 2fr 2.5fr 1.5fr"
      >
        <Table.Header data={orderHeader} />
        <Table.Body
          data={orders}
          render={(order: Order) => <OrderRow order={order} key={order.id} />}
        />
      </Table>
    </React.Fragment>
  );
};
