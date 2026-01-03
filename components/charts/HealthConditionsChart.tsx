"use client";

import dynamic from "next/dynamic";

const PieChartWithNoSSR = dynamic(() => import("./PieChartComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full flex items-center justify-center bg-gray-800 rounded-lg">
      <p>Loading chart...</p>
    </div>
  ),
});

export function HealthConditionsChart() {
  return <PieChartWithNoSSR />;
}
