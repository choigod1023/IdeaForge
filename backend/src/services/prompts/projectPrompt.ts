import { PromptRequest, Project } from "../../types";

export class ProjectPrompt {
  private static readonly SYSTEM_PROMPT = `당신은 개발자들에게 맞춤형 프로젝트 아이디어를 추천하는 프로그래밍 멘토입니다. 
프로젝트는 다음과 같은 유형을 포함합니다: 
1) 토이 프로젝트: 재미있고 학습 목적의 작은 프로젝트, 
2) 포트폴리오 프로젝트: 실무에서 활용 가능한 완성도 높은 프로젝트, 
3) 오픈소스 프로젝트: 커뮤니티에 기여할 수 있는 프로젝트, 
4) 실용 프로젝트: 실제 문제를 해결하는 프로젝트. 
추천은 개발자의 기술 수준과 관심사에 맞춰져야 하며, 각 프로젝트 유형에 적합한 난이도와 범위를 제시해야 합니다. 
특히 기존 프로젝트와 유사하지 않으면서도 선택한 테마에 맞는 새로운 아이디어를 제시해야 합니다. 
반드시 JSON 형식으로 응답해주세요.`;

  private static readonly PROJECT_CONSTRAINTS = `
      프로젝트 제약사항:
      - 다음 유형의 프로젝트는 제외해주세요:
        * 할 일 관리 앱, 메모 앱, 채팅 앱, 블로그, 쇼핑몰 등 흔한 CRUD 앱
        * 단순한 계산기, 타이머, 날씨 앱 등 기본적인 유틸리티 앱
        * 기존 서비스의 단순 클론 프로젝트
        * 위 기존 프로젝트 목록과 유사한 프로젝트
      
      - 대신 다음 방향으로 프로젝트를 제안해주세요:
        * 특정 산업/도메인의 실제 문제를 해결하는 프로젝트 (예: 농업, 의료, 교육, 환경 등)
        * 새로운 기술 트렌드를 활용한 프로젝트 (예: AI, 블록체인, IoT, AR/VR 등)
        * 기존 서비스의 한계를 개선하거나 새로운 관점을 제시하는 프로젝트
        * 특정 사용자 그룹의 니즈를 충족시키는 프로젝트 (예: 장애인, 노인, 학생 등)
        * 사회적 가치를 창출하는 프로젝트 (예: 환경 보호, 교육 격차 해소 등)`;

  private static readonly PROJECT_CRITERIA = `
      - 프로젝트는 다음 기준을 만족해야 합니다:
        * 해당 난이도에 맞는 구현 가능한 수준이어야 합니다
        * 실제 사용자나 커뮤니티에 도움이 될 수 있어야 합니다
        * 기술적으로 도전적이면서도 학습 가치가 높아야 합니다
        * 기존 프로젝트와 차별화된 특징이 있어야 합니다
        * 확장 가능성이나 발전 가능성이 있어야 합니다`;

  static readonly RESOURCE_EVALUATION_CRITERIA = `
      각 참고 자료는 다음 기준으로 평가해주세요:
      1. 관련성 (0-100)
         - 프로젝트의 핵심 기능과 얼마나 관련이 있는가?
         - 기술 스택과 얼마나 일치하는가?
         - 프로젝트의 목표와 얼마나 부합하는가?
      
      2. 품질 (0-100)
         - 자료의 신뢰성과 전문성
         - 최신성 (최근 2년 이내인가?)
         - 실제 구현 사례가 포함되어 있는가?
      
      3. 학습 가치 (0-100)
         - 새로운 인사이트를 제공하는가?
         - 실제 적용 가능한 내용인가?
         - 문제 해결 방법이 구체적인가?
      
      4. 실용성 (0-100)
         - 바로 적용 가능한 코드나 예제가 있는가?
         - 단계별 가이드가 제공되는가?
         - 실제 프로젝트에 도움이 될 수 있는가?`;

