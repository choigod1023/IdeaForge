import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import {
  OpenAIConfig,
  APIError,
  Project,
  PromptRequest,
  ProjectPromptContext,
} from "../../types";
import { ProjectPrompt } from "../../prompts/projectPrompt";

export class OpenAIService {
  private readonly client: OpenAI;
  private readonly projectPrompt: ProjectPrompt;

  constructor(config: OpenAIConfig) {
    if (!config.apiKey) {
      throw new Error("OpenAI API key is required");
    }

    this.client = new OpenAI({
      apiKey: config.apiKey,
    });
    this.projectPrompt = new ProjectPrompt();
  }

  async generateProjectRecommendation(
    request: PromptRequest
  ): Promise<Project> {
    const context = this.projectPrompt.createContext(request);
    const prompt = this.projectPrompt.generatePrompt(context);

    try {
      const completion = await this.client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: prompt,
        temperature: 0.7,
      });

      const response = completion.choices[0].message.content;
      if (!response) {
        throw new APIError("Empty response from OpenAI API", "openai");
      }

      const cleanJson = this.validateResponse(response);
      const parsedResponse = JSON.parse(cleanJson);

      return parsedResponse.project;
    } catch (error) {
      throw APIError.fromError(error, "openai");
    }
  }

  private validateResponse(response: string): string {
    const cleanJson = response
      .replace(/```json\n?|\n?```/g, "")
      .replace(/^[^{]*/, "")
      .replace(/[^}]*$/, "")
      .trim();

    if (!cleanJson.startsWith("{") || !cleanJson.endsWith("}")) {
      throw new APIError("Invalid JSON format from OpenAI API", "openai");
    }

    return cleanJson;
  }
}
