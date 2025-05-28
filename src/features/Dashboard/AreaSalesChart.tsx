import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Orders } from "../../types/supabase-types";
import { Heading } from "../../ui/Heading";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

export const AreaSalesChart = ({ data }: { data: Orders[] }) => {
  const colors = {
    totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
    text: "#374151",
    background: "#fff",
  };

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), 14),
    end: new Date(),
  });

  const dataSales = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: data
        .filter((order) => isSameDay(date, new Date(order.createdAt)))
        .reduce((acc, cur) => acc + cur.totalAmount, 0),
    };
  });

  console.log(allDates, dataSales);

  return (
    <div className="bg-zinc-100 p-6">
      <Heading
        level="h4"
        className="border-b border-b-zinc-200 pb-6 text-zinc-600"
      >
        Sales for last 14 days
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={dataSales}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
