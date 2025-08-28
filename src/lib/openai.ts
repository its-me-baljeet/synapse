import OpenAI from "openai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function generateSummaryFromOpenAI(
  pdfText: string,
  retries = 3,
  delay = 1000
) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SUMMARY_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown:\n\n${pdfText}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return completion.choices[0].message.content;
  } catch (error: any) {
    if (error?.status === 429 && retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return generateSummaryFromOpenAI(pdfText, retries - 1, delay * 2);
    }

    if (error?.status === 429) {
      throw new Error("RATE_LIMIT_EXCEEDED");
    }
    throw error;
  }
}