"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import the map component with no SSR
const MapWithNoSSR = dynamic(() => import("./MapComponent"), { ssr: false });

export function HealthcareAccessMap() {
  const [isMounted, setIsMounted] = useState(false);

const MapWithNoSSR = dynamic(() => import("./MapComponent"), { ssr: false });

  if (!isMounted) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-700">Loading map...</p>
      </div>
    );
  }

  return <MapWithNoSSR />;
}
