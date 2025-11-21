// Gemini API Service for AI Chat
// Using Gemini 2.0 Flash (free tier) via REST API

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
// Use gemini-2.0-flash which is the latest free tier model
const GEMINI_MODEL = "gemini-2.0-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export interface ChatMessage {
  role: "user" | "model";
  parts: Array<{ text: string }>;
}

export interface GeminiRequest {
  contents: ChatMessage[];
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
  }>;
}

export const sendMessageToGemini = async (
  message: string,
  chatHistory: ChatMessage[] = []
): Promise<string> => {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your .env file.");
  }

  try {
    // Build the conversation history with the new user message
    const contents: ChatMessage[] = [
      ...chatHistory,
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const requestBody: GeminiRequest = {
      contents,
    };

    const response = await fetch(
      GEMINI_API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `Gemini API error: ${response.statusText}`
      );
    }

    const data: GeminiResponse = await response.json();

    if (
      !data.candidates ||
      !data.candidates[0] ||
      !data.candidates[0].content ||
      !data.candidates[0].content.parts ||
      !data.candidates[0].content.parts[0]
    ) {
      throw new Error("Invalid response format from Gemini API");
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API error:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to get response from Gemini API");
  }
};

