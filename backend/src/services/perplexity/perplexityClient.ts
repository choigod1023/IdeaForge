import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { PerplexityConfig, APIError } from "../../types";

export class PerplexityClient {
  private readonly client: OpenAI;

  constructor(config: PerplexityConfig) {
    if (!config.apiKey) {
      throw new Error("Perplexity API key is required");
    }

    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseURL,
    });
  }

  async chatCompletion(
    messages: ChatCompletionMessageParam[],
    model: string = "sonar",
    temperature: number = 0.2
  ) {
    try {
      const completion = await this.client.chat.completions.create({
        model,
        messages,
        temperature,
      });

      const response = completion.choices[0].message.content;
      if (!response) {
        throw new APIError("Empty response from Perplexity API", "perplexity");
      }

      return response;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(
        error instanceof Error ? error.message : "Unknown error occurred",
        "perplexity",
        error instanceof Error ? error.name : undefined
      );
    }
  }

  async validateResponse(response: string): Promise<string> {
    // Clean the response to ensure it's valid JSON
    const cleanJson = response
      .replace(/```json\n?|\n?```/g, "")
      .replace(/^[^{]*/, "")
      .replace(/[^}]*$/, "")
      .trim();

    if (!cleanJson.startsWith("{") || !cleanJson.endsWith("}")) {
      throw new APIError(
        "Invalid JSON format from Perplexity API",
        "perplexity"
      );
    }

    return cleanJson;
  }
}
