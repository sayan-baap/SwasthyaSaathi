export type Doctor = {
  name: string;
  specialization: string;
  experience: string;
  fee: string;
  cities: string[];
  profile: string;
};

const doctorsData: Record<string, Doctor[]> = {
  Cardiology: [
    {
      name: "Dr. Amit Sharma",
      specialization: "Cardiologist",
      experience: "12 years",
      fee: "₹600",
      cities: ["Delhi", "Mumbai", "Bangalore"],
      profile: "https://example.com/dr-amit-sharma",
    },
    {
      name: "Dr. Neha Kapoor",
      specialization: "Cardiologist",
      experience: "10 years",
      fee: "₹700",
      cities: ["Chennai", "Hyderabad"],
      profile: "https://example.com/dr-neha-kapoor",
    },
  ],
  Orthopaedics: [
    {
      name: "Dr. Rajiv Mehta",
      specialization: "Orthopaedic Surgeon",
      experience: "15 years",
      fee: "₹800",
      cities: ["Delhi", "Pune", "Mumbai"],
      profile: "https://example.com/dr-rajiv-mehta",
    },
  ],
  Dermatology: [
    {
      name: "Dr. Rohan Mehta",
      specialization: "Dermatologist",
      experience: "10 years",
      fee: "₹500",
      cities: ["Ahmedabad", "Mumbai", "Bangalore"],
      profile: "https://example.com/dr-rohan-mehta",
    },
  ],
  ENT: [
    {
      name: "Dr. Priya Nair",
      specialization: "ENT Specialist",
      experience: "8 years",
      fee: "₹450",
      cities: ["Delhi", "Kolkata", "Chennai"],
      profile: "https://example.com/dr-priya-nair",
    },
  ],
  "General Physician": [
    {
      name: "Dr. Priya Sen",
      specialization: "General Physician",
      experience: "8 years",
      fee: "₹400",
      cities: ["Kolkata", "Delhi", "Pune", "Bangalore"],
      profile: "https://example.com/dr-priya-sen",
    },
  ],
  Pediatrics: [
    {
      name: "Dr. Ankit Sharma",
      specialization: "Pediatrician",
      experience: "7 years",
      fee: "₹500",
      cities: ["Delhi", "Mumbai", "Bangalore"],
      profile: "https://example.com/dr-ankit-sharma",
    },
  ],
  Neurology: [
    {
      name: "Dr. Shreya Iyer",
      specialization: "Neurologist",
      experience: "12 years",
      fee: "₹900",
      cities: ["Mumbai", "Delhi", "Hyderabad"],
      profile: "https://example.com/dr-shreya-iyer",
    },
  ],
  Gynecology: [
    {
      name: "Dr. Neha Verma",
      specialization: "Gynecologist",
      experience: "10 years",
      fee: "₹600",
      cities: ["Delhi", "Pune", "Bangalore"],
      profile: "https://example.com/dr-neha-verma",
    },
  ],
};

export default doctorsData;
