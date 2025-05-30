import type { Orders } from "../../types/supabase-types";
import { Heading } from "../../ui/Heading";
import {
  Pie,
  ResponsiveContainer,
  PieChart,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

export const PieChartGraph = ({ data }: { data: Orders[] }) => {
  let pieChartData = [
    {
      price: "0 - 500 €",
      value: 0,
      color: "#84cc16",
    },
    {
      price: "500 - 1000 €",
      value: 5,
      color: "#22c55e",
    },
    {
      price: "1000 - 3000 €",
      value: 0,
      color: "#eab308",
    },
    {
      price: "3000 - 5000 €",
      value: 0,
      color: " #ef4444",
    },
    {
      price: "5000 - 10000 €",
      value: 0,
      color: "#f97316",
    },
    {
      price: "10 000+ €",
      value: 0,
      color: "#a855f7",
    },
  ];

  for (const order of data) {
    const amount = order.totalAmount;

    if (amount < 500 && pieChartData[0]) pieChartData[0].value++ * 102;
    else if (amount >= 500 && amount < 1000 && pieChartData[1])
      pieChartData[1].value++ * 102;
    else if (amount >= 1000 && amount < 3000 && pieChartData[2])
      pieChartData[2].value++ * 102;
    else if (amount >= 3000 && amount < 5000 && pieChartData[3])
      pieChartData[3].value++ * 102;
    else if (amount >= 5000 && amount < 10000 && pieChartData[4])
      pieChartData[4].value++ * 102;
    else if (pieChartData[5]) pieChartData[5].value++ * 102;
  }

  // responsive pie chart
  const isSmallScreen =
    typeof window !== "undefined" && window.innerWidth < 640;
  const innerRadius = isSmallScreen ? 50 : 85;
  const outerRadius = isSmallScreen ? 80 : 130;

  return (
    <div className="rounded-md bg-zinc-100 p-2 transition duration-500 sm:p-4 lg:p-6 dark:bg-zinc-900">
      <Heading
        level="h4"
        className="border-b border-b-zinc-200 pb-2 text-zinc-600 transition duration-500 sm:pb-3 lg:pb-6 dark:border-b-zinc-700 dark:text-white"
      >
        Order price breakdown
      </Heading>

      <div className="h-56 sm:h-72 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieChartData}
              nameKey="price"
              dataKey="value"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              cx="40%"
              cy="50%"
              paddingAngle={3}
            >
              {pieChartData.map((entry) => (
                <Cell
                  fill={entry.color}
                  stroke={entry.color}
                  key={entry.price}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              iconSize={20}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
