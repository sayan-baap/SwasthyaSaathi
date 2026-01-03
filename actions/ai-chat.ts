"use server";

import { ai } from "@/lib/gemini";



export async function askSwasthyaMitra(userInput: string) {
  if (!userInput || userInput.trim().length < 3) {
    throw new Error("Invalid input");
  }

  const systemPrompt = `
You are Swasthya Mitra, a multilingual AI health assistant for rural India.

RULES:
- Respond ONLY in the same language as the user
- Use simple, easy-to-understand language
- Do NOT give a medical diagnosis
- Always suggest consulting a doctor if symptoms are serious

ALWAYS end with this disclaimer in the SAME language:
"This information is for guidance only and not a medical diagnosis."
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `${systemPrompt}\n\nUser query:\n"${userInput}"`,
          },
        ],
      },
    ],
  });

  return response.text;
}
