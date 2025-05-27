import { BanIcon, LandmarkIcon, PackageIcon, TruckIcon } from "lucide-react";
import React from "react";
import { HeaderDash } from "../features/Dashboard/HeaderDash";
import { Tabs } from "../ui/Tabs";
import { formatCurrency } from "../utils/helper";
import { TodayOrders } from "../features/Dashboard/TodayOrders";
import { PieChartGraph } from "../features/Dashboard/PieChart";

export const Dashboard = () => {
  return (
    <React.Fragment>
      <HeaderDash />
      <Tabs options={opt} />
      <div className="mt-10 grid grid-cols-2 gap-6">
        <TodayOrders
          orders={[
            {
              status: "cancelled",
              customer: "Petr Horak",
              total: formatCurrency(4554),
            },
            {
              status: "delivered",
              customer: "David Krok",
              total: formatCurrency(248),
            },
            {
              status: "pending",
              customer: "Jozef z Bazin",
              total: formatCurrency(1987),
            },
            {
              status: "shipped",
              customer: "Dano Drevo",
              total: formatCurrency(12548),
            },
            {
              status: "processing",
              customer: "Richard King",
              total: formatCurrency(1999),
            },
          ]}
        />
        <PieChartGraph />
      </div>
    </React.Fragment>
  );
};

const opt = [
  {
    label: "Orders",
    value: "1216",
    icon: PackageIcon,
    colors: { bg: "bg-yellow-200", text: "text-yellow-800" },
  },
  {
    label: "Sales",
    value: formatCurrency(1009235),
    icon: LandmarkIcon,
    colors: { bg: "bg-green-200", text: "text-green-800" },
  },
  {
    label: "Shipped products",
    value: "3097",
    icon: TruckIcon,
    colors: { bg: "bg-purple-200", text: "text-purple-800" },
  },
  {
    label: "Cancelled rate",
    value: "9%",
    icon: BanIcon,
    colors: { bg: "bg-red-200", text: "text-red-800" },
  },
];
