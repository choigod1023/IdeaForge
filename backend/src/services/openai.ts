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
    return `다음 요구사항에 맞는 프로그래밍 프로젝트를 추천해주세요.:

      필수 요구사항:
      - 문장은 ~요 이런 식으로 작성해주세요. 사용자가 글에 거부감을 느끼지 않도록 해주세요.
      - 난이도: ${request.difficulty}
      - 선호하는 기술: ${request.preferredTech.join(", ")}
      ${request.theme ? `- 프로젝트 테마: ${request.theme}` : ""}
      ${request.description ? `- 추가 설명: ${request.description}` : ""}
      
      프로젝트 제약사항:
      - 해당 난이도(${
        request.difficulty
      })에 맞는 개발자가 느끼기에 재미있고 흥미로운 프로젝트여야 합니다
      - 아이디어가 실용적이거나 혹은 현재 개발자의 관심사에 맞는 프로젝트여야 합니다
      - 실제 구현 가능한 수준이어야 합니다.
      - 이전에 있던 프로젝트면 안됩니다.
      - 참신한 아이디어를 제시해 주세요.

      다음 JSON 형식으로 정확히 응답해주세요 (모든 필드는 필수입니다):
      {
        "id": "프로젝트-고유-id",
        "title": "프로젝트 제목 (한글로 작성, 8자 이내)",
        "description": {
          "summary": "프로젝트 한 줄 요약 (한글로 작성, 30자 이내)",
          "keyPoints": [
            "핵심 포인트 1 (한글로 작성, 50자 이내)",
            "핵심 포인트 2 (한글로 작성, 50자 이내)",
            "핵심 포인트 3 (한글로 작성, 50자 이내)"
          ],
          "details": "상세한 프로젝트 설명 (한글로 작성, 200자 이내)"
        },
        "techStack": ["사용할 기술 스택 (최소 3개)"],
        "difficulty": "${request.difficulty}",
        "features": ["주요 기능 3-4개 (한글로 작성)"],
        "learningOutcomes": ["학습할 수 있는 내용 3-4개 (한글로 작성)"],
        "resources": [
          "참고할 수 있는 자료 3-4개를 다음 형식으로 작성해주세요:",
          "- '설명 : URL' 형식으로 작성",
          "- 실제 존재하는 유튜브 영상 링크 1개 이상 포함 (예: 'React 기초 강좌 : https://www.youtube.com/watch?v=w7ejDZ8SWv8')",
          "- 나머지는 공식 문서나 블로그 포스트 등 실제 존재하는 자료의 링크 포함",
          "- 모든 링크는 반드시 실제 접속 가능한 URL이어야 함",
          "- 영상은 해당 기술이나 주제의 인기 있는 튜토리얼 영상이어야 함"
        ],
        "theme": "${request.theme || "생산성"}",
        "prerequisites": ${
          request.hasPrerequisites
            ? '["사전 지식/요구사항 3-4개 (한글로 작성)"]'
            : "[]"
        },
        "challenges": ${
          request.hasChallenges
            ? '["예상되는 도전 과제 3-4개 (한글로 작성)"]'
            : "[]"
        },
        "tips": ${request.hasTips ? '["개발 팁 3-4개 (한글로 작성)"]' : "[]"}
      }
      `;
  }
}

export const openAIService = new OpenAIService();
