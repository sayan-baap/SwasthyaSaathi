export type NewsArticle = {
  title: string;
  description: string;
  content: string;
  url: string;
  source: string;
  date: string;
};

export async function fetchNews(language: string): Promise<NewsArticle[]> {
  const langMap: Record<string, string> = {
    English: "en",
    Hindi: "hi",
    Marathi: "mr",
    Bengali: "bn",
    Tamil: "ta",
    Telugu: "te",
    Gujarati: "gu",
    Punjabi: "pa",
    Malayalam: "ml",
    Kannada: "kn",
    Odia: "or",
  };

  const langCode = langMap[language] || "en";

  const API_KEY = process.env.NEWS_API_KEY;
  if (!API_KEY) throw new Error("NEWS_API_KEY not set");

  const res = await fetch(
    `https://gnews.io/api/v4/top-headlines?topic=health&lang=${langCode}&max=10&token=${API_KEY}`
  );

  if (!res.ok) throw new Error(`Failed to fetch news: ${res.status}`);

  const data = await res.json();

  return data.articles.map((a: any) => ({
    title: a.title,
    description: a.description,
    content: a.content || "",
    url: a.url,
    source: a.source.name,
    date: a.publishedAt || new Date().toISOString(),
  }));
}
