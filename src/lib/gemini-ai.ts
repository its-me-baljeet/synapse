import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("❌ Missing GEMINI_API_KEY in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const generateSummaryFromGemini = async (pdfText: string) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        maxOutputTokens: 1500,
        temperature: 0.7,
      },
    });

    const prompt = `
${SUMMARY_SYSTEM_PROMPT}

Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:

${pdfText}
`;

    const result = await model.generateContent(prompt);
    const response = result.response;

    const text = response.text();
    if (!text) throw new Error("Failed to generate summary");

    return text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
