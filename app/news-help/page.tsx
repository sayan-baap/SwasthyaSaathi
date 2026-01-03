"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ExternalLink, Newspaper } from "lucide-react";
import { NewsArticle } from "../../actions/fetch-news";

const translations = [
  {
    lang: "English",
    heading: "Get Health News",
    placeholder: "Select a language...",
    buttonText: "Get News",
    loadingText: "Fetching news...",
    responseTitle: "News Results",
    homeButtonText: "Back to Home",
    readMore: "Read More",
  },
  {
    lang: "हिन्दी",
    heading: "स्वास्थ्य समाचार प्राप्त करें",
    placeholder: "भाषा चुनें...",
    buttonText: "समाचार प्राप्त करें",
    loadingText: "समाचार लोड हो रहे हैं...",
    responseTitle: "समाचार परिणाम",
    homeButtonText: "होम पेज पर वापस जाएं",
    readMore: "पूरा पढ़ें",
  },
  {
    lang: "ગુજરાતી",
    heading: "સ્વાસ્થ્ય સમાચાર મેળવો",
    placeholder: "ભાષા પસંદ કરો...",
    buttonText: "સમાચાર મેળવો",
    loadingText: "સમાચાર લોડ થાય છે...",
    responseTitle: "સમાચાર પરિણામો",
    homeButtonText: "હોમ પેજ પર પાછા જાઓ",
    readMore: "વધુ વાંચો",
  },
  {
    lang: "বাংলা",
    heading: "স্বাস্থ্য সংবাদ পান",
    placeholder: "একটি ভাষা নির্বাচন করুন...",
    buttonText: "সংবাদ পান",
    loadingText: "সংবাদ লোড হচ্ছে...",
    responseTitle: "সংবাদ ফলাফল",
    homeButtonText: "হোম পেজে ফিরে যান",
    readMore: "আরও পড়ুন",
  },
  {
    lang: "मराठी",
    heading: "आरोग्य बातम्या प्राप्त करा",
    placeholder: "भाषा निवडा...",
    buttonText: "बातम्या प्राप्त करा",
    loadingText: "बातम्या लोड होत आहेत...",
    responseTitle: "बातम्या परिणाम",
    homeButtonText: "होम पेजवर परत जा",
    readMore: "अधिक वाचा",
  },
  {
    lang: "தமிழ்",
    heading: "சுகாதார செய்திகளைப் பெறுங்கள்",
    placeholder: "ஒரு மொழியைத் தேர்ந்தெடுக்கவும்...",
    buttonText: "செய்திகளைப் பெறுங்கள்",
    loadingText: "செய்திகள் ஏற்றப்படுகின்றன...",
    responseTitle: "செய்தி முடிவுகள்",
    homeButtonText: "முகப்பு பக்கத்திற்கு திரும்புக",
    readMore: "மேலும் படிக்க",
  },
  {
    lang: "తెలుగు",
    heading: "ఆరోగ్య వార్తలు పొందండి",
    placeholder: "భాషను ఎంచుకోండి...",
    buttonText: "వార్తలు పొందండి",
    loadingText: "వార్తలు లోడ్ అవుతున్నాయి...",
    responseTitle: "వార్తల ఫలితాలు",
    homeButtonText: "హోమ్ పేజీకి వెళ్ళండి",
    readMore: "మరింత చదవండి",
  },
  {
    lang: "ਪੰਜਾਬੀ",
    heading: "ਸਿਹਤ ਦੀਆਂ ਖ਼ਬਰਾਂ ਪ੍ਰਾਪਤ ਕਰੋ",
    placeholder: "ਇੱਕ ਭਾਸ਼ਾ ਚੁਣੋ...",
    buttonText: "ਖ਼ਬਰਾਂ ਪ੍ਰਾਪਤ ਕਰੋ",
    loadingText: "ਖ਼ਬਰਾਂ ਲੋਡ ਹੋ ਰਹੀਆਂ ਹਨ...",
    responseTitle: "ਖ਼ਬਰਾਂ ਨਤੀਜੇ",
    homeButtonText: "ਹੋਮ ਪੇਜ 'ਤੇ ਵਾਪਸ ਜਾਓ",
    readMore: "ਹੋਰ ਪੜ੍ਹੋ",
  },
  {
    lang: "മലയാളം",
    heading: "ആരോഗ്യ വാർത്തകൾ നേടുക",
    placeholder: "ഒരു ഭാഷ തിരഞ്ഞെടുക്കുക...",
    buttonText: "വാർത്തകൾ നേടുക",
    loadingText: "വാർത്തകൾ ലോഡ് ചെയ്യുന്നു...",
    responseTitle: "വാർത്താ ഫലങ്ങൾ",
    homeButtonText: "ഹോം പേജിലേക്കു മടങ്ങുക",
    readMore: "കൂടുതൽ വായിക്കുക",
  },
  {
    lang: "ಕನ್ನಡ",
    heading: "ಆರೋಗ್ಯ ಸುದ್ದಿ ಪಡೆಯಿರಿ",
    placeholder: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ...",
    buttonText: "ಸುದ್ದಿ ಪಡೆಯಿರಿ",
    loadingText: "ಸುದ್ದಿಗಳು ಲೋಡ್ ಆಗುತ್ತಿವೆ...",
    responseTitle: "ಸುದ್ದಿ ಫಲಿತಾಂಶಗಳು",
    homeButtonText: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    readMore: "ಹೆಚ್ಚು ಓದು",
  },
  {
    lang: "ଓଡ଼ିଆ",
    heading: "ସ୍ୱାସ୍ଥ୍ୟ ସମ୍ବାଦ ପାଉନ୍ତୁ",
    placeholder: "ଏକ ଭାଷା ବାଛନ୍ତୁ...",
    buttonText: "ସମ୍ବାଦ ପାଉନ୍ତୁ",
    loadingText: "ସମ୍ବାଦ ଲୋଡ୍ ହେଉଛି...",
    responseTitle: "ସମ୍ବାଦ ପରିଣାମ",
    homeButtonText: "ହୋମ୍ ପୃଷ୍ଠାକୁ ଫେରନ୍ତୁ",
    readMore: "ଅଧିକ ପଢନ୍ତୁ",
  },
];

