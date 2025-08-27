'use server'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AssemblyAI } from "assemblyai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
if (!apiKey) {
  throw new Error("Missing Gemini API key");
}

const genAI = new GoogleGenerativeAI(apiKey);

type generateAiQuizParams = {
  transcription: string;
  description: string;
}
export async function generateAiQuiz(data: generateAiQuizParams) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `  
      Generate a multiple-choice quiz (5 to 10 questions) based strictly on the following video transcription and description:

      Transcription:
      ${data.transcription}

      Description:
      ${data.description}

      The questions must be in clear English and should:
      - Test deep comprehension of the main ideas, not only surface-level details.
      - Include a mix of factual, interpretative, and cause-effect questions.
      - Avoid trivial or obvious questions that can be answered without understanding the text.
      - Each question should have 4 answer choices (A, B, C, D), only one of which is correct.
      - Make the distractors (wrong answers) plausible but clearly incorrect if the viewer understands the video.
      - The questions must encourage critical thinking and reflect an intelligent understanding of the content.

      Output format: Strict JSON, without code block markers. Example:

      {
        "questions": [
          {
            "question": "What is the main argument made in the video?",
            "choices": ["A...", "B...", "C...", "D..."],
            "answer": "B"
          }
        ]
    } `;

    const result = await model.generateContent(prompt);
    const raw = result.response.text();

    const cleaned = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Error generating AI quiz:", error);
    throw new Error("Failed to generate AI quiz");
  }
}


const assemblyAiAPIKey = process.env.ASSEMBLYAI_API_KEY as string;
if (!assemblyAiAPIKey) {
  throw new Error("Missing AssemblyAI API key");
}
const assemblyClient = new AssemblyAI({
  apiKey: assemblyAiAPIKey,
});

export async function getVideoTranscription(url: string): Promise<string> {
  try {
    const params = {
      audio: url,
      speech_model: "universal",
      language_code: 'en',
      punctuate: true,
      format_text: true
    };
    const response = await assemblyClient.transcripts.transcribe(params as any);
    console.log("Text: ", response.text)
    return response.text || '';
  } catch (error) {
    console.error("Error getting video transcription:", error);
    throw new Error("Failed to get video transcription");
  }
}


export async function fakeNewsAnalysis(content: string): Promise<{ score: number; message: string }> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
      You are an expert in detecting fake news and misinformation. Analyze the following content and provide a reliability score from 0 to 100, where 0 means completely unreliable (highly likely to be fake news) and 100 means completely reliable (very trustworthy). 

      Content:
      ${content}

      Consider factors such as:
      - Source credibility
      - Presence of sensationalist language
      - Factual accuracy
      - Consistency with known information

      Provide a brief explanation for the score.

      Output format: JSON with "score" and "message" fields. Example:
      {
        "score": 75,
        "message": "The content is mostly reliable but contains some questionable claims."
      }
    `;

    const result = await model.generateContent(prompt);
    const raw = result.response.text();

    const cleaned = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Error analyzing fake news:", error);
    throw new Error("Failed to analyze fake news");
  }
}


export async function getScamShield(content: string): Promise<{ status: string; message: string }> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
      You are an expert in identifying online scams. Analyze the following content and provide a scam status and message.

      Content:
      ${content}

      Output format: JSON with "status" and "message" fields. Example:
      {
        "status": "Scam confirmed",
        "message": "This content has been identified as a confirmed scam. Do not provide any personal information or payment."
      }
    `;

    const result = await model.generateContent(prompt);
    const raw = result.response.text();

    const cleaned = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Error analyzing scam content:", error);
    throw new Error("Failed to analyze scam content");
  }
}