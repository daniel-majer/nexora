import { differenceInYears, format, parseISO } from "date-fns";
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
import paypal from "../../assets/paypal-svgrepo-com.svg";
import { DeliveryMethods, PaymentMethods, Status } from "../../types/constants";
import type { Employees } from "../../types/types";
import Badge from "../../ui/Badge";
import Table from "../../ui/Table";

export const EmployeeRow = ({ employee }: { employee: Employees }) => {
  const { name, email, position, department, hired, phone, birth } = employee;

  return (
    <Table.Row>
      <td></td>
      {/* employee name */}
      <td className="flex items-center gap-2">
        <CircleUserRoundIcon />
        <span>{name}</span>
      </td>
      {/* email */}
      <td className="flex items-center whitespace-nowrap transition duration-500 dark:text-zinc-300">
        {email}
      </td>
      {/* position */}
      <td className="flex items-center">
        <Badge>
          <div className="flex items-center gap-2">
            <span>{position}</span>
          </div>
        </Badge>
      </td>
      {/* department */}
      <td className="flex items-center gap-2">
        <Badge>
          <span>{department}</span>
        </Badge>
      </td>
      {/* hired date */}
      <td className="flex items-center">{format(hired, "d. M. yyyy")}</td>
      {/* phone number */}
      <td className="flex items-center">{phone}</td>
      {/* birth date */}
      <td className="flex items-center">
        {differenceInYears(new Date(), parseISO(birth))} yo.
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
