import { BanIcon, LandmarkIcon, PackageIcon, TruckIcon } from "lucide-react";
import React from "react";
import { HeaderDash } from "../features/Dashboard/HeaderDash";
import { Tabs } from "../ui/Tabs";
import { formatCurrency } from "../utils/helper";
import { TodayOrders } from "../features/Dashboard/TodayOrders";
import { PieChartGraph } from "../features/Dashboard/PieChart";
import { useDashboardOrders } from "../features/Dashboard/useDashboardOrders";
import type { Orders } from "../types/supabase-types";
import { AreaSalesChart } from "../features/Dashboard/AreaSalesChart";
import { Spinner } from "../ui/Spinner";

export const Dashboard = () => {
  const { data, isLoading } = useDashboardOrders();

  const totalSales = data?.reduce(
    (sum, order: Orders) => sum + order.totalAmount,
    0,
  );

  const totalShipped = data?.filter((order: Orders) => !order.shippedAt);

  const cancelRate = (
    ((data?.filter((order: Orders) => order?.status === "cancelled")?.length ??
      0) /
      (data?.length ?? 1)) *
    100
  ).toFixed(2);

  const lastOrders = data?.slice(0, 5).map((order: Orders) => {
    return {
      id: order.id,
      status: order.status,
      customer: order.customers.name,
      total: formatCurrency(order.totalAmount) ?? "",
    };
  });

  return (
    <React.Fragment>
      <HeaderDash />
      <div>
        {isLoading || !data ? (
          <div className="grid h-screen place-items-center">
            <Spinner />
          </div>
        ) : (
          <>
            <Tabs
              options={[
                {
                  label: "Orders",
                  value: (data?.length ?? 0 * 102).toString(),
                  icon: PackageIcon,
                  colors: { bg: "bg-yellow-200", text: "text-yellow-800" },
                },
                {
                  label: "Sales",
                  value: formatCurrency(totalSales) ?? "",
                  icon: LandmarkIcon,
                  colors: { bg: "bg-green-200", text: "text-green-800" },
                },
                {
                  label: "Shipped products",
                  value: (totalShipped?.length ?? 0 * 102).toString(),
                  icon: TruckIcon,
                  colors: { bg: "bg-purple-200", text: "text-purple-800" },
                },
                {
                  label: "Cancelled rate",
                  value: `${cancelRate} %`,
                  icon: BanIcon,
                  colors: { bg: "bg-red-200", text: "text-red-800" },
                },
              ]}
            />
            <div className="mt-6 grid grid-cols-1 gap-6 md:mt-10 2xl:grid-cols-2">
              <TodayOrders orders={lastOrders} />
              <PieChartGraph data={data} />
            </div>

            <AreaSalesChart data={data} />
          </>
        )}
      </div>
    </React.Fragment>
  );
};
