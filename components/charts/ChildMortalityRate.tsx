"use client";

import dynamic from "next/dynamic";

const AreaChartWithNoSSR = dynamic(() => import("./AreaChartComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full flex items-center justify-center bg-gray-800 rounded-lg">
      <p>Loading chart...</p>
    </div>
  ),
});

export function ChildMortalityRate() {
  return <AreaChartWithNoSSR />;
}
