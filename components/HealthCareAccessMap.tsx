"use client";

import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full flex items-center justify-center bg-gray-100 rounded-lg">
      <p className="text-gray-700">Loading map...</p>
    </div>
  ),
});

export function HealthcareAccessMap() {
  return <MapWithNoSSR />;
}
