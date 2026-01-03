import { fetchNews } from "@/actions/fetch-news";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const { language } = await req.json();
    const articles = await fetchNews(language);
    return NextResponse.json({ articles });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
