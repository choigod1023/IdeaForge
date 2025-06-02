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
import { z } from "zod";

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

  private createUniqueProjectContext(
    request: PromptRequest,
    existingProjects: Project[]
  ): ProjectPromptContext {
    const context = this.projectPrompt.createContext(request);

    // 기존 프로젝트 정보를 컨텍스트에 추가
    const existingProjectInfo = existingProjects.map((project) => ({
      title: project.title,
      techStack: project.techStack,
      features: project.features,
      difficulty: project.difficulty,
      theme: project.theme,
    }));

    // 프롬프트에 기존 프로젝트 정보 추가
    const additionalContext = `
다음은 사용자가 이미 진행했거나 진행 중인 프로젝트 목록입니다. 이 프로젝트들과 유사하거나 중복되는 프로젝트는 제안하지 마세요:

${JSON.stringify(existingProjectInfo, null, 2)}

새로운 프로젝트를 제안할 때 다음 규칙을 반드시 따라주세요:
1. 위 목록에 있는 프로젝트와 유사한 제목이나 기능을 가진 프로젝트는 제안하지 않음
2. 위 목록에 있는 프로젝트와 동일한 기술 스택 조합은 피함
3. 위 목록에 있는 프로젝트와 유사한 난이도나 테마는 가능한 피함
4. 완전히 새로운 아이디어와 접근 방식을 제안
5. 사용자의 관심사와 기술 수준은 유지하되, 새로운 경험을 제공할 수 있는 프로젝트 제안`;

    return {
      ...context,
      additionalContext,
    } as ProjectPromptContext;
  }

  async generateProjectRecommendation(
    request: PromptRequest & { existingProjects?: Project[] }
  ): Promise<Project> {
    const existingProjects = request.existingProjects || [];
    const context = this.createUniqueProjectContext(request, existingProjects);
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
      const newProject = parsedResponse.project;

      // 새 프로젝트가 기존 프로젝트와 중복되는지 검증
      const isDuplicate = existingProjects.some(
        (existing: Project) =>
          existing.title === newProject.title ||
          JSON.stringify(existing.techStack.sort()) ===
            JSON.stringify(newProject.techStack.sort()) ||
          JSON.stringify(existing.features.sort()) ===
            JSON.stringify(newProject.features.sort())
      );

      if (isDuplicate) {
        throw new APIError(
          "Generated project is too similar to existing projects. Please try again.",
          "openai"
        );
      }

      return newProject;
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
