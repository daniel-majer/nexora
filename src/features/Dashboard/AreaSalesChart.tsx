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
import { useTheme } from "../../context/DarkModeContext";

export const AreaSalesChart = ({ data }: { data: Orders[] }) => {
  const { theme } = useTheme();

  const colors = {
    totalSales: {
      stroke: theme === "dark" ? "#fff" : "#6e11b0",
      fill: theme === "dark" ? "#6e11b0" : "#c7d2fe",
    },
    text: theme === "dark" ? "#fff" : "#374151",
    background: theme === "dark" ? "#18181b" : "#fff",
  };

  const allDates = eachDayOfInterval({
    start: subDays(new Date(2025, 5, 1), 14),
    end: new Date(2025, 4, 2),
  });

  const dataSales = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: data
        .filter((order) => isSameDay(date, new Date(order.createdAt)))
        .reduce((acc, cur) => acc + cur.totalAmount, 0),
    };
  });

  return (
    <div className="mt-8 space-y-6 rounded-md bg-zinc-100 p-4 transition duration-500 lg:p-6 dark:bg-zinc-900">
      <Heading
        level="h4"
        className="border-b border-b-zinc-200 pb-3 text-zinc-600 transition duration-500 lg:pb-6 dark:border-b-zinc-700 dark:text-white"
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
            width={70}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            tickFormatter={(value) => value.toLocaleString() + "€"}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip
            contentStyle={{ backgroundColor: colors.background }}
            formatter={(value) => value.toLocaleString()}
          />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="€"
            animationDuration={500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
