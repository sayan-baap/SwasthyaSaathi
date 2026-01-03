"use server";

export type FacilityType = "all" | "public" | "private" | "clinic" | "medical";

export async function getHealthCenters(
  lat: number,
  lng: number,
  type: FacilityType
) {
  const radius = 5000; // meters

  const typeFilter =
    type === "clinic"
      ? `["amenity"="clinic"]`
      : type === "medical"
      ? `["amenity"~"hospital|clinic|doctors"]`
      : `["amenity"~"hospital|clinic|doctors"]`;

  const query = `
    [out:json];
    (
      node${typeFilter}(around:${radius},${lat},${lng});
      way${typeFilter}(around:${radius},${lat},${lng});
    );
    out center tags;
  `;

  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: query,
    headers: {
      "Content-Type": "text/plain",
    },
    next: { revalidate: 300 },
  });

  const data = await res.json();

  return data.elements.map((el: any) => ({
    id: el.id,
    name: el.tags?.name ?? "Unnamed Facility",
    lat: el.lat ?? el.center?.lat,
    lng: el.lon ?? el.center?.lon,
    address: el.tags?.["addr:full"] ?? "",
  }));
}
