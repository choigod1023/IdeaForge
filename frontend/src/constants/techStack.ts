export interface PopularTechStack {
  category: string;
  techs: string[];
  description: string;
}

export interface TechStackCategory {
  name: string;
  stacks: PopularTechStack[];
}

export const TECH_STACK_CATEGORIES: TechStackCategory[] = [
  {
    name: "웹 개발",
    stacks: [
      {
        category: "React + Node.js 풀스택",
        techs: ["React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
        description: "React와 Node.js를 활용한 현대적인 풀스택 웹 애플리케이션",
      },
      {
        category: "Next.js 풀스택",
        techs: [
          "Next.js",
          "TypeScript",
          "PostgreSQL",
          "Docker",
          "Tailwind CSS",
        ],
        description:
          "Next.js의 서버 컴포넌트와 API 라우트를 활용한 풀스택 개발",
      },
      {
        category: "Vue + Spring 풀스택",
        techs: ["Vue", "TypeScript", "Java", "Spring", "MySQL"],
        description: "Vue.js와 Spring Boot로 구현하는 엔터프라이즈급 웹 서비스",
      },
      {
        category: "Python 백엔드",
        techs: ["Python", "FastAPI", "PostgreSQL", "Docker", "Redis"],
        description: "Python과 FastAPI로 구현하는 고성능 백엔드 서비스",
      },
    ],
  },
  {
    name: "모바일 앱",
    stacks: [
      {
        category: "React Native 크로스 플랫폼",
        techs: [
          "React Native",
          "TypeScript",
          "Firebase",
          "Redux",
          "Tailwind CSS",
        ],
        description: "React Native로 개발하는 크로스 플랫폼 모바일 앱",
      },
      {
        category: "Flutter 크로스 플랫폼",
        techs: ["Flutter", "Dart", "Firebase", "GetX", "REST API"],
        description: "Flutter로 구현하는 네이티브 수준의 모바일 앱",
      },
      {
        category: "iOS 네이티브",
        techs: ["Swift", "SwiftUI", "Core Data", "Combine", "Alamofire"],
        description: "Swift와 SwiftUI로 개발하는 네이티브 iOS 앱",
      },
    ],
  },
  {
    name: "AI/ML/데이터",
    stacks: [
      {
        category: "AI 웹 서비스",
        techs: ["Python", "FastAPI", "TensorFlow", "PostgreSQL", "Docker"],
        description: "AI 모델을 웹 서비스로 제공하는 풀스택 애플리케이션",
      },
      {
        category: "데이터 분석 대시보드",
        techs: ["Python", "Pandas", "Streamlit", "Plotly", "PostgreSQL"],
        description: "데이터 분석과 시각화를 위한 대시보드 개발",
      },
      {
        category: "컴퓨터 비전 서비스",
        techs: ["Python", "OpenCV", "PyTorch", "FastAPI", "Docker"],
        description: "컴퓨터 비전 기술을 활용한 이미지 처리 서비스",
      },
    ],
  },
  {
    name: "게임 개발",
    stacks: [
      {
        category: "Unity 멀티플레이어",
        techs: ["Unity", "C#", "Photon", "PlayFab", "Docker"],
        description: "Unity로 개발하는 멀티플레이어 게임",
      },
      {
        category: "Unreal 엔진 게임",
        techs: ["Unreal Engine", "C++", "Blueprints", "Steam SDK", "AWS"],
        description: "Unreal Engine으로 개발하는 고품질 게임",
      },
      {
        category: "모바일 게임",
        techs: ["Unity", "C#", "GameSparks", "AdMob", "Firebase"],
        description: "모바일 플랫폼에 최적화된 게임 개발",
      },
    ],
  },
  {
    name: "임베디드/IoT",
    stacks: [
      {
        category: "IoT 프로젝트",
        techs: ["Arduino", "Raspberry Pi", "MQTT", "Node-RED"],
        description: "IoT 디바이스와 센서를 활용한 프로젝트",
      },
      {
        category: "임베디드 시스템",
        techs: ["C", "C++", "RTOS", "Eclipse"],
        description: "임베디드 시스템 개발을 위한 기본 스택",
      },
    ],
  },
  {
    name: "DevOps/클라우드",
    stacks: [
      {
        category: "클라우드 네이티브",
        techs: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
        description: "클라우드 네이티브 애플리케이션 개발과 운영",
      },
      {
        category: "CI/CD 파이프라인",
        techs: ["Jenkins", "GitLab CI", "Docker", "Kubernetes", "Prometheus"],
        description: "자동화된 배포와 모니터링 시스템 구축",
      },
      {
        category: "서버리스 아키텍처",
        techs: ["AWS Lambda", "API Gateway", "DynamoDB", "S3", "CloudFront"],
        description: "서버리스 아키텍처를 활용한 확장 가능한 서비스",
      },
    ],
  },
  {
    name: "보안",
    stacks: [
      {
        category: "보안 분석 도구",
        techs: ["Python", "Wireshark", "Metasploit", "Burp Suite", "Docker"],
        description: "네트워크 보안 분석과 취약점 테스트 도구 개발",
      },
      {
        category: "암호화 서비스",
        techs: ["Python", "OpenSSL", "FastAPI", "PostgreSQL", "Docker"],
        description: "암호화와 보안 프로토콜을 구현한 서비스",
      },
    ],
  },
];

// 배너용 인기 기술 스택 (4개로 제한)
export const POPULAR_TECH_STACKS: PopularTechStack[] = [
  {
    category: "React + Node.js 풀스택",
    techs: ["React", "TypeScript", "Node.js", "MongoDB"],
    description: "React와 Node.js를 활용한 현대적인 풀스택 웹 애플리케이션",
  },
  {
    category: "Next.js 풀스택",
    techs: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
    description: "Next.js의 서버 컴포넌트와 API 라우트를 활용한 풀스택 개발",
  },
  {
    category: "Vue + Spring 풀스택",
    techs: ["Vue", "TypeScript", "Java", "Spring"],
    description: "Vue.js와 Spring Boot로 구현하는 엔터프라이즈급 웹 서비스",
  },
  {
    category: "Python 백엔드",
    techs: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    description: "Python과 FastAPI로 구현하는 고성능 백엔드 서비스",
  },
];
