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
            "당신은 개발자들에게 맞춤형 프로젝트 아이디어를 추천하는 프로그래밍 멘토입니다. 프로젝트는 다음과 같은 유형을 포함합니다: 1) 토이 프로젝트: 재미있고 학습 목적의 작은 프로젝트, 2) 포트폴리오 프로젝트: 실무에서 활용 가능한 완성도 높은 프로젝트, 3) 오픈소스 프로젝트: 커뮤니티에 기여할 수 있는 프로젝트, 4) 실용 프로젝트: 실제 문제를 해결하는 프로젝트. 추천은 개발자의 기술 수준과 관심사에 맞춰져야 하며, 각 프로젝트 유형에 적합한 난이도와 범위를 제시해야 합니다. 프로젝트와 관련된 학습 자료를 추천할 때는 반드시 다음 규칙을 따라주세요: 1) 공식 문서는 react.dev, nodejs.org, python.org, docs.djangoproject.com, developer.mozilla.org 중에서만 선택, 2) 기술 블로그는 d2.naver.com, techblog.woowahan.com, engineering.line.me, blog.kakaocdn.net 중에서만 선택, 3) 유튜브는 검색 결과 페이지 링크만 제공. 절대로 이 목록에 없는 URL을 사용하지 마세요.",
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

    // YouTube 검색 링크 생성 및 추가 (기술 스택만 사용)
    const searchQuery = `${project.techStack.join(" ")} 강좌`;
    const youtubeSearchUrl = `https://youtube.com/results?search_query=${encodeURIComponent(
      searchQuery
    )}`;

    // 기존 리소스에서 영상 관련 항목 제거
    const nonVideoResources = project.resources.filter(
      (resource) =>
        !resource.toLowerCase().includes("강좌") &&
        !resource.toLowerCase().includes("튜토리얼") &&
        !resource.includes("youtube.com") &&
        !resource.includes("youtu.be")
    );

    // 검색 링크 추가 (기술 스택 검색어를 제목으로 사용)
    project.resources = [
      ...nonVideoResources,
      `[검색] ${searchQuery} : ${youtubeSearchUrl}`,
    ];

    return project;
  }

  /**
   * Constructs the prompt for OpenAI based on user preferences
   * @param request User preferences and requirements
   * @returns Constructed prompt string
   */
  private constructPrompt(request: PromptRequest): string {
    return `다음 요구사항에 맞는 참신하고 실용적인 프로그래밍 프로젝트를 추천해주세요:

      필수 요구사항:
      - 문장은 ~요 이런 식으로 작성해주세요. 사용자가 글에 거부감을 느끼지 않도록 해주세요.
      - 난이도: ${request.difficulty}
      - 선호하는 기술: ${request.preferredTech.join(", ")}
      ${request.theme ? `- 프로젝트 테마: ${request.theme}` : ""}
      ${request.description ? `- 추가 설명: ${request.description}` : ""}
      
      프로젝트 제약사항:
      - 다음 유형의 프로젝트는 제외해주세요:
        * 할 일 관리 앱, 메모 앱, 채팅 앱, 블로그, 쇼핑몰 등 흔한 CRUD 앱
        * 단순한 계산기, 타이머, 날씨 앱 등 기본적인 유틸리티 앱
        * 기존 서비스의 단순 클론 프로젝트
      
      - 대신 다음 방향으로 프로젝트를 제안해주세요:
        * 특정 산업/도메인의 실제 문제를 해결하는 프로젝트 (예: 농업, 의료, 교육, 환경 등)
        * 새로운 기술 트렌드를 활용한 프로젝트 (예: AI, 블록체인, IoT, AR/VR 등)
        * 기존 서비스의 한계를 개선하거나 새로운 관점을 제시하는 프로젝트
        * 특정 사용자 그룹의 니즈를 충족시키는 프로젝트 (예: 장애인, 노인, 학생 등)
        * 사회적 가치를 창출하는 프로젝트 (예: 환경 보호, 교육 격차 해소 등)
      
      - 프로젝트는 다음 기준을 만족해야 합니다:
        * 해당 난이도(${
          request.difficulty
        })에 맞는 구현 가능한 수준이어야 합니다
        * 실제 사용자나 커뮤니티에 도움이 될 수 있어야 합니다
        * 기술적으로 도전적이면서도 학습 가치가 높아야 합니다
        * 기존 프로젝트와 차별화된 특징이 있어야 합니다
        * 확장 가능성이나 발전 가능성이 있어야 합니다

      다음 JSON 형식으로 정확히 응답해주세요 (모든 필드는 필수입니다):
      {
        "id": "프로젝트-고유-id",
        "title": "프로젝트 제목 (한글로 작성, 8자 이내)",
        "description": {
          "summary": "프로젝트 한 줄 요약 (한글로 작성, 30자 이내)",
          "keyPoints": [
            "핵심 포인트 1 (한글로 작성, 10자 이내)",
            "핵심 포인트 2 (한글로 작성, 10자 이내)",
            "핵심 포인트 3 (한글로 작성, 10자 이내)"
          ]
        },
        "techStack": ["사용할 기술 스택 (최소 3개, 선호 기술을 우선 포함)"],
        "difficulty": "${request.difficulty}",
        "projectType": ["프로젝트 유형 (토이/포트폴리오/오픈소스/실용 중 1-2개)"],
        "features": [
          "주요 기능 3-4개 (한글로 작성, 각 기능이 프로젝트의 차별점을 잘 드러내도록. 20자 이내)",
          "각 기능은 구체적이고 실용적이어야 하며, 단순 CRUD가 아닌 핵심 가치를 전달하는 기능이어야 합니다"
        ],
        "learningOutcomes": [
          "학습할 수 있는 내용 3-4개 (한글로 작성, 기술적 깊이와 도메인 지식을 모두 포함)",
          "단순 기술 학습이 아닌, 실제 문제 해결 능력 향상에 초점을 맞춰주세요"
        ],
        "resources": [
          "참고할 수 있는 자료 4-5개를 다음 형식으로 작성해주세요:",
          "각 리소스는 반드시 '[카테고리] 한글 제목 : URL : 검색키워드' 형식으로 작성",
          "카테고리는 다음 중 하나를 사용:",
          "  * [문서] - 공식 문서나 가이드",
          "  * [블로그] - 기술 블로그 글",
          "  * [강좌] - 유튜브 강좌",
          "  * [팁] - 개발 팁이나 노하우",
          "제목은 한글로 작성하고, 이해하기 쉽게 작성해주세요",
          "검색키워드는 해당 자료를 검색할 때 사용할 핵심 키워드입니다 (예: 'React Hooks', 'MongoDB 인덱싱', 'Node.js 성능 최적화')",
          "사용 가능한 URL 목록:",
          "  * 공식 문서: react.dev, nodejs.org, python.org, docs.djangoproject.com, developer.mozilla.org",
          "  * 기술 블로그: d2.naver.com, techblog.woowahan.com, engineering.line.me, blog.kakaocdn.net",
          "  * 유튜브: youtube.com/results",
          "GitHub 저장소는 다음 조건을 만족하는 실제 존재하는 저장소만 사용:",
          "  * 최소 100개 이상의 스타를 받은 인기 저장소",
          "  * 최근 1년 이내에 업데이트된 활성 저장소",
          "  * 실제 프로덕션에서 사용되는 검증된 저장소",
          "  * 예시로 사용할 때는 반드시 실제 URL을 사용 (example.com이나 가상의 URL 사용 금지)",
          "예시:",
          "[문서] React 컴포넌트 기초 : https://react.dev : React 컴포넌트",
          "[블로그] 실시간 데이터 처리 노하우 : https://d2.naver.com : 실시간 데이터 처리",
          "[강좌] React와 Node.js로 만드는 실시간 앱 : https://youtube.com/results?search_query=React+Node.js+강좌 : React Node.js 실시간",
          "[팁] 실시간 데이터 최적화 기법 : https://techblog.woowahan.com : 데이터 최적화",
          "GitHub 저장소 예시 (실제 존재하는 저장소만 사용):",
          "[예제] React 실시간 채팅 앱 : https://github.com/withastro/astro : React 채팅",
          "[예제] Node.js 소셜 미디어 API : https://github.com/vercel/next.js : Node.js API"
        ],
        "theme": "${request.theme || "혁신"}",
        "prerequisites": ${
          request.hasPrerequisites
            ? '["사전 지식/요구사항 3-4개 (한글로 작성, 기술적 요구사항과 도메인 지식을 모두 포함)"]'
            : "[]"
        },
        "challenges": ${
          request.hasChallenges
            ? '["예상되는 도전 과제 3-4개 (한글로 작성, 기술적 도전과 비즈니스/사용자 관점의 도전을 모두 포함)"]'
            : "[]"
        },
        "tips": ${
          request.hasTips
            ? '["개발 팁 3-4개 (한글로 작성, 단순 코딩 팁이 아닌 프로젝트의 성공을 위한 전략적 조언 포함. 20자 이내)"]'
            : "[]"
        }
      }
      `;
  }
}

export const openAIService = new OpenAIService();
