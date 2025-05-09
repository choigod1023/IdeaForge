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
        category: "React 기반 웹",
        techs: ["React", "TypeScript", "Node.js", "MongoDB"],
        description:
          "React와 TypeScript를 활용한 현대적인 웹 애플리케이션 개발",
      },
      {
        category: "Vue 기반 웹",
        techs: ["Vue", "TypeScript", "Node.js", "PostgreSQL"],
        description: "Vue.js와 TypeScript로 구현하는 안정적인 웹 서비스",
      },
      {
        category: "Angular 기반 웹",
        techs: ["Angular", "TypeScript", "Java", "Spring"],
        description:
          "Angular와 Spring으로 구축하는 엔터프라이즈급 웹 애플리케이션",
      },
    ],
  },
  {
    name: "모바일 앱",
    stacks: [
      {
        category: "React Native 앱",
        techs: ["React Native", "TypeScript", "Firebase", "Redux"],
        description: "React Native로 개발하는 크로스 플랫폼 모바일 앱",
      },
      {
        category: "Flutter 앱",
        techs: ["Flutter", "Dart", "Firebase", "GetX"],
        description: "Flutter로 구현하는 네이티브 수준의 모바일 앱",
      },
      {
        category: "iOS 네이티브",
        techs: ["Swift", "SwiftUI", "Core Data", "Combine"],
        description: "Swift와 SwiftUI로 개발하는 네이티브 iOS 앱",
      },
      {
        category: "Android 네이티브",
        techs: ["Kotlin", "Jetpack Compose", "Room", "Coroutines"],
        description: "Kotlin과 Jetpack Compose로 개발하는 네이티브 Android 앱",
      },
    ],
  },
  {
    name: "AI/ML/데이터",
    stacks: [
      {
        category: "AI/ML 프로젝트",
        techs: ["Python", "TensorFlow", "FastAPI", "PostgreSQL"],
        description: "Python 기반의 AI/ML 프로젝트와 웹 서비스 통합",
      },
      {
        category: "데이터 분석",
        techs: ["Python", "Pandas", "Jupyter", "Scikit-learn"],
        description: "데이터 분석과 머신러닝을 위한 기본 스택",
      },
      {
        category: "컴퓨터 비전",
        techs: ["Python", "OpenCV", "PyTorch", "ONNX"],
        description: "컴퓨터 비전과 이미지 처리 프로젝트",
      },
    ],
  },
  {
    name: "게임 개발",
    stacks: [
      {
        category: "Unity 게임",
        techs: ["Unity", "C#", "Photon", "PlayFab"],
        description: "Unity로 개발하는 멀티플레이어 게임",
      },
      {
        category: "Unreal 게임",
        techs: ["Unreal Engine", "C++", "Blueprints", "Steam SDK"],
        description: "Unreal Engine으로 개발하는 고품질 게임",
      },
      {
        category: "모바일 게임",
        techs: ["Unity", "C#", "GameSparks", "AdMob"],
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
        techs: ["AWS", "Docker", "Kubernetes", "Terraform"],
        description: "클라우드 네이티브 애플리케이션 개발과 운영",
      },
      {
        category: "CI/CD 파이프라인",
        techs: ["Jenkins", "GitLab CI", "Ansible", "Prometheus"],
        description: "자동화된 배포와 모니터링 시스템 구축",
      },
    ],
  },
  {
    name: "보안",
    stacks: [
      {
        category: "보안 분석",
        techs: ["Python", "Wireshark", "Metasploit", "Burp Suite"],
        description: "네트워크 보안 분석과 취약점 테스트",
      },
      {
        category: "암호화",
        techs: ["OpenSSL", "Python", "Cryptography", "JWT"],
        description: "암호화와 보안 프로토콜 구현",
      },
    ],
  },
];

// 배너용 인기 기술 스택 (기존 POPULAR_TECH_STACKS를 대체)
export const POPULAR_TECH_STACKS: PopularTechStack[] =
  TECH_STACK_CATEGORIES.flatMap((category) => category.stacks);
