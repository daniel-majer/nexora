import React from "react";
import { OrderActionBtns } from "../features/orders/OrderActionBtns";
import { OrderHeading } from "../features/orders/OrderHeading";
import { OrderInfo } from "../features/orders/OrderInfo";
import { OrderItems } from "../features/orders/OrderItems";
import { OrderSummary } from "../features/orders/OrderSummary";
import { useOrder } from "../features/orders/useOrder";
import { Spinner } from "../ui/Spinner";
import type { Constants } from "../types/supabase";

// type OrderStatus = keyof typeof Constants.public.Enums.orderStatus;

export const OrderDetail = () => {
  const { data, isPending } = useOrder();
  const [state, setState] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (data?.status) {
      setState(data.status);
    }
  }, [data?.status]);

  if (!data) return <p>No data provided!</p>;

  if (isPending)
    return (
      <div className="grid h-screen place-items-center">
        <Spinner />
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl p-8 text-gray-800 dark:text-gray-100">
      {/* Order Heading */}
      <OrderHeading paymentStatus={data?.paymentStatus} />

      {/* Order Summary */}
      <OrderSummary id={data?.id}>
        <OrderInfo data={data} state={state} setState={setState} />
      </OrderSummary>

      {/* Items List */}
      <OrderItems data={data} />
      {/* Actions */}
      <OrderActionBtns state={state} status={data?.status} />
    </div>
  );
};
