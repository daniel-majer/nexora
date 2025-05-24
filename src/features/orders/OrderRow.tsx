import { format } from "date-fns";
import {
  CarIcon,
  CircleUserRoundIcon,
  CoinsIcon,
  CreditCardIcon,
  EyeIcon,
  LandmarkIcon,
  ShoppingBasketIcon,
  ShoppingCartIcon,
  TruckIcon,
} from "lucide-react";
import { NavLink } from "react-router";
import paypal from "../../assets/paypal-svgrepo-com.svg";
import { DeliveryMethods, PaymentMethods, Status } from "../../types/constants";
import type { Order } from "../../types/types";
import Badge from "../../ui/Badge";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helper";

export const OrderRow = ({ order }: { order: Order }) => {
  const {
    status,
    paymentMethod,
    deliveryMethod,
    totalAmount,
    createdAt,
    customers,
    id,
  } = order;

  console.log(order);

  return (
    <Table.Row>
      <td></td>
      {/* customer name */}
      <td className="flex items-center gap-2">
        <CircleUserRoundIcon size={30} />
        <div className="flex flex-col">
          <span>{customers?.name}</span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {customers?.email}
          </span>
        </div>
      </td>
      {/* date */}
      <td className="flex items-center text-sm whitespace-nowrap text-zinc-600 transition duration-500 dark:text-zinc-300">
        {format(createdAt, "d. M. yyyy, HH:mm")}
      </td>
      {/* payment method */}
      <td className="flex items-center">
        {paymentMethod === PaymentMethods.CreditCard ? (
          <Badge>
            <div className="flex items-center gap-2">
              <CreditCardIcon size={16} />
              <span>Credit Card</span>
            </div>
          </Badge>
        ) : paymentMethod === PaymentMethods.PayPal ? (
          <Badge>
            <div className="flex items-center gap-2">
              <img src={paypal} width={16} alt="" />
              <span>PayPal</span>
            </div>
          </Badge>
        ) : paymentMethod === PaymentMethods.BankTransfer ? (
          <Badge>
            <div className="flex items-center gap-2">
              <LandmarkIcon size={16} />
              <span>Bank Transfer</span>
            </div>
          </Badge>
        ) : paymentMethod === PaymentMethods.CashOnDelivery ? (
          <Badge>
            <div className="flex items-center gap-2">
              <CoinsIcon size={16} />
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
        {deliveryMethod === DeliveryMethods.Standard ? (
          <Badge>
            <div className="flex items-center gap-2">
              <ShoppingCartIcon size={16} />
              <span>Standard</span>
            </div>
          </Badge>
        ) : deliveryMethod === DeliveryMethods.Express ? (
          <Badge>
            <div className="flex items-center gap-2">
              <TruckIcon size={16} />
              <span>Express</span>
            </div>
          </Badge>
        ) : deliveryMethod === DeliveryMethods.Pickup ? (
          <Badge>
            <div className="flex items-center gap-2">
              <ShoppingBasketIcon size={16} />
              <span>Pickup</span>
            </div>
          </Badge>
        ) : deliveryMethod === DeliveryMethods.SameDay ? (
          <Badge>
            <div className="flex items-center gap-2">
              <CarIcon size={16} />
              <span>Same day</span>
            </div>
          </Badge>
        ) : (
          "Unknown"
        )}
      </td>
      {/* total */}
      <td className="flex items-center">{formatCurrency(totalAmount)}</td>

      {/* action */}
      <td className="flex items-center">
        <NavLink
          to={id}
          className="group flex cursor-pointer items-center gap-2 rounded-lg bg-zinc-200 p-2 hover:bg-zinc-200 dark:text-black"
        >
          <EyeIcon className="dark:group-hover:text-zinc-800" size={20} />
          <span>Details</span>
        </NavLink>
      </td>
    </Table.Row>
  );
};