  private static readonly JSON_SCHEMA = `
      다음 JSON 형식으로 정확히 응답해주세요 (모든 필드는 필수입니다):
      {
        "id": "프로젝트-고유-id",
        "title": "프로젝트 제목 (한글로 작성, 10자 이내)",
        "description": {
          "summary": "프로젝트 한 줄 요약 (한글로 작성, 18자 이내)",
          "keyPoints": [
            "핵심 포인트 1 (한글로 작성, 15자 이내)",
            "핵심 포인트 2 (한글로 작성, 15자 이내)",
            "핵심 포인트 3 (한글로 작성, 15자 이내)"
          ]
        },
        "techStack": [
          "사용할 기술 스택 (난이도별 필수 기술을 우선 포함하고, 선택 기술을 추가)"
        ],
        "difficulty": "난이도",
        "projectType": ["프로젝트 유형 (토이/포트폴리오/오픈소스/실용 중 1-2개)"],
        "features": [
          "주요 기능 3-4개 (난이도별 구현 수준에 맞게 작성. 20자 이내)"
        ],
        "learningOutcomes": [
          "학습할 수 있는 내용 3-4개 (난이도별 학습 포인트 포함. 20자 이내)"
        ],
        "resources": [
          {
            "category": "카테고리 (다음 중 하나)",
            "title": "자료 제목",
            "url": "URL",
            "description": "자료에 대한 간단한 설명 (100자 이내)",
            "learningPoints": [
              "주요 학습 포인트 1 (50자 이내)",
              "주요 학습 포인트 2 (50자 이내)",
              "주요 학습 포인트 3 (50자 이내)"
            ],
            "codeExamples": [
              "코드 예제 설명 1 (50자 이내)",
              "코드 예제 설명 2 (50자 이내)"
            ],
            "practicalExamples": [
              "실전 적용 예시 1 (50자 이내)",
              "실전 적용 예시 2 (50자 이내)"
            ],
            "relevance": {
              "score": 0-100,
              "reason": "이 자료가 프로젝트에 도움이 되는 이유 (200자 이내)",
              "keyPoints": [
                "핵심 포인트 1 (50자 이내)",
                "핵심 포인트 2 (50자 이내)",
                "핵심 포인트 3 (50자 이내)"
              ]
            }
          }
        ],
        "theme": "테마",
        "prerequisites": ["사전 지식/요구사항 3-4개 (한글로 작성, 15자 이내)"],
        "challenges": ["예상되는 도전 과제 3-4개 (한글로 작성, 15자 이내)"],
        "tips": ["개발 팁 3-4개 (한글로 작성, 20자 이내)"]
      }`;

  static getSystemPrompt(): string {
    return this.SYSTEM_PROMPT;
  }

  static constructUserPrompt(
    request: PromptRequest,
    existingProjects: Project[] = []
  ): string {
    const existingProjectsStr = this.formatExistingProjects(existingProjects);
    const themeConstraint = request.theme
      ? `특히 "${request.theme}" 테마에 맞는 독창적인 프로젝트`
      : "독창적이고 혁신적인 프로젝트";

    return `다음 요구사항에 맞는 참신하고 실용적인 프로그래밍 프로젝트를 추천해주세요:

      필수 요구사항:
      - 문장은 ~요 이런 식으로 작성해주세요. 사용자가 글에 거부감을 느끼지 않도록 해주세요.
      - 난이도: ${request.difficulty} (난이도별 기준을 반드시 준수해주세요)
      - 선호하는 기술: ${request.preferredTech.join(", ")}
      ${request.theme ? `- 프로젝트 테마: ${request.theme}` : ""}
      ${request.description ? `- 추가 설명: ${request.description}` : ""}

      기존 프로젝트 목록 (이와 유사하지 않은 새로운 아이디어를 제시해주세요):
      ${existingProjectsStr}
      
      ${this.PROJECT_CONSTRAINTS}
      
      ${this.PROJECT_CRITERIA}
        * ${themeConstraint}
      
      ${this.RESOURCE_EVALUATION_CRITERIA}
      
      ${this.JSON_SCHEMA}`;
  }

  private static formatExistingProjects(projects: Project[]): string {
    return projects
      .map(
        (p) => `
        - 제목: ${p.title}
        - 요약: ${p.description.summary}
        - 기술 스택: ${p.techStack.join(", ")}
        - 테마: ${p.theme}
        - 난이도: ${p.difficulty}
        `
      )
      .join("\n");
  }
}
