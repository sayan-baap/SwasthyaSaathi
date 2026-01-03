"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: 2018, lifeExpectancy: 69.4 },
  { year: 2019, lifeExpectancy: 69.7 },
  { year: 2020, lifeExpectancy: 69.6 },
  { year: 2021, lifeExpectancy: 67.2 }, // COVID impact
  { year: 2022, lifeExpectancy: 67.7 },
  { year: 2023, lifeExpectancy: 68.0 },
  { year: 2024, lifeExpectancy: 68.3 }, // estimated
  { year: 2025, lifeExpectancy: 68.6 }, // projected
];

export default function LineChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis domain={[65, 71]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="lifeExpectancy"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
