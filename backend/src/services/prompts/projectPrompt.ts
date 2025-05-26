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
          {
            "name": "기술 이름 (예: React, TypeScript, Node.js 등)",
            "descriptions": [
              "이 기술의 핵심 특징을 간단하고 친근하게 설명해주세요 (~요로 끝나도록)",
              "이 기술이 프로젝트에 어떤 도움을 주는지 설명해주세요",
              "이 기술의 주요 장점이나 특별한 점을 설명해주세요"
            ]
          }
        ],
        "difficulty": "난이도",
        "projectType": ["프로젝트 유형 (토이/포트폴리오/오픈소스/실용 중 1-2개)"],
        "features": [
          {
            "mainTitle": "주요 기능 영역 (예: 실시간 회의 관리, 회의 분석, 협업 도구 등)",
            "description": "이 기능 영역에 대한 전체적인 설명 (~요로 끝나도록)",
            "items": [
              {
                "title": "세부 기능 제목",
                "description": "세부 기능에 대한 상세 설명 (사용자 관점에서 설명, ~요로 끝나도록)",
                "keyPoints": [
                  "주요 특징 1",
                  "주요 특징 2",
                  "주요 특징 3"
                ]
              }
            ]
          }
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
        "prerequisites": [
          {
            "category": "기술 스택",
            "items": [
              {
                "name": "필수 기술",
                "description": "이 프로젝트를 시작하기 위해 반드시 알아야 할 기술과 개념을 설명해주세요. 각 기술별로 구체적인 학습 범위와 수준을 명시해주세요."
              },
              {
                "name": "권장 기술",
                "description": "프로젝트를 더 효과적으로 진행하기 위해 추가로 학습하면 좋을 기술과 개념을 설명해주세요."
              }
            ]
          },
          {
            "category": "개발 환경",
            "items": [
              {
                "name": "개발 도구",
                "description": "필요한 개발 도구와 설정 방법을 설명해주세요."
              },
              {
                "name": "환경 구성",
                "description": "로컬 개발 환경 구성에 필요한 단계와 주의사항을 설명해주세요."
              }
            ]
          },
          {
            "category": "도메인 지식",
            "items": [
              {
                "name": "필수 개념",
                "description": "프로젝트의 도메인에 대한 이해를 위해 필요한 핵심 개념과 용어를 설명해주세요."
              },
              {
                "name": "참고 자료",
                "description": "도메인 지식을 쌓기 위한 추천 학습 자료나 참고할 만한 사례를 설명해주세요."
              }
            ]
          }
        ],
        "challenges": [
          {
            "category": "기술적 도전",
            "items": [
              {
                "name": "주요 과제",
                "description": "프로젝트에서 마주칠 수 있는 기술적 난관과 그 해결 방향을 설명해주세요."
              },
              {
                "name": "성능 이슈",
                "description": "예상되는 성능 관련 문제점과 최적화 방안을 설명해주세요."
              }
            ]
          },
          {
            "category": "아키텍처",
            "items": [
              {
                "name": "설계 고려사항",
                "description": "시스템 설계 시 고려해야 할 주요 사항과 해결해야 할 아키텍처적 과제를 설명해주세요."
              },
              {
                "name": "확장성",
                "description": "시스템 확장 시 발생할 수 있는 문제점과 대응 방안을 설명해주세요."
              }
            ]
          },
          {
            "category": "사용자 경험",
            "items": [
              {
                "name": "UX/UI",
                "description": "사용자 경험 개선을 위해 해결해야 할 과제와 접근 방식을 설명해주세요."
              },
              {
                "name": "접근성",
                "description": "다양한 사용자를 위한 접근성 고려사항과 해결 방안을 설명해주세요."
              }
            ]
          }
        ],
        "tips": [
          {
            "category": "개발 전략",
            "items": [
              {
                "name": "시작하기",
                "description": "프로젝트를 효과적으로 시작하기 위한 단계별 접근 방법과 초기 설정 팁을 설명해주세요."
              },
              {
                "name": "코드 구조",
                "description": "유지보수와 확장이 용이한 코드 구조를 만들기 위한 모범 사례와 패턴을 설명해주세요."
              }
            ]
          },
          {
            "category": "개발 효율",
            "items": [
              {
                "name": "생산성",
                "description": "개발 생산성을 높이기 위한 도구 활용법과 워크플로우 최적화 방법을 설명해주세요."
              },
              {
                "name": "테스트",
                "description": "효과적인 테스트 전략과 자동화 방법을 설명해주세요."
              }
            ]
          },
          {
            "category": "문제 해결",
            "items": [
              {
                "name": "디버깅",
                "description": "자주 발생하는 문제 상황과 효과적인 디버깅 방법을 설명해주세요."
              },
              {
                "name": "리소스",
                "description": "문제 해결에 도움이 될 수 있는 유용한 리소스와 커뮤니티를 설명해주세요."
              }
            ]
          }
        ]
      }`;

  private static readonly TECH_STACK_GUIDELINES = `
      기술 스택 설명 작성 가이드:
      - 각 기술의 설명은 다음 형식을 참고해주세요:
        * React: "컴포넌트 기반 UI 개발이 가능해요.", "가상 DOM으로 성능이 좋아요.", "상태 관리가 편리해요."
        * TypeScript: "타입 안정성이 좋아요.", "자동완성이 편리해요.", "유지보수가 쉬워요."
        * Node.js: "자바스크립트로 서버 개발이 가능해요.", "비동기 처리가 효율적이에요.", "npm 생태계가 풍부해요."
        * Python: "배우기 쉬운 문법이에요.", "다양한 라이브러리가 있어요.", "데이터 분석에 강해요."
        * MongoDB: "문서 기반 NoSQL이에요.", "스키마가 유연해요.", "수평 확장이 쉬워요."
      
      - 설명은 반드시 ~요로 끝나도록 작성해주세요
      - 기술의 핵심 가치와 장점을 강조해주세요
      - 실제 프로젝트에서의 활용 방안을 포함해주세요
      - 너무 전문적이거나 어려운 용어는 피해주세요`;

  private static readonly FEATURE_GUIDELINES = `
      주요 기능 작성 가이드:
      - 각 기능 영역은 다음 구조로 작성해주세요:
        * mainTitle: 해당 기능 영역의 핵심을 나타내는 제목
        * description: 기능 영역에 대한 전체적인 설명
        * items: 세부 기능들의 목록
      
      - 기능 영역 예시:
        {
          "mainTitle": "실시간 회의 관리",
          "description": "회의를 효율적으로 관리하고 진행할 수 있는 다양한 기능을 제공해요.",
          "items": [
            {
              "title": "실시간 회의 요약",
              "description": "회의 내용을 실시간으로 요약해서 보여드려요. 회의가 끝나면 바로 요약본을 확인할 수 있어요.",
              "keyPoints": [
                "음성 인식으로 자동 요약",
                "주요 키워드 자동 추출",
                "회의 종료 후 즉시 요약본 제공"
              ]
            }
          ]
        }
      
      - 설명 작성 시 다음 사항을 고려해주세요:
        * mainTitle: 기능 영역의 핵심 가치를 간단명료하게 표현
        * description: 해당 기능 영역이 사용자에게 제공하는 전체적인 가치 설명
        * 세부 기능: 구체적인 사용 사례와 장점을 포함
      
      - 모든 설명은 반드시 ~요로 끝나도록 작성해주세요
      - 사용자 관점에서 기능의 가치를 설명해주세요
      - 기술적 특징보다는 사용자가 얻을 수 있는 이점을 강조해주세요`;

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
      
      ${this.TECH_STACK_GUIDELINES}
      
      ${this.FEATURE_GUIDELINES}
      
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
