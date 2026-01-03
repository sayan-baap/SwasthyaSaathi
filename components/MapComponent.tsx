"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const facilities = [
  {
    name: "Ispat General Hospital",
    lat: 22.2301,
    lon: 84.8888,
    type: "Hospital",
  },
  { name: "Hi-Tech Medical", lat: 22.245, lon: 84.897, type: "Hospital" },
  {
    name: "Government Health Center, Rourkela",
    lat: 22.258,
    lon: 84.904,
    type: "Clinic",
  },
  {
    name: "Primary Health Center, Sundergarh",
    lat: 22.12,
    lon: 84.093,
    type: "Clinic",
  },
];

export default function MapComponent() {
  return (
    <MapContainer
      center={[22.251, 84.9014]}
      zoom={13}
      className="w-full h-[500px] md:h-[600px] lg:h-[75vh] rounded-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {facilities.map((facility, index) => (
        <CircleMarker
          key={index}
          center={[facility.lat, facility.lon]}
          radius={10}
          fillColor={facility.type === "Hospital" ? "#FF0000" : "#0000FF"}
          color="#000"
          weight={1}
          opacity={1}
          fillOpacity={0.8}
        >
          <Popup>
            <strong>{facility.name}</strong>
            <br />
            Type: {facility.type}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
