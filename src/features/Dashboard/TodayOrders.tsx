import { UserCircle2Icon } from "lucide-react";
import { NavLink } from "react-router";
import { Status } from "../../types/constants";
import Badge from "../../ui/Badge";
import { Button } from "../../ui/Button";
import { Heading } from "../../ui/Heading";

type TodayProps = {
  id: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  customer: string;
  total: string;
};

export const TodayOrders = ({ orders }: { orders?: TodayProps[] }) => {
  return (
    <div className="rounded-md bg-zinc-100 p-4 transition duration-500 lg:p-6 dark:bg-zinc-900">
      <Heading
        level="h4"
        className="border-b border-b-zinc-200 pb-3 text-zinc-600 transition duration-500 lg:pb-6 dark:border-b-zinc-700 dark:text-white"
      >
        Last orders
      </Heading>
      <div className="mt-2 space-y-2 xl:mt-4 xl:space-y-3">
        {orders?.map((order) => {
          const { status, customer, id, total } = order;
          return (
            <div
              key={Math.random() * parseInt(total)}
              className="grid grid-cols-3 items-center border-b border-b-zinc-200 pb-2 transition duration-500 last:border-b-0 md:grid-cols-4 dark:border-b-zinc-700"
            >
              <div className="space-y-1 sm:space-y-2">
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
                <span className="flex gap-1 text-sm font-semibold sm:gap-2 md:hidden">
                  <UserCircle2Icon className="size-5" /> {customer}
                </span>
              </div>

              <span className="hidden gap-2 font-semibold md:flex">
                <UserCircle2Icon /> {customer}
              </span>
              <span className="text-center text-sm font-semibold sm:text-base">
                {total}
              </span>
              <div className="ml-auto">
                <NavLink to={`/orders/${id}`}>
                  <Button variant="primary">Details</Button>
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
