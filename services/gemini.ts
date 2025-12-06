import { GoogleGenAI } from "@google/genai";
import { GEMINI_PROMPT_CONTEXT } from '../constants';

export const generateWisdom = async (): Promise<string | null> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: GEMINI_PROMPT_CONTEXT,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Low latency preferred for UI modal
      }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};
