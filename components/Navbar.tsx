"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Icons for dropdown

const translations = [
  "SwasthyaSaathi",
  "स्वास्थ्यसाथी",
  "স্বাস্থ্যসাথী",
  "સ્વાસ્થ્યસાથી",
  "स्वास्थ्यसाथी",
  "சுகாதார தோழன்",
];

const greetings = [
  "Hello",
  "नमस्ते",
  "নমস্কার",
  "નમસ્તે",
  "नमस्कार",
  "வணக்கம்",
];

const navItems = [
  { label: "SwasthyaMitra", href: "/health-check" },
  { label: "SwasthyaConnect", href: "/find-doctor" },
  { label: "SwasthyaPulse", href: "/news-help" },
  { label: "SwasthyaView", href: "/health-insights" },
  { label: "SwasthyaParivar", href: "/our-team" },
  { label: "Map", href: "/map" },
];

export default function Navbar() {
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

useEffect(() => {
  const rotate = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    length: number
  ) =>
    setInterval(() => {
      setter((i) => (i + 1) % length);
    }, 3000);

  const leftInterval = rotate(setLeftIndex, translations.length);
  const rightInterval = rotate(setRightIndex, greetings.length);

  return () => {
    clearInterval(leftInterval);
    clearInterval(rightInterval);
  };
}, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: Brand */}
        <Link
          href="/home"
          className="text-lg font-bold italic transition-all sm:text-xl lg:text-2xl"
        >
          {translations[leftIndex]}
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Greeting (Desktop) */}
        <span className="hidden lg:block text-lg font-bold italic transition-all">
          {greetings[rightIndex]}
        </span>

        {/* Mobile Menu Button */}
        <div className="lg:hidden relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium"
          >
            Menu
            {menuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {/* Mobile Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-3 w-56 rounded-lg border bg-background shadow-lg">
              <nav className="flex flex-col py-2 text-sm">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-2 text-muted-foreground hover:bg-muted hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-2 border-t px-4 py-2 font-semibold">
                  {greetings[rightIndex]}
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
