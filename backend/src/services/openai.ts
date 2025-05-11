import OpenAI from "openai";
import { PromptRequest, Project } from "../types";
import dotenv from "dotenv";

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

  /**
   * Generates a project recommendation based on user preferences
   * @param request User preferences and requirements
   * @returns Generated project recommendation
   */
  async generateProjectRecommendation(
    request: PromptRequest
  ): Promise<Project> {
    const prompt = this.constructPrompt(request);

    const completion = await this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "당신은 개발자들에게 맞춤형 프로젝트 아이디어를 추천하는 프로그래밍 멘토입니다. 추천은 상세하고 실용적이지만 개발자가 재밌어할 아이디어였으면 좋겠고, 개발자의 기술 수준과 관심사에 맞춰져야 합니다.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    const response = completion.choices[0].message.content;
    if (!response) throw new Error("프로젝트 추천 생성에 실패했습니다");

    const project = JSON.parse(response) as Project;
    return project;
  }

  /**
   * Constructs the prompt for OpenAI based on user preferences
   * @param request User preferences and requirements
   * @returns Constructed prompt string
   */
  private constructPrompt(request: PromptRequest): string {
    return `다음 요구사항에 맞는 프로그래밍 프로젝트를 추천해주세요:

      필수 요구사항:
      - 난이도: ${
        request.difficulty
      } (반드시 "초급", "중급", "고급" 중 하나로 응답)
      - 선호하는 기술: ${request.preferredTech.join(", ")}
      ${request.theme ? `- 프로젝트 테마: ${request.theme}` : ""}
      ${request.description ? `- 추가 설명: ${request.description}` : ""}
      
      프로젝트 제약사항:
      - 해당 난이도에 있는 개발자가 느끼기에 재미있고 흥미로운 프로젝트여야 합니다
      - 아이디어가 실용적이거나 혹은 현재 개발자의 관심사에 맞는 프로젝트여야 합니다
      - 실제 구현 가능한 수준이어야 합니다.
      - 이전에 있던 프로젝트면 안됩니다.
      - 참신한 아이디어를 제시해 주세요.

      다음 JSON 형식으로 정확히 응답해주세요 (모든 필드는 필수입니다):
      {
        "id": "프로젝트-고유-id",
        "title": "프로젝트 제목 (한글로 작성)",
        "description": "상세한 프로젝트 설명 (한글로 작성, 200자 이내)",
        "techStack": ["사용할 기술 스택 (최소 3개)"],
        "difficulty": "${request.difficulty}",
        "features": ["주요 기능 5-7개 (한글로 작성)"],
        "learningOutcomes": ["학습할 수 있는 내용 5-7개 (한글로 작성)"],
        "resources": ["참고할 수 있는 자료 5-7개 (한글로 작성, 해당 링크 포함)"],
        "theme": "${request.theme || "생산성"}",
        "prerequisites": ${
          request.hasPrerequisites
            ? '["사전 지식/요구사항 5-7개 (한글로 작성)"]'
            : "[]"
        },
        "challenges": ${
          request.hasChallenges
            ? '["예상되는 도전 과제 5-7개 (한글로 작성)"]'
            : "[]"
        },
        "tips": ${request.hasTips ? '["개발 팁 5-7개 (한글로 작성)"]' : "[]"}
      }`;
  }
}

export const openAIService = new OpenAIService();
