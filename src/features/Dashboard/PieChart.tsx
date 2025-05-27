import { Heading } from "../../ui/Heading";
import {
  Pie,
  ResponsiveContainer,
  PieChart,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

type Stay = {
  numNights: number;
};

type PieData = {
  duration: string;
  value: number;
  color: string;
};

function prepareData(startData: PieData[], stays: Stay[]): PieData[] {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr: PieData[], field: string): PieData[] {
    return arr.map((obj: PieData) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
    );
  }

  const data = stays
    .reduce((arr: PieData[], cur: Stay) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj: PieData) => obj.value > 0);

  return data;
}

// For demonstration, provide a mock confirmedStays array.
// In real usage, pass confirmedStays as a prop or import from state/store.
const confirmedStays: Stay[] = [];

export const PieChartGraph = () => {
  const startData = startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <div className="bg-zinc-100 p-6">
      <Heading
        level="h4"
        className="border-b border-b-zinc-200 pb-6 text-zinc-600"
      >
        Order price breakdown
      </Heading>{" "}
      <ResponsiveContainer className="pr-32 pl-10" width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={130}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry: PieData) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
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
  );
};

const startDataLight = [
  {
    duration: "1 night",
    value: 2,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 5,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 12,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 4,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 9,
    color: "#a855f7",
  },
];
