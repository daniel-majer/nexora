import React from "react";
import { OrderTable } from "../features/orders/OrderTable";
import { Heading } from "../ui/Heading";

export const Orders = () => {
  return (
    <React.Fragment>
      <Heading level="h1">Order List</Heading>
      <Heading
        level="h3"
        className="mt-2 mb-6 font-extralight text-zinc-500 transition duration-500 dark:text-zinc-300"
      >
        Here you can view, track, and manage all your orders in one place. Use
        the table below to review order details and update statuses.
      </Heading>
      <OrderTable />
    </React.Fragment>
  );
};
