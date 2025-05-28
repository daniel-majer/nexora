import React from "react";
import { Heading } from "../../ui/Heading";
import Badge from "../../ui/Badge";
import { Status } from "../../types/constants";
import { EyeIcon, SquareUserIcon } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "../../ui/Button";
import { useDashboardOrders } from "./useDashboardOrders";

type TodayProps = {
  id: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  customer: string;
  total: string;
};

export const TodayOrders = ({ orders }: { orders: TodayProps[] }) => {
  return (
    <div className="bg-zinc-100 p-6">
      <Heading
        level="h4"
        className="border-b border-b-zinc-200 pb-6 text-zinc-600"
      >
        Last orders
      </Heading>
      <div className="mt-4 space-y-4">
        {orders.map((order) => {
          const { status, customer, id, total } = order;
          return (
            <div
              key={Math.random() * parseInt(total)}
              className="grid grid-cols-4 items-center border-b border-b-zinc-200 pb-2 last:border-b-0"
            >
              <div>
                {Status.Pending === status ? (
                  <Badge>{status.toUpperCase()}</Badge>
                ) : Status.Processing === status ? (
                  <Badge variant="warning">{status.toUpperCase()}</Badge>
                ) : Status.Shipped === status ? (
                  <Badge variant="primary">{status.toUpperCase()}</Badge>
                ) : Status.Delivered === status ? (
                  <Badge variant="success">{status.toUpperCase()}</Badge>
                ) : (
                  <Badge variant="danger">{status.toUpperCase()}</Badge>
                )}
              </div>

              <span className="flex gap-2 font-semibold">
                <SquareUserIcon /> {customer}
              </span>
              <span className="text-center">{total}</span>
              <div className="ml-auto">
                <Button variant="primary">
                  <NavLink to={`/orders/${id}`}>Details</NavLink>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
