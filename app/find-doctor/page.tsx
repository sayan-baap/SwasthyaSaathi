"use client";

import { useState, startTransition } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { findDoctors } from "../../actions/find-doctor";
import { Doctor } from "@/data/doctor";
import doctorsData from "@/data/doctor";

export default function FindDoctorPage() {
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [apiResponse, setApiResponse] = useState<{ doctors?: Doctor[] } | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  // Prepare dropdown options
  const departments = Object.keys(doctorsData); // Cardiology, Orthopaedics, etc.
  const allCities = Array.from(
    new Set(
      Object.values(doctorsData).flatMap((docs) =>
        docs.map((d) => d.cities).flat()
      )
    )
  ).sort();

  const handleFindDoctors = () => {
    if (!department || !city) return;

    setLoading(true);
    startTransition(async () => {
      const data = await findDoctors({ condition: department, location: city });
      setApiResponse(data);
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <div className="py-6 px-4 shadow-md max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Find Nearby Doctors
        </h1>

        {/* Dropdown Inputs */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Department */}
          <select
            className="flex-1 px-4 py-3 rounded-lg bg-black border border-gray-700"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {/* City */}
          <select
            className="flex-1 px-4 py-3 rounded-lg bg-black border border-gray-700"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Select City</option>
            {allCities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <Button
            onClick={handleFindDoctors}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <Search size={16} />
            {loading ? "Searching..." : "Find Doctors"}
          </Button>
        </div>
      </div>

      {/* Doctors List */}
      <div className="flex-grow px-4 py-8 max-w-6xl mx-auto">
        {apiResponse?.doctors && apiResponse.doctors.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apiResponse.doctors.map((doc, idx) => (
              <div
                key={idx}
                className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-bold mb-2">{doc.name}</h2>
                <p>
                  <strong>Specialization:</strong> {doc.specialization}
                </p>
                <p>
                  <strong>Experience:</strong> {doc.experience}
                </p>
                <p>
                  <strong>Fee:</strong> {doc.fee}
                </p>
                <p>
                  <strong>Available Cities:</strong> {doc.cities.join(", ")}
                </p>
                <a
                  href={doc.profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline mt-2 block"
                >
                  View Profile
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-20">
            Select a department and city to find doctors near you
          </p>
        )}
      </div>
    </div>
  );
}