export default function NewsHelp() {
  const [language, setLanguage] = useState("Hindi");
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const languages = translations.map((t) => t.lang);

  useEffect(() => {
    const idx = translations.findIndex((t) => t.lang === language);
    setIndex(idx >= 0 ? idx : 0);
  }, [language]);

  const handleGetNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch news");

      setArticles(data.articles);
    } catch (err: any) {
      console.error(err);
      setError("समाचार प्राप्त करने में त्रुटि हुई। कृपया पुनः प्रयास करें।");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return dateString;
    }
  };

  const getTranslation = (key: string) =>
    translations[index][key as keyof (typeof translations)[0]] || "";

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="bg-black py-8 px-4 shadow-md">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">
            {getTranslation("heading")}
          </h1>

          <div className="flex flex-col md:flex-row gap-4 items-stretch justify-center">
            <select
              className="flex-1 px-4 py-3 rounded-lg bg-black text-white border border-gray-700"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map((lang, idx) => (
                <option key={idx} value={lang}>
                  {lang}
                </option>
              ))}
            </select>

            <Button
              className="flex items-center justify-center gap-2 hover:bg-[#b9b9b9]"
              onClick={handleGetNews}
              disabled={loading}
            >
              <Newspaper size={20} />
              {loading
                ? getTranslation("loadingText")
                : getTranslation("buttonText")}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-grow px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-300 text-lg">
                {getTranslation("loadingText")}
              </p>
            </div>
          ) : error ? (
            <div className="bg-gray-800 rounded-lg shadow-md p-8 text-center border border-gray-700">
              <p className="text-red-400">{error}</p>
            </div>
          ) : articles.length > 0 ? (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-white pb-2 border-b border-gray-700">
                {getTranslation("responseTitle")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col border border-gray-700"
                  >
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 mb-3">{article.description}</p>
                    <p className="text-gray-400 mb-4 flex-grow">
                      {article.content.substring(0, 150)}...
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                      <span>{article.source}</span>
                      <span>{formatDate(article.date)}</span>
                    </div>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 font-medium text-sm inline-flex items-center"
                    >
                      {getTranslation("readMore")}{" "}
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-gray-800 text-white shadow-md p-8 text-center border border-gray-700 rounded-lg">
              <div className="flex flex-col items-center justify-center py-12">
                <Newspaper size={48} className="text-gray-500 mb-4" />
                <p className="text-gray-400 text-lg">
                  {getTranslation("placeholder")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pb-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 hover:bg-[#b9b9b9]"
            onClick={() => router.push("/")}
          >
            {getTranslation("homeButtonText")}
          </Button>
        </div>
      </div>
    </div>
  );
}
