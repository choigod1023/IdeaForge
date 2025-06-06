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

    // 기술 스택 선호도 정보 추가
    const techStackPreference = `
사용자의 기술 스택 선호도:
- 선호 기술: ${request.preferredTech.join(", ")}
- 난이도: ${request.difficulty}

프로젝트 추천 시 다음 규칙을 반드시 따라주세요:
1. 선호하는 기술 스택을 우선적으로 사용
2. 선호하지 않는 기술 스택은 제외 (예: Python, matplotlib 등)
3. 선호 기술 스택의 최신 트렌드와 모범 사례를 반영
4. 선호 기술 스택의 생태계와 도구를 활용한 프로젝트 제안
5. 선호 기술 스택의 공식 문서와 학습 자료를 참고`;

    // 기존 프로젝트 정보를 컨텍스트에 추가
    const existingProjectInfo = existingProjects.map((project) => ({
      title: project.title,
      techStack: project.techStack,
      features: project.features,
      difficulty: project.difficulty,
      theme: project.theme,
    }));

    // 프롬프트에 기존 프로젝트 정보와 기술 스택 선호도 추가
    const additionalContext = `
${techStackPreference}

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

  private isProjectDuplicate(
    newProject: Project,
    existingProjects: Project[]
  ): boolean {
    return existingProjects.some((existing) => {
      // 1. 제목 유사도 체크
      const titleSimilarity = this.calculateStringSimilarity(
        newProject.title,
        existing.title
      );
      if (titleSimilarity > 0.7) return true;

      // 2. 기술 스택 유사도 체크
      const techStackSimilarity = this.calculateArraySimilarity(
        newProject.techStack.map((t) => t.name),
        existing.techStack.map((t) => t.name)
      );
      if (techStackSimilarity > 0.8) return true;

      // 3. 기능 유사도 체크
      const featuresSimilarity = this.calculateArraySimilarity(
        newProject.features,
        existing.features
      );
      if (featuresSimilarity > 0.7) return true;

      // 4. 설명 유사도 체크
      const descriptionSimilarity = this.calculateStringSimilarity(
        newProject.description.summary,
        existing.description.summary
      );
      if (descriptionSimilarity > 0.6) return true;

      return false;
    });
  }

  private calculateStringSimilarity(str1: string, str2: string): number {
    // 간단한 문자열 유사도 계산 (0-1 사이 값)
    const set1 = new Set(str1.toLowerCase().split(/\s+/));
    const set2 = new Set(str2.toLowerCase().split(/\s+/));
    const intersection = new Set([...set1].filter((x) => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
  }

  private calculateArraySimilarity(arr1: string[], arr2: string[]): number {
    // 배열 유사도 계산 (0-1 사이 값)
    const set1 = new Set(arr1.map((s) => s.toLowerCase()));
    const set2 = new Set(arr2.map((s) => s.toLowerCase()));
    const intersection = new Set([...set1].filter((x) => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
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

      // 중복 체크 로직 적용
      if (this.isProjectDuplicate(newProject, existingProjects)) {
        throw new APIError(
          "생성된 프로젝트가 기존 프로젝트와 너무 유사합니다. 다시 시도해주세요.",
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
