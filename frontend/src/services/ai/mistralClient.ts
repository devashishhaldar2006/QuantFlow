import { ChatMistralAI } from "@langchain/mistralai";

/**
 * Shared factory for Mistral Small 2506 client.
 * Uses process.env.MISTRAL_API_KEY.
 */
export function getMistralClient(options?: { temperature?: number; model?: string }) {
  const apiKey = process.env.MISTRAL_API_KEY;

  if (!apiKey) {
    throw new Error(
      "MISTRAL_API_KEY is not configured in environment variables. Please add your Mistral API key to .env.",
    );
  }

  // Allow specifying model via options, environment variable, or fallback to open-mistral-nemo
  const modelName =
    options?.model ||
    process.env.MISTRAL_MODEL ||
    "open-mistral-nemo";

  return new ChatMistralAI({
    apiKey,
    model: modelName,
    temperature: options?.temperature ?? 0.2,
  });
}
