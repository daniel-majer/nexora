import React from "react";
import { Heading } from "../../ui/Heading";
import Badge from "../../ui/Badge";
import { Status } from "../../types/constants";
import { EyeIcon, SquareUserIcon } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "../../ui/Button";

type TodayProps = {
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
          return (
            <div className="grid grid-cols-4 items-center border-b border-b-zinc-200 pb-2 last:border-b-0">
              <div>
                {Status.Pending === order.status ? (
                  <Badge>{order.status.toUpperCase()}</Badge>
                ) : Status.Processing === order.status ? (
                  <Badge variant="warning">{order.status.toUpperCase()}</Badge>
                ) : Status.Shipped === order.status ? (
                  <Badge variant="primary">{order.status.toUpperCase()}</Badge>
                ) : Status.Delivered === order.status ? (
                  <Badge variant="success">{order.status.toUpperCase()}</Badge>
                ) : (
                  <Badge variant="danger">{order.status.toUpperCase()}</Badge>
                )}
              </div>

              <span className="flex gap-2 font-semibold">
                <SquareUserIcon /> {order.customer}
              </span>
              <span className="text-center">{order.total}</span>
              <div className="ml-auto">
                <Button variant="primary">
                  <NavLink to="id">Details</NavLink>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
