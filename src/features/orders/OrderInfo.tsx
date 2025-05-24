import React from "react";
import type { Order } from "../../types/types";

export const OrderInfo = ({ data }: { data: Order }) => {
  const { customers, createdAt, order_items, totalAmount } = data;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
      <div>
        <h2 className="mb-2 text-lg font-semibold">📦 Order Info</h2>
        <p>
          <span className="font-medium">Date:</span>{" "}
          {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
        </p>
        <p>
          <span className="font-medium">Total Items:</span>{" "}
          {order_items?.length ?? "N/A"}
        </p>
        <p>
          <span className="font-medium">Total Price:</span> $
          {totalAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
};
