"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const data = [
  { name: "Cardiovascular Diseases", value: 31 },
  { name: "Respiratory Diseases", value: 10 },
  { name: "Cancers", value: 16 },
  { name: "Diabetes & Kidney Disease", value: 4 },
  { name: "Infectious Diseases (TB/Malaria/Diarrheal)", value: 3 },
  { name: "Other Causes", value: 36 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

export default function PieChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          dataKey="value"
          label={({ name, percent }) =>
            percent !== undefined
              ? `${name} ${(percent * 100).toFixed(1)}%`
              : name
          }
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
