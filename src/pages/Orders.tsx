import React from "react";
import { OrderTable } from "../features/orders/OrderTable";
import { Heading } from "../ui/Heading";

export const Orders = () => {
  return (
    <React.Fragment>
      <Heading level="h1">Order List</Heading>
      <Heading level="h3" className="mt-2 mb-6 font-extralight text-zinc-500">
        Fill in the details below to create a new user account.
      </Heading>
      <OrderTable />
    </React.Fragment>
  );
};
