import { ChatMistralAI } from "@langchain/mistralai";

/**
 * Shared factory for Mistral Small 2506 client.
 * Uses process.env.MISTRAL_API_KEY.
 */
export function getMistralClient(options?: { temperature?: number }) {
  const apiKey = process.env.MISTRAL_API_KEY;

  if (!apiKey) {
    throw new Error(
      "MISTRAL_API_KEY is not configured in environment variables. Please add your Mistral API key to .env.",
    );
  }

  return new ChatMistralAI({
    apiKey,
    model: "mistral-small-2506",
    temperature: options?.temperature ?? 0.2,
  });
}
