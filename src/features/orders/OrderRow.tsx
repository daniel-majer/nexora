import {
  CarIcon,
  CircleUserRoundIcon,
  CoinsIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  LandmarkIcon,
  ShoppingBasketIcon,
  ShoppingCartIcon,
  TruckIcon,
} from "lucide-react";
import type { Order } from "../../types/types";
import Table from "../../ui/Table";
import { format } from "date-fns";
import { DeliveryMethods, PaymentMethods, Status } from "../../types/constants";
import Badge from "../../ui/Badge";
import paypal from "../../assets/paypal-svgrepo-com.svg";

export const OrderRow = ({ order }: { order: Order }) => {
  const {
    customers,
    orderDate,
    status,
    paymentMethodId,
    deliveryMethodId,
    totalAmount,
    employees,
  } = order;

  return (
    <Table.Row>
      <td></td>
      {/* customer name */}
      <td className="flex items-center gap-2">
        <CircleUserRoundIcon />
        <span>{customers?.name}</span>
      </td>
      {/* date */}
      <td className="flex items-center text-sm whitespace-nowrap text-zinc-600 transition duration-500 dark:text-zinc-300">
        {format(orderDate, "d. M. yyyy, HH:mm")}
      </td>
      {/* payment method */}
      <td className="flex items-center">
        {paymentMethodId === PaymentMethods.CreditCard ? (
          <Badge>
            <div className="flex items-center gap-2">
              <CreditCardIcon />
              <span>Credit Card</span>
            </div>
          </Badge>
        ) : paymentMethodId === PaymentMethods.PayPal ? (
          <Badge>
            <div className="flex items-center gap-2">
              <img src={paypal} width={20} alt="" />
              <span>PayPal</span>
            </div>
          </Badge>
        ) : paymentMethodId === PaymentMethods.BankTransfer ? (
          <Badge>
            <div className="flex items-center gap-2">
              <LandmarkIcon />
              <span>Bank Transfer</span>
            </div>
          </Badge>
        ) : paymentMethodId === PaymentMethods.CashOnDelivery ? (
          <Badge>
            <div className="flex items-center gap-2">
              <CoinsIcon />
              <span>Cash</span>
            </div>
          </Badge>
        ) : (
          "Unknown"
        )}
      </td>
      {/* status */}
      <td className="flex items-center">
        {Status.Pending === status ? (
          <Badge>{status}</Badge>
        ) : Status.Processing === status ? (
          <Badge variant="warning">{status}</Badge>
        ) : Status.Shipped === status ? (
          <Badge variant="primary">{status}</Badge>
        ) : Status.Delivered === status ? (
          <Badge variant="success">{status}</Badge>
        ) : (
          <Badge variant="danger">{status}</Badge>
        )}
      </td>
      {/* delivery method */}
      <td className="flex items-center">
        {deliveryMethodId === DeliveryMethods.Standard ? (
          <Badge>
            <div className="flex items-center gap-2">
              <ShoppingCartIcon />
              <span>Standard</span>
            </div>
          </Badge>
        ) : deliveryMethodId === DeliveryMethods.Express ? (
          <Badge>
            <div className="flex items-center gap-2">
              <TruckIcon />
              <span>Express</span>
            </div>
          </Badge>
        ) : deliveryMethodId === DeliveryMethods.Pickup ? (
          <Badge>
            <div className="flex items-center gap-2">
              <ShoppingBasketIcon />
              <span>Pickup</span>
            </div>
          </Badge>
        ) : deliveryMethodId === DeliveryMethods.SameDay ? (
          <Badge>
            <div className="flex items-center gap-2">
              <CarIcon />
              <span>Same day</span>
            </div>
          </Badge>
        ) : (
          "Unknown"
        )}
      </td>
      {/* total */}
      <td className="flex items-center">{totalAmount} €</td>
      {/* employee */}
      <td className="flex items-center gap-2">
        <CircleUserRoundIcon />
        <span>{employees?.name}</span>
      </td>
      {/* action */}
      <td className="flex items-center">
        <div className="group cursor-pointer rounded-sm p-2 hover:bg-zinc-200">
          <EllipsisVerticalIcon className="dark:group-hover:text-zinc-800" />
        </div>
      </td>
    </Table.Row>
  );
};
