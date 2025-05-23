import React from "react";
import { OrderTable } from "../features/orders/OrderTable";
import { Heading } from "../ui/Heading";

export const Orders = () => {
  return (
    <React.Fragment>
      <Heading level="h1" className="mb-6">
        Order List
      </Heading>
      <OrderTable />
    </React.Fragment>
  );
};
