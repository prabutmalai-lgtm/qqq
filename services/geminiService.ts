
import { GoogleGenAI } from "@google/genai";
import { ResumeData } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async analyzeResume(currentData: ResumeData, prompt: string): Promise<string> {
    const model = 'gemini-3-flash-preview';
    const resumeString = JSON.stringify(currentData, null, 2);
    
    const response = await this.ai.models.generateContent({
      model: model,
      contents: `
        Current Resume Data:
        ${resumeString}

        User Request:
        ${prompt}
      `,
      config: {
        systemInstruction: "You are a professional resume consultant. Provide actionable advice and rewritten bullets to improve the resume. Be specific.",
        temperature: 0.7,
      },
    });

    return response.text || "I couldn't generate a response. Please try again.";
  }
}

export const geminiService = new GeminiService();
