import OpenAI from "openai";
import { PromptRequest, Project } from "../types";
import dotenv from "dotenv";
import { ProjectPrompt } from "./prompts/projectPrompt";
import { perplexityService } from "./perplexity/perplexityService";

// 환경 변수 설정
dotenv.config();

class OpenAIService {
  private openai: OpenAI;

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not defined in environment variables");
    }

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateProjectRecommendation(
    request: PromptRequest,
    existingProjects: Project[] = []
  ): Promise<Project> {
    const completion = await this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: ProjectPrompt.getSystemPrompt(),
        },
        {
          role: "user",
          content: ProjectPrompt.constructUserPrompt(request, existingProjects),
        },
      ],
      temperature: 0.2,
    });

    const response = completion.choices[0].message.content;
    if (!response) throw new Error("프로젝트 추천 생성에 실패했습니다");

    try {
      const cleanJson = response
        .replace(/```json\n?|\n?```/g, "")
        .replace(/^[^{]*/, "")
        .replace(/[^}]*$/, "")
        .trim();

      if (!cleanJson.startsWith("{") || !cleanJson.endsWith("}")) {
        throw new Error("Invalid JSON format");
      }

      const project = JSON.parse(cleanJson) as Project;

      // Perplexity 서비스를 통해 리소스 추천 받기
      project.resources = await perplexityService.searchProjectResources(
        project,
        request
      );

      return project;
    } catch (error) {
      console.error("Project Generation Error:", error);
      if (error instanceof SyntaxError) {
        console.error("Invalid JSON response:", response);
      }
      throw new Error("프로젝트 추천 생성에 실패했습니다");
    }
  }
}

export const openAIService = new OpenAIService();
