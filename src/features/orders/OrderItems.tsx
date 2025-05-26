import React from "react";
import type {
  OrderItems as Items,
  Orders,
  Product,
} from "../../types/supabase-types";
import { Heading } from "../../ui/Heading";
import { formatCurrency } from "../../utils/helper";
import { SHIPPING, TAX_RATE } from "../../types/constants";

export const OrderItems = ({ data }: { data: Orders }) => {
  const { order_items, totalAmount } = data;
  const tax = totalAmount * TAX_RATE;
  const totalIncTax = tax + totalAmount + SHIPPING;

  console.log(data);

  return (
    <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition duration-500 dark:border-gray-700 dark:bg-zinc-900">
      <div className="grid grid-cols-3 border-b border-b-zinc-200 text-end font-bold dark:border-b-zinc-700">
        <Heading level="h2" className="mb-4 text-start text-xl font-semibold">
          🛒 Ordered Items
        </Heading>
        <p>Price</p>
        <p>Total</p>
      </div>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {order_items?.map((item) => {
          if (!item.products) return;

          const {
            products: { name, price },
          } = item;

          return (
            <li key={item.id} className="grid grid-cols-3 py-4">
              <div>
                <p className="font-medium">{name}</p>
                <p className="text-gray-500 dark:text-gray-400">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="text-end font-semibold">{price.toFixed(2)} €</p>
              <p className="text-end font-semibold">
                {(price * item.quantity).toFixed(2)} €
              </p>
            </li>
          );
        })}
      </ul>

      <div className="mb-6 rounded-lg bg-purple-100 p-4 font-medium transition duration-500 dark:bg-purple-800/20">
        <div className="flex grow justify-between text-lg">
          <div>
            Sutotal:{" "}
            <span className="font-bold">
              {formatCurrency(totalAmount)}
            </span>{" "}
          </div>
          <div>
            Tax: <span className="font-bold">{formatCurrency(tax)}</span>
          </div>
          <div>
            Shipping:{" "}
            <span className="font-bold">{formatCurrency(SHIPPING)}</span>
          </div>
          <div>
            Total:{" "}
            <span className="font-bold">{formatCurrency(totalIncTax)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
