import { OrderHeading } from "../features/orders/OrderHeading";
import { OrderInfo } from "../features/orders/OrderInfo";
import { OrderInfoHeader } from "../features/orders/OrderInfoHeader";
import { OrderSummary } from "../features/orders/OrderSummary";
import { useOrder } from "../features/orders/useOrder";
import { Button } from "../ui/Button";
import { Spinner } from "../ui/Spinner";
const order = {
  id: "ORD-20240524-001",
  paymentStatus: "paid" /* paymentStatus: "pending" | "paid" | "failed"; */,
  customer: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 123 456 7890",
    address: "123 Elm Street, Springfield",
  },
  createdAt: "2025-05-24",
  status,
  items: [
    { id: 1, name: "Wireless Mouse", quantity: 2, price: 29.99 },
    { id: 2, name: "Bluetooth Keyboard", quantity: 1, price: 49.99 },
  ],
} as const;

export const OrderDetail = () => {
  const { data, isPending } = useOrder();

  if (isPending)
    return (
      <div className="grid h-screen place-items-center">
        <Spinner />
      </div>
    );

  if (!data) return <p>No order data found</p>;

  const { id, status, paymentStatus } = data;

  const customId = `#${id?.split("-")?.[0]}`;

  return (
    <div className="mx-auto max-w-7xl p-8 text-gray-800 dark:text-gray-100">
      {/* Order Heading */}
      <OrderHeading paymentStatus={paymentStatus} />

      {/* Order Summary */}
      <OrderSummary>
        <OrderInfoHeader id={customId} status={status} />
        <OrderInfo data={data} />
      </OrderSummary>

      {/* Items List */}
      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-zinc-900">
        <h2 className="mb-4 text-xl font-semibold">🛒 Ordered Items</h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between py-4">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-500 dark:text-gray-400">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button
          size="md"
          variant="delete"
          className="rounded-lg border border-red-500 px-5 py-2.5 font-semibold text-red-600 transition dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          Cancel Order
        </Button>
        <Button
          size="md"
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};
