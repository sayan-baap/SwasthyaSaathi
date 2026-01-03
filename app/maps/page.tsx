import { HealthcareAccessMap } from "@/components/HealthCareAccessMap";


export default function MapsPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Healthcare Access Map</h1>

      <p className="text-gray-600 mb-4">
        Nearby hospitals and clinics based on your location.
      </p>

      <HealthcareAccessMap />
    </main>
  );
}
