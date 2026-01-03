"use server";

import doctorsData, { Doctor } from "@/data/doctor";


type FindDoctorsInput = {
  condition: string;
  location: string;
};

export async function findDoctors({ condition, location }: FindDoctorsInput) {
  if (!condition || !location) {
    return { doctors: [] as Doctor[] };
  }

  const conditionKey = Object.keys(doctorsData).find((key) =>
    key.toLowerCase().includes(condition.toLowerCase())
  );

  if (!conditionKey) {
    return { doctors: [] as Doctor[] };
  }

  const matchedDoctors = (doctorsData as Record<string, Doctor[]>)[
    conditionKey
  ].filter((doc) =>
    doc.cities.some((city) => city.toLowerCase() === location.toLowerCase())
  );

  return { doctors: matchedDoctors };
}
