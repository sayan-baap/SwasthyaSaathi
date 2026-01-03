"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getHealthAdvice } from "@/actions/health";

const translations = [
  {
    lang: "English",
    heading: "Health Check",
    placeholder: "Describe your symptoms...",
  },
  {
    lang: "हिन्दी",
    heading: "स्वास्थ्य जाँच",
    placeholder: "अपने लक्षणों का वर्णन करें...",
  },
  {
    lang: "বাংলা",
    heading: "স্বাস্থ্য পরীক্ষা",
    placeholder: "আপনার উপসর্গ বর্ণনা করুন...",
  },
  {
    lang: "ગુજરાતી",
    heading: "આરોગ્ય ચકાસણી",
    placeholder: "તમારા લક્ષણો વર્ણવો...",
  },
  {
    lang: "मराठी",
    heading: "आरोग्य तपासणी",
    placeholder: "तुमच्या लक्षणांचे वर्णन करा...",
  },
  {
    lang: "தமிழ்",
    heading: "ஆரோக்கிய சோதனை",
    placeholder: "உங்கள் அறிகுறிகளை விவரிக்கவும்...",
  },
];

const loadingMessages = [
  "Processing...",
  "Analyzing symptoms...",
  "Generating advice...",
  "Almost there...",
];

export default function HealthCheckPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [langIndex, setLangIndex] = useState(0);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [typedMessage, setTypedMessage] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  const router = useRouter();
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  /* Rotate language headings */
  useEffect(() => {
    const interval = setInterval(() => {
      setLangIndex((prev) => (prev + 1) % translations.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  /* Rotate loading messages */
  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      setTypedMessage("");
      setCharIndex(0);
    }, 2500);

    return () => clearInterval(interval);
  }, [loading]);

  /* Typing animation */
  useEffect(() => {
    if (!loading) return;

    const message = loadingMessages[loadingMessageIndex];

    typingRef.current = setTimeout(() => {
      setTypedMessage(message.slice(0, charIndex + 1));
      setCharIndex((prev) => prev + 1);
    }, 80);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [loading, loadingMessageIndex, charIndex]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");
    setSummary("");

    try {
      const data = await getHealthAdvice(input);
      setResponse(data.response);
      setSummary(data.summary);
    } catch (error) {
      console.error(error);
      setResponse("");
      setSummary("Error getting AI health advice.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Language-agnostic formatter:
   * - Removes markdown
   * - Removes bullets
   * - Skips section titles
   * - Preserves non-English content
   */
  const formatAIResponse = (text: string) => {
    return text
      .split("\n")
      .map((line) =>
        line
          .replace(/\*\*/g, "")
          .replace(/^[-•]\s*/, "")
          .trim()
      )
      .filter(
        (line) =>
          line.length > 0 &&
          line.length > 20 && // avoids headings across languages
          !line.endsWith(":")
      );
  };

  return (
    <div className="relative z-10">
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto bg-dark shadow-lg rounded-lg p-4 sm:p-6 md:p-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4">
            {translations[langIndex].heading}
          </h1>

          <textarea
            className="w-full h-32 md:h-48 p-4 border border-gray-300 rounded-lg bg-black text-white placeholder-white text-sm md:text-base mb-4"
            placeholder={translations[langIndex].placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            className="w-full sm:w-auto mb-4 bg-white text-black hover:bg-gray-300"
            size="lg"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? typedMessage : "Get AI Health Advice"}
          </Button>

          {loading && (
            <div className="flex justify-center space-x-2 my-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-100" />
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200" />
            </div>
          )}

          {(response || summary) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div className="p-5 bg-dark text-white rounded-lg max-h-80 overflow-y-auto">
                <h2 className="text-lg font-semibold mb-3">AI Response</h2>
                {formatAIResponse(response).map((line, i) => (
                  <p key={i} className="text-sm leading-relaxed flex gap-2">
                    <span>•</span>
                    <span>{line}</span>
                  </p>
                ))}
              </div>

              <div className="p-5 bg-dark text-white rounded-lg max-h-80 overflow-y-auto">
                <h2 className="text-lg font-semibold mb-3">
                  Detailed Response
                </h2>
                <p className="text-sm whitespace-pre-wrap">{summary}</p>
              </div>
            </div>
          )}

          <p className="text-xs text-gray-400 mt-6 text-center">
            ⚠ This is not a medical diagnosis. Please consult a qualified
            doctor.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button
              className="bg-white text-black hover:bg-gray-300"
              onClick={() => router.push("/find-doctor")}
            >
              Find Doctors
            </Button>

            <Button
              className="bg-white text-black hover:bg-gray-300"
              onClick={() => router.push("/")}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
