import React from "react";
import { format } from "date-fns";
import { formatCurrency } from "../../utils/helper";
import { Status } from "../../types/constants";
import Badge from "../../ui/Badge";
import type { Database } from "../../types/supabase";
import type { Orders } from "../../types/supabase-types";

export const OrderInfo = ({
  data,
  state,
  setState,
}: {
  data: Orders;
  state?: string;
  setState: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const { customers, createdAt, order_items, totalAmount, shippedAt, status } =
    data;

  return (
    <div className="flex justify-between">
      {/* CUSTOMER INFO */}
      <div>
        <h2 className="mb-2 text-lg font-semibold">👤 Customer Info</h2>
        <p>
          <span className="font-medium">Name:</span> {customers?.name}
        </p>
        <p>
          <span className="font-medium">Email:</span> {customers?.email}
        </p>
        <p>
          <span className="font-medium">Phone:</span> {customers?.phone}
        </p>
        <p>
          <span className="font-medium">Address:</span> {customers?.address}
        </p>
      </div>
      {/* ORDER INFO */}
      <div>
        <h2 className="mb-2 text-lg font-semibold">📦 Order Info</h2>
        <p>
          <span className="font-medium">Date:</span>{" "}
          {format(new Date(createdAt), "d. M. yyyy, HH:mm") || "N/A"}
        </p>
        <p>
          <span className="font-medium">Total Items:</span>{" "}
          {order_items?.length ?? "N/A"}
        </p>
        <p>
          <span className="font-medium">Total Price:</span>{" "}
          {formatCurrency(totalAmount)}
        </p>
      </div>
      {/* ORDER STATUS */}
      <div className="text-gray-500 dark:text-gray-400">
        <label
          htmlFor="status"
          className="mb-1 block font-medium text-zinc-900"
        >
          🚢 Order status
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
            value={state || status}
            onChange={(e) =>
              setState(
                e.target.value as Database["public"]["Enums"]["orderStatus"],
              )
            }
            className="rounded border border-gray-300 px-2 py-1 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            disabled={status === "delivered" || status === "cancelled"}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="pt-4">
          <p className="font-medium">
            <span className="font-medium text-zinc-800">Shipped at:</span>{" "}
            {shippedAt ? format(shippedAt, "d. M. yyyy, HH:mm") : "N/A"}{" "}
          </p>
          <p>
            <span className="font-medium text-zinc-800">Delivered at:</span>{" "}
            N/A{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
