"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function getHealthAdvice(symptoms: string) {
  if (!symptoms.trim()) {
    throw new Error("Symptoms are required");
  }

  const prompt = `
You are a responsible, calm, and knowledgeable AI medical assistant.

IMPORTANT LANGUAGE INSTRUCTION:
- Detect the language used by the user in the "User symptoms" section.
- Respond COMPLETELY in the SAME language.
- Do NOT mix languages.
- If the input contains multiple languages, use the dominant one.

User symptoms:
"${symptoms}"

STRICT OUTPUT STRUCTURE:

1. Begin with a short empathetic acknowledgment (1–2 sentences).
2. Provide a section titled: Clear Health Advice
   - Give 6–10 bullet points
   - Each bullet must be a complete sentence
3. Provide a section titled: When to See a Doctor
   - Give 3–5 bullet points
4. End with a short medical disclaimer.

RULES:
- Use simple, non-technical language
- Do NOT diagnose diseases
- Avoid fear-based wording
- Do NOT ask follow-up questions
- Do NOT use emojis
- Do NOT mention AI, policies, or limitations
- Output must be detailed and practical
`;

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = result.text || "No response generated.";

  return {
    response: text, 
    summary: text,
  };
}
