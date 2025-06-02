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

    // 각 카테고리별로 관련도 점수 기준으로 정렬하고 상위 4개만 선택
    const sortedTechResources = techResources
      .sort((a, b) => b.relevance.score - a.relevance.score)
      .slice(0, 4);

    const sortedFeatureResources = featureResources
      .sort((a, b) => b.relevance.score - a.relevance.score)
      .slice(0, 4);

    // 중복 제거 및 유사 리소스 통합
    return this.mergeSimilarResources([
      ...sortedTechResources,
      ...sortedFeatureResources,
    ]);
  }

  private mergeSimilarResources(
    resources: ProjectResource[]
  ): ProjectResource[] {
    const RELEVANCE_THRESHOLD = 7; // 7점 미만의 관련도는 제외 (10점 만점 기준)
    const mergedResources: ProjectResource[] = [];
    const processedTitles = new Set<string>();

    // 제목 유사도 체크를 위한 함수
    const isSimilarTitle = (title1: string, title2: string): boolean => {
      const normalize = (str: string) =>
        str.toLowerCase().replace(/[^가-힣a-z0-9]/g, "");
      const t1 = normalize(title1);
      const t2 = normalize(title2);

      // 한 단어 이상의 공통 키워드가 있으면 유사하다고 판단
      const words1 = t1.split(/\s+/);
      const words2 = t2.split(/\s+/);
      return words1.some((word) => words2.includes(word) && word.length > 1);
    };

    // 리소스 정렬 (YouTube 영상 우선, 기술 리소스 우선)
    const sortedResources = resources
      .filter((resource) => resource.relevance.score >= RELEVANCE_THRESHOLD) // 관련도 필터링
      .sort((a, b) => {
        // YouTube 영상 우선
        const aIsYoutube =
          a.url.includes("youtube.com") || a.url.includes("youtu.be");
        const bIsYoutube =
          b.url.includes("youtube.com") || b.url.includes("youtu.be");
        if (aIsYoutube && !bIsYoutube) return -1;
        if (!aIsYoutube && bIsYoutube) return 1;

        // 기술 리소스 우선
        if (a.category === "tech" && b.category === "feature") return -1;
        if (a.category === "feature" && b.category === "tech") return 1;

        // 관련도 점수로 정렬
        return b.relevance.score - a.relevance.score;
      });

    for (const resource of sortedResources) {
      // 이미 처리된 유사 제목이 있는지 확인
      const isDuplicate = Array.from(processedTitles).some((processedTitle) =>
        isSimilarTitle(processedTitle, resource.title)
      );

      if (!isDuplicate) {
        // 유사한 리소스 찾기
        const similarResource = mergedResources.find((existing) =>
          isSimilarTitle(existing.title, resource.title)
        );

        if (similarResource) {
          // 유사한 리소스가 있으면 통합
          similarResource.learningPoints = [
            ...new Set([
              ...similarResource.learningPoints,
              ...resource.learningPoints,
            ]),
          ];
          similarResource.codeExamples = [
            ...new Set([
              ...similarResource.codeExamples,
              ...resource.codeExamples,
            ]),
          ];
          similarResource.practicalExamples = [
            ...new Set([
              ...similarResource.practicalExamples,
              ...resource.practicalExamples,
            ]),
          ];
          similarResource.relevance.keyPoints = [
            ...new Set([
              ...similarResource.relevance.keyPoints,
              ...resource.relevance.keyPoints,
            ]),
          ];
          // 점수는 더 높은 것을 유지
          similarResource.relevance.score = Math.max(
            similarResource.relevance.score,
            resource.relevance.score
          );
        } else {
          // 새로운 리소스 추가
          mergedResources.push(resource);
          processedTitles.add(resource.title);
        }
      }
    }

    return mergedResources;
  }

  private validateResource(resource: any, index: number) {
    if (
      !resource.category ||
      !resource.title ||
      !resource.description ||
      !resource.url
    ) {
      throw new Error(
        `Invalid resource at index ${index}: missing required fields (category, title, description, url)`
      );
    }
  }

  private async searchTechResources(
    project: Project
  ): Promise<ProjectResource[]> {
    const prompt = `
다음 프로젝트의 기술 스택에 대한 체계적인 학습 자료를 검색해주세요. 모든 기술 스택을 동등하게 다루되, 반드시 신뢰할 수 있는 공식 자료만 제공해주세요.

프로젝트: ${project.title}
기술 스택: ${project.techStack.join(", ")}
난이도: ${project.difficulty}

검색 규칙:
1. YouTube 영상 자료 (최우선):
   * 반드시 다음 조건을 모두 만족하는 영상만 포함:
     - 공식 채널의 영상 (예: React 공식 채널, TensorFlow 공식 채널)
     - 최소 10만 조회수 이상의 인기 영상
     - 최근 2년 이내의 최신 영상
     - 영상 길이 10분 이상의 상세한 강의
     - 영상 제작자가 해당 기술의 핵심 개발자/메인테이너
     - 영상 내용이 공식 문서와 일치
   * 각 기술 스택당 최소 1개 이상의 YouTube 영상 포함
   * YouTube 영상이 없는 경우에만 문서 자료로 대체

2. 기술별 공식 학습 자료 (YouTube 영상이 부족한 경우에만):
   * 웹 기술:
     - React: react.dev, youtube.com/@react
     - TypeScript: typescriptlang.org, youtube.com/@typescript
     - Node.js: nodejs.org, youtube.com/@nodejs
   * 머신러닝/딥러닝:
     - TensorFlow: tensorflow.org, youtube.com/@tensorflow
     - PyTorch: pytorch.org, youtube.com/@pytorch
     - scikit-learn: scikit-learn.org
   * 모바일 개발:
     - React Native: reactnative.dev
     - Flutter: flutter.dev
     - Swift: developer.apple.com/swift
   * 게임 개발:
     - Unity: unity.com/learn
     - Unreal Engine: unrealengine.com/learn
   * 임베디드:
     - Arduino: arduino.cc/en/Guide
     - Raspberry Pi: raspberrypi.org/documentation
   * 기타 기술: 해당 기술의 공식 문서와 채널

3. 관련도 점수 기준 (10점 만점):
   * YouTube 영상:
     - 공식 채널: 9-10점
     - 인기 영상(10만+ 조회수): +1점
     - 최신 영상(2년 이내): +1점
     - 핵심 개발자/메인테이너: +1점
   * 문서 자료:
     - 공식 문서: 8-9점
     - 튜토리얼: 7-8점
     - 예제 코드: 6-7점
   * 7점 미만의 관련도 점수를 가진 리소스는 제외

4. 학습 자료 우선순위:
   * 1순위: 신뢰할 수 있는 공식 영상 자료
   * 2순위: 공식 문서의 핵심 개념과 기본 사용법
   * 3순위: 공식 튜토리얼과 실습 가이드
   * 4순위: 공식 예제 코드와 실전 적용 사례
   * 5순위: 공식 채널의 심화 강의

5. 기술 스택 간 연관성:
   * 각 기술이 프로젝트에서 어떻게 함께 사용되는지 설명
   * 기술 간 통합 방법과 모범 사례
   * 실제 프로젝트에서의 활용 예시
   * 주의: 다른 기술 스택의 내용은 포함하지 않음
     - 예: TensorFlow를 학습할 때 PyTorch 내용은 제외
     - 예: React Native를 학습할 때 Flutter 내용은 제외

6. 난이도별 학습 자료:
   * 초급: 기본 개념과 사용법
   * 중급: 심화 기능과 모범 사례
   * 고급: 최적화와 고급 패턴

7. URL 검증:
   * 모든 URL은 반드시 실제 존재하는지 확인
   * 공식 도메인만 사용
   * YouTube URL은 반드시 공식 채널의 영상만 사용
   * URL이 404나 접근 불가능한 경우 제외

8. 제목 작성 규칙:
   * 공식 문서/영상의 실제 제목을 최대한 유지
   * 학습 난이도를 명시
   * 실제 존재하는 강의/문서의 제목과 일치

9. 내용 검증:
   * description은 실제 학습 자료의 내용을 정확히 반영
   * learningPoints는 학습 자료의 핵심 개념
   * codeExamples는 공식 예제 코드만 사용
   * practicalExamples는 실제 적용 사례만 사용

10. 리소스 카테고리:
    * 기술 리소스의 경우 반드시 category를 "tech"로 설정
    * 기능 리소스의 경우 반드시 category를 "feature"로 설정
    * 기술 이름(예: "React", "TensorFlow")을 category로 사용하지 않음

주의: 
- 모든 기술 스택을 동등하게 다루되, 각 기술의 특성에 맞는 적절한 학습 자료를 제공
- 검색 결과가 부족하거나 신뢰할 수 없는 경우, 해당 기술에 대한 리소스는 제외
- 양보다 질이 중요하며, 신뢰할 수 있는 공식 자료만 포함
- 지정된 기술 스택과 직접적으로 관련된 내용만 포함
- 다른 기술 스택의 내용은 제외
- 신뢰할 수 없는 영상 자료는 제외하고 문서 자료로 대체
- 리소스의 category는 반드시 "tech" 또는 "feature" 중 하나로 설정

각 기술 스택에 대해 다음 순서로 정보를 제공해주세요:
1. 신뢰할 수 있는 공식 영상 자료 (있는 경우만)
2. 기본 개념과 핵심 기능
3. 실전 적용 방법
4. 심화 학습 자료

아래 JSON 형식으로만 응답해주세요:
{
  "resources": [
    {
      "category": "tech",
      "title": "string (실제 공식 학습 자료의 제목)",
      "url": "string (검증된 공식 URL)",
      "description": "string (학습 자료의 핵심 내용)",
      "learningPoints": ["string (핵심 학습 포인트)"],
      "codeExamples": ["string (공식 예제 코드)"],
      "practicalExamples": ["string (실제 적용 사례)"],
      "relevance": {
        "score": number,
        "reason": "string (프로젝트에서의 중요성)",
        "keyPoints": ["string (실제 활용 포인트)"]
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
            "당신은 개발 기술 전문가입니다. 모든 응답은 반드시 한글로 작성해주세요. 기술 리소스는 반드시 기술 스택 자체에 대한 정보만 포함해야 합니다 (예: React의 Server Components 동작 원리, TypeScript의 제네릭 타입 시스템). 기능 구현 방법이나 특정 기능의 구현 예시는 포함하지 마세요 (이는 기능 리소스에서 다룹니다). 코드 예시는 하나의 문자열로 작성하고, 문자열 연결 연산자(+)를 사용하지 마세요. 모든 내용은 실제 개발에 도움이 되는 실용적인 정보로 작성해주세요. 반드시 유효한 JSON 형식으로만 응답해주세요.",
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
다음 프로젝트의 주제와 기능에 대한 연구 자료, 사례 연구, 그리고 구현 가이드를 검색해주세요. 반드시 실제 존재하는 공식 자료만 제공해주세요.

프로젝트: ${project.title}
주요 기능: ${project.features.join(", ")}
기술 스택: ${project.techStack.join(", ")}
난이도: ${project.difficulty}

검색 규칙:
1. 주제/테마 관련 연구 자료 (최우선):
   * 학술 논문과 연구 결과 (예: Google Scholar, ResearchGate)
   * 산업 보고서와 백서 (예: Gartner, Forrester)
   * 성공 사례 연구 (예: Harvard Business Review, MIT Technology Review)
   * 사용자 경험 연구 (예: Nielsen Norman Group)
   * 시장 트렌드 분석 (예: TechCrunch, Wired)

2. 구현 가이드와 사례:
   * 공식 기술 블로그의 구현 사례
   * 오픈소스 프로젝트의 구현 예시
   * 공식 GitHub 저장소의 예제
   * 공식 YouTube 채널의 구현 가이드

3. 주제별 검색 예시:
   * "학습 도우미" 프로젝트의 경우:
     - 학습 효과를 높이는 UI/UX 연구
     - 학습 동기 부여 방법론
     - 개인화된 학습 경험 설계
     - 학습 데이터 분석과 피드백 시스템
   * "쇼핑몰" 프로젝트의 경우:
     - 전자상거래 UX 연구
     - 결제 시스템 보안 사례
     - 상품 추천 알고리즘 연구
   * "소셜 네트워크" 프로젝트의 경우:
     - 소셜 미디어 사용자 행동 연구
     - 커뮤니티 관리 모범 사례
     - 콘텐츠 모더레이션 시스템

4. URL 검증:
   * 모든 URL은 반드시 실제 존재하는지 확인
   * 신뢰할 수 있는 도메인만 사용:
     - 학술: scholar.google.com, researchgate.net
     - 기술: github.com, developer.mozilla.org
     - 연구: nngroup.com, hbr.org
     - 뉴스: techcrunch.com, wired.com
   * URL이 404나 접근 불가능한 경우 제외

5. 제목 작성 규칙:
   * 실제 연구/사례의 제목을 최대한 유지
   * 연구 결과나 사례를 명확히 표현
   * 실제 존재하는 자료의 제목과 일치

6. 내용 검증:
   * description은 실제 연구/사례의 핵심 내용을 정확히 반영
   * learningPoints는 연구 결과나 구현 사례의 주요 발견점
   * codeExamples는 실제 구현 예시만 사용
   * practicalExamples는 실제 적용 사례만 사용

각 기능에 대해 다음 순서로 정보를 제공해주세요:
1. 주제/테마 관련 연구 자료
2. 실제 구현 사례
3. 구현 가이드와 예제 코드

주의: 
- 검색 결과가 부족하거나 신뢰할 수 없는 경우, 해당 기능에 대한 리소스는 제외
- 양보다 질이 중요하며, 실제 연구 결과나 검증된 사례를 우선
- 프로젝트의 주제/테마와 직접적으로 관련된 연구나 사례를 우선적으로 포함

아래 JSON 형식으로만 응답해주세요:
{
  "resources": [
    {
      "category": "feature",
      "title": "string (실제 연구/사례의 제목)",
      "url": "string (검증된 URL)",
      "description": "string (연구/사례의 핵심 내용)",
      "learningPoints": ["string (주요 발견점/결과)"],
      "codeExamples": ["string (실제 구현 예시)"],
      "practicalExamples": ["string (실제 적용 사례)"],
      "relevance": {
        "score": number,
        "reason": "string (프로젝트 주제와의 연관성)",
        "keyPoints": ["string (실제 적용 포인트)"]
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
            "당신은 개발 기능 구현 전문가입니다. 모든 응답은 반드시 한글로 작성해주세요. 기능 리소스는 반드시 프로젝트의 기능 구현 방법에 대한 정보만 포함해야 합니다 (예: 실시간 데이터 시각화 구현, 타입 안전한 API 클라이언트 개발). 기술 자체의 설명이나 기본 개념은 포함하지 마세요 (이는 기술 리소스에서 다룹니다). 코드 예시는 하나의 문자열로 작성하고, 문자열 연결 연산자(+)를 사용하지 마세요. 모든 내용은 실제 개발에 도움이 되는 실용적인 정보로 작성해주세요. 반드시 유효한 JSON 형식으로만 응답해주세요.",
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
      // 1. 마크다운 코드 블록에서 JSON 추출
      const jsonBlockRegex = /```(?:json)?\s*(\{[\s\S]*?\})\s*```/;
      const match = response.match(jsonBlockRegex);

      if (match && match[1]) {
        // JSON 블록을 찾았으면 그것만 사용
        return match[1].trim();
      }

      // 2. JSON 블록을 찾지 못한 경우, 전체 텍스트에서 JSON 객체 추출
      const jsonObjectRegex = /\{[\s\S]*\}/;
      const jsonMatch = response.match(jsonObjectRegex);

      if (jsonMatch) {
        const potentialJson = jsonMatch[0].trim();

        // 3. JSON 유효성 검사
        try {
          JSON.parse(potentialJson);
          return potentialJson;
        } catch (e) {
          // JSON 파싱 실패 시 추가 정제 시도
          const cleaned = potentialJson
            // 불필요한 공백 제거
            .replace(/\s+/g, " ")
            // 줄바꿈 문자 정리
            .replace(/\\n/g, "\\n")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            // 따옴표 정리
            .replace(/\\"/g, '\\"')
            // 제어 문자 제거
            .replace(/[\u0000-\u001F]/g, "")
            // 중복된 쉼표 제거
            .replace(/,(\s*[}\]])/g, "$1")
            // 마지막 쉼표 제거
            .replace(/,(\s*})/g, "}");

          // 4. 최종 JSON 유효성 검사
          try {
            JSON.parse(cleaned);
            return cleaned;
          } catch (error: unknown) {
            const errorMessage =
              error instanceof Error ? error.message : String(error);
            throw new Error(`Invalid JSON after cleaning: ${errorMessage}`);
          }
        }
      }

      // 5. JSON을 찾지 못한 경우
      throw new Error("No valid JSON found in response");
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
