import React from "react";
import Badge from "../../ui/Badge";
import { Status } from "../../types/constants";

type OrderInfoProps = {
  id: string;
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | undefined;
};

export const OrderInfoHeader = ({ id, status }: OrderInfoProps) => {
  const [state, setState] = React.useState(status);

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 dark:text-gray-400">Order ID</p>
        <p className="text-xl font-semibold tracking-wide">
          {id.toUpperCase()}
        </p>
      </div>

      <div className="text-gray-500 dark:text-gray-400">
        <label htmlFor="status" className="mb-1 block font-medium">
          Order status
        </label>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {Status.Pending === state ? (
              <Badge className="p-4 text-lg">{state}</Badge>
            ) : Status.Processing === state ? (
              <Badge variant="warning">{state}</Badge>
            ) : Status.Shipped === state ? (
              <Badge variant="primary">{state}</Badge>
            ) : Status.Delivered === state ? (
              <Badge variant="success">{state}</Badge>
            ) : (
              <Badge variant="danger">{state}</Badge>
            )}
          </div>
          <select
            id="status"
            value={state}
            onChange={(e) =>
              setState(e.target.value as OrderInfoProps["status"])
            }
            className="rounded border border-gray-300 px-2 py-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </div>
  );
};
