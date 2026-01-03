"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: 2018, mortalityRate: 37.8 },
  { year: 2019, mortalityRate: 36.1 },
  { year: 2020, mortalityRate: 34.3 },
  { year: 2021, mortalityRate: 33.1 },
  { year: 2022, mortalityRate: 31.9 },
  { year: 2023, mortalityRate: 30.6 },
  { year: 2024, mortalityRate: 29.4 },
  { year: 2025, mortalityRate: 28.2 },
];

export default function AreaChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="mortalityRate"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
