import { Project, ProjectResource, PromptRequest } from "../../types";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export class PerplexityService {
  private readonly openai: OpenAI;

  constructor() {
    if (!process.env.PERPLEXITY_API_KEY) {
      throw new Error(
        "PERPLEXITY_API_KEY is not defined in environment variables"
      );
    }

    this.openai = new OpenAI({
      apiKey: process.env.PERPLEXITY_API_KEY,
      baseURL: "https://api.perplexity.ai",
    });
  }

  async searchProjectResources(
    project: Project,
    request: PromptRequest
  ): Promise<ProjectResource[]> {
    const techResources = await this.searchTechResources(project);
    const featureResources = await this.searchFeatureResources(project);
    return [...techResources, ...featureResources];
  }

  private validateResource(resource: any, index: number) {
    if (!resource.category || !resource.title || !resource.description) {
      throw new Error(
        `Invalid resource at index ${index}: missing required fields`
      );
    }
  }

  private async searchTechResources(
    project: Project
  ): Promise<ProjectResource[]> {
    const prompt = `
다음 프로젝트의 기술 스택에 대한 최신 정보를 검색해주세요. 반드시 아래 JSON 형식으로만 응답해주세요. 다른 설명이나 텍스트는 포함하지 마세요.
모든 응답은 반드시 한글로 작성해주세요.

프로젝트: ${project.title}
기술 스택: ${project.techStack.join(", ")}
난이도: ${project.difficulty}

각 기술에 대해 다음 정보를 한글로 제공해주세요:
1. 최신 트렌드와 모범 사례
2. 실제 구현 예시와 코드 스니펫
3. 학습 포인트와 주의사항
4. 실전 적용 팁

주의사항:
- title은 반드시 구체적인 기술 주제를 포함해야 합니다:
  * 좋은 예시:
    - "React Server Components 구현법" (구체적인 기술 주제)
    - "TypeScript 제네릭 활용 기법" (구체적인 기능)
    - "Node.js 스트림 처리 최적화" (성능 이슈 명시)
  * 나쁜 예시:
    - "React 최신 트렌드" (너무 일반적)
    - "TypeScript 기초" (너무 광범위)
    - "Node.js 개요" (정보가 부족)

- description은 해당 기술의 구체적인 적용 방법이나 핵심 기능을 설명해주세요:
  * 좋은 예시:
    - "서버 컴포넌트로 초기 로딩 최적화" (구체적인 적용 방법)
    - "제네릭으로 타입 안전성 확보" (구체적인 이점)
    - "스트림으로 대용량 데이터 처리" (구체적인 사용 사례)
  * 나쁜 예시:
    - "React 2025 트렌드" (너무 일반적)
    - "TypeScript 타입 시스템" (정보가 부족)
    - "Node.js 비동기 처리" (구체적이지 않음)

- codeExamples는 반드시 실제 실행 가능한 코드를 포함해야 합니다:
  * 코드는 반드시 하나의 문자열로 작성해주세요 (문자열 연결 연산자 '+' 사용하지 마세요)
  * 코드 내의 따옴표는 이스케이프 처리해주세요 (\\")
  * 코드 내의 개행은 \\n으로 표시해주세요
  * 코드는 주석을 포함하여 이해하기 쉽게 작성해주세요
  * 코드는 반드시 title과 description에서 언급한 구체적인 기능을 구현해야 합니다

- learningPoints는 구체적인 학습 포인트를 제공해야 합니다:
  * 좋은 예시:
    - "서버 컴포넌트의 hydration 최적화 방법"
    - "제네릭 타입의 재사용성 향상 기법"
    - "스트림 백프레셔 처리 전략"
  * 나쁜 예시:
    - "Server-side Rendering" (너무 일반적)
    - "AI/ML 통합" (구체적이지 않음)
    - "상태 관리" (정보가 부족)

- practicalExamples는 실제 프로젝트에 적용할 수 있는 구체적인 예시를 제공해야 합니다:
  * 좋은 예시:
    - "서버 컴포넌트로 초기 페이지 로드 시간 50% 단축"
    - "제네릭 타입으로 API 응답 처리 코드 30% 감소"
    - "스트림 처리로 1GB 이상 파일 업로드 성능 개선"
  * 나쁜 예시:
    - "서버 사이드 렌더링 활용" (구체적이지 않음)
    - "AI 기반 추천 시스템 구현" (정보가 부족)
    - "상태 관리 최적화" (너무 일반적)

- relevance는 프로젝트와의 연관성을 구체적으로 설명해야 합니다:
  * score: 1-10 사이의 숫자
  * reason: 프로젝트에 해당 기술이 왜 중요한지 구체적으로 설명
  * keyPoints: 프로젝트에 적용할 수 있는 구체적인 기술 포인트

아래 JSON 형식으로만 응답해주세요:
{
  "resources": [
    {
      "category": "tech",
      "title": "string (한글, 구체적인 기술 주제)",
      "url": "string",
      "description": "string (한글, 구체적인 적용 방법)",
      "learningPoints": ["string (한글, 구체적인 학습 포인트)"],
      "codeExamples": ["string (구체적인 기능 구현 코드)"],
      "practicalExamples": ["string (한글, 구체적인 적용 예시)"],
      "relevance": {
        "score": number,
        "reason": "string (한글, 구체적인 연관성)",
        "keyPoints": ["string (한글, 구체적인 기술 포인트)"]
      }
    }
  ]
}`;

    const completion = await this.openai.chat.completions.create({
      model: "sonar",
      messages: [
        {
          role: "system",
          content:
            "당신은 개발 기술 전문가입니다. 모든 응답은 반드시 한글로 작성해주세요. title과 description은 반드시 구체적인 기술 주제와 적용 방법을 포함해야 합니다. 코드 예시는 하나의 문자열로 작성하고, 문자열 연결 연산자(+)를 사용하지 마세요. 모든 내용은 실제 개발에 도움이 되는 실용적인 정보로 작성해주세요. 반드시 유효한 JSON 형식으로만 응답해주세요.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    const response = completion.choices[0].message.content;
    if (!response) throw new Error("Failed to get tech resources");

    try {
      const cleanJson = this.cleanJsonResponse(response);
      const result = JSON.parse(cleanJson);
      if (!result.resources || !Array.isArray(result.resources)) {
        throw new Error("Invalid resources format in response");
      }

      // Validate each resource
      result.resources.forEach((resource: any, index: number) => {
        this.validateResource(resource, index);
      });

      return result.resources;
    } catch (error: unknown) {
      console.error("Tech Resource Search Error:", error);
      console.error("Raw response:", response);
      throw new Error(
        `Failed to parse tech resources: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  private async searchFeatureResources(
    project: Project
  ): Promise<ProjectResource[]> {
    const prompt = `
다음 프로젝트의 주요 기능 구현에 대한 최신 정보를 검색해주세요. 반드시 아래 JSON 형식으로만 응답해주세요. 다른 설명이나 텍스트는 포함하지 마세요.
모든 응답은 반드시 한글로 작성해주세요.

프로젝트: ${project.title}
주요 기능: ${project.features.join(", ")}
기술 스택: ${project.techStack.join(", ")}
난이도: ${project.difficulty}

각 기능에 대해 다음 정보를 한글로 제공해주세요:
1. 구현 방법과 모범 사례
2. 실제 구현 예시와 코드 스니펫
3. 학습 포인트와 주의사항
4. 실전 적용 팁

주의사항:
- title은 반드시 구체적인 기능 구현 방법을 포함해야 합니다:
  * 좋은 예시:
    - "React로 실시간 데이터 시각화 구현" (구체적인 구현 방법)
    - "TypeScript로 타입 안전한 API 클라이언트 개발" (구체적인 기능)
    - "Node.js로 대용량 파일 업로드 처리" (구체적인 성능 이슈)
  * 나쁜 예시:
    - "데이터 시각화" (너무 일반적)
    - "API 연동" (너무 광범위)
    - "파일 업로드" (정보가 부족)

- description은 해당 기능의 구체적인 구현 방법이나 핵심 포인트를 설명해주세요:
  * 좋은 예시:
    - "WebSocket으로 실시간 차트 업데이트" (구체적인 구현 방법)
    - "Axios 인터셉터로 API 에러 처리" (구체적인 기능)
    - "스트림으로 청크 단위 파일 업로드" (구체적인 구현 방법)
  * 나쁜 예시:
    - "데이터 시각화 구현" (너무 일반적)
    - "API 클라이언트 개발" (정보가 부족)
    - "파일 업로드 처리" (구체적이지 않음)

- codeExamples는 반드시 실제 실행 가능한 코드를 포함해야 합니다:
  * 코드는 반드시 하나의 문자열로 작성해주세요 (문자열 연결 연산자 '+' 사용하지 마세요)
  * 코드 내의 따옴표는 이스케이프 처리해주세요 (\\")
  * 코드 내의 개행은 \\n으로 표시해주세요
  * 코드는 주석을 포함하여 이해하기 쉽게 작성해주세요
  * 코드는 반드시 title과 description에서 언급한 구체적인 기능을 구현해야 합니다

- learningPoints는 구체적인 학습 포인트를 제공해야 합니다:
  * 좋은 예시:
    - "WebSocket 연결 상태 관리와 재연결 전략"
    - "API 인터셉터에서 토큰 갱신 처리 방법"
    - "대용량 파일 업로드 시 메모리 사용량 최적화"
  * 나쁜 예시:
    - "실시간 데이터 처리" (너무 일반적)
    - "API 에러 처리" (구체적이지 않음)
    - "파일 업로드" (정보가 부족)

- practicalExamples는 실제 프로젝트에 적용할 수 있는 구체적인 예시를 제공해야 합니다:
  * 좋은 예시:
    - "WebSocket으로 실시간 차트 업데이트 지연시간 100ms 이내 유지"
    - "API 인터셉터로 전역 에러 처리 코드 50% 감소"
    - "스트림 처리로 1GB 파일 업로드 메모리 사용량 80% 감소"
  * 나쁜 예시:
    - "실시간 데이터 시각화 구현" (구체적이지 않음)
    - "API 클라이언트 개발" (정보가 부족)
    - "파일 업로드 기능 추가" (너무 일반적)

- relevance는 프로젝트와의 연관성을 구체적으로 설명해야 합니다:
  * score: 1-10 사이의 숫자
  * reason: 프로젝트에 해당 기능이 왜 중요한지 구체적으로 설명
  * keyPoints: 프로젝트에 적용할 수 있는 구체적인 구현 포인트

아래 JSON 형식으로만 응답해주세요:
{
  "resources": [
    {
      "category": "feature",
      "title": "string (한글, 구체적인 기능 구현 방법)",
      "url": "string",
      "description": "string (한글, 구체적인 구현 방법)",
      "learningPoints": ["string (한글, 구체적인 학습 포인트)"],
      "codeExamples": ["string (구체적인 기능 구현 코드)"],
      "practicalExamples": ["string (한글, 구체적인 적용 예시)"],
      "relevance": {
        "score": number,
        "reason": "string (한글, 구체적인 연관성)",
        "keyPoints": ["string (한글, 구체적인 구현 포인트)"]
      }
    }
  ]
}`;

    const completion = await this.openai.chat.completions.create({
      model: "sonar",
      messages: [
        {
          role: "system",
          content:
            "당신은 개발 기능 구현 전문가입니다. 모든 응답은 반드시 한글로 작성해주세요. title과 description은 반드시 구체적인 기능 구현 방법을 포함해야 합니다. 코드 예시는 하나의 문자열로 작성하고, 문자열 연결 연산자(+)를 사용하지 마세요. 모든 내용은 실제 개발에 도움이 되는 실용적인 정보로 작성해주세요. 반드시 유효한 JSON 형식으로만 응답해주세요.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    const response = completion.choices[0].message.content;
    if (!response) throw new Error("Failed to get feature resources");

    try {
      const cleanJson = this.cleanJsonResponse(response);
      const result = JSON.parse(cleanJson);
      if (!result.resources || !Array.isArray(result.resources)) {
        throw new Error("Invalid resources format in response");
      }

      // Validate each resource
      result.resources.forEach((resource: any, index: number) => {
        this.validateResource(resource, index);
      });

      return result.resources;
    } catch (error: unknown) {
      console.error("Feature Resource Search Error:", error);
      console.error("Raw response:", response);
      throw new Error(
        `Failed to parse feature resources: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  private cleanJsonResponse(response: string): string {
    try {
      // First remove any markdown code block markers
      let cleaned = response.replace(/```json\n?|\n?```/g, "").trim();

      // Find the first { and last }
      const startIndex = cleaned.indexOf("{");
      const endIndex = cleaned.lastIndexOf("}");

      if (startIndex === -1 || endIndex === -1) {
        throw new Error("Invalid JSON format: missing { or }");
      }

      // Extract just the JSON part
      cleaned = cleaned.slice(startIndex, endIndex + 1);

      // Validate basic JSON structure
      if (!cleaned.startsWith("{") || !cleaned.endsWith("}")) {
        throw new Error("Invalid JSON structure");
      }

      // Check for unclosed arrays or objects
      const stack: string[] = [];
      let inString = false;
      let escapeNext = false;

      for (let i = 0; i < cleaned.length; i++) {
        const char = cleaned[i];

        if (escapeNext) {
          escapeNext = false;
          continue;
        }

        if (char === "\\") {
          escapeNext = true;
          continue;
        }

        if (char === '"' && !escapeNext) {
          inString = !inString;
          continue;
        }

        if (!inString) {
          if (char === "{" || char === "[") {
            stack.push(char);
          } else if (char === "}") {
            if (stack.pop() !== "{") {
              throw new Error("Mismatched brackets: unexpected }");
            }
          } else if (char === "]") {
            if (stack.pop() !== "[") {
              throw new Error("Mismatched brackets: unexpected ]");
            }
          }
        }
      }

      if (stack.length > 0) {
        throw new Error(`Unclosed ${stack[stack.length - 1]}`);
      }

      // Handle escaped characters
      cleaned = cleaned
        .replace(/\\n/g, "\\n") // Preserve newlines
        .replace(/\\r/g, "\\r") // Preserve carriage returns
        .replace(/\\t/g, "\\t") // Preserve tabs
        .replace(/\\"/g, '\\"') // Preserve escaped quotes
        .replace(/[\u0000-\u001F]/g, ""); // Remove other control characters

      // Try parsing to validate JSON
      JSON.parse(cleaned);

      return cleaned;
    } catch (error: unknown) {
      console.error("JSON Cleaning Error:", error);
      console.error("Original response:", response);
      throw new Error(
        `Failed to clean JSON response: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}

export const perplexityService = new PerplexityService();
