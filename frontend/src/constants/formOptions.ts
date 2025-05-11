// 프론트엔드
const FRONTEND_TECHS = [
  "React",
  "Vue",
  "Angular",
  "TypeScript",
  "JavaScript",
  "HTML/CSS",
  "Tailwind CSS",
  "Redux",
  "Next.js",
  "Nuxt.js",
] as const;

// 백엔드
const BACKEND_TECHS = [
  "Node.js",
  "Java",
  "Spring",
  "Python",
  "Django",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Redis",
] as const;

// 모바일
const MOBILE_TECHS = [
  "React Native",
  "Flutter",
  "Swift",
  "Kotlin",
  "Dart",
  "Firebase",
] as const;

// AI/ML/데이터
const AI_ML_TECHS = [
  "TensorFlow",
  "PyTorch",
  "Pandas",
  "Scikit-learn",
  "OpenCV",
  "Jupyter",
] as const;

// 게임 개발
const GAME_TECHS = [
  "Unity",
  "Unreal Engine",
  "C#",
  "C++",
  "Blueprints",
  "Photon",
] as const;

// 임베디드/IoT
const EMBEDDED_TECHS = [
  "Arduino",
  "Raspberry Pi",
  "C",
  "C++",
  "MQTT",
  "RTOS",
] as const;

// DevOps/클라우드
const DEVOPS_TECHS = [
  "AWS",
  "Docker",
  "Kubernetes",
  "Terraform",
  "Jenkins",
  "GitLab CI",
] as const;

// 보안
const SECURITY_TECHS = [
  "Wireshark",
  "Metasploit",
  "Burp Suite",
  "OpenSSL",
  "Cryptography",
  "JWT",
] as const;

// 모든 기술 스택을 하나의 배열로 통합
export const TECH_OPTIONS = [
  ...FRONTEND_TECHS,
  ...BACKEND_TECHS,
  ...MOBILE_TECHS,
  ...AI_ML_TECHS,
  ...GAME_TECHS,
  ...EMBEDDED_TECHS,
  ...DEVOPS_TECHS,
  ...SECURITY_TECHS,
] as const;

export const INTEREST_OPTIONS = [
  "프론트엔드 개발",
  "백엔드 개발",
  "모바일 앱 개발",
  "게임 개발",
  "AI/ML",
  "데이터 분석",
  "보안",
  "클라우드",
  "DevOps",
  "UI/UX 디자인",
  "임베디드/IoT",
] as const;

export const CATEGORY_OPTIONS = [
  "웹 개발",
  "모바일 앱",
  "데스크톱 앱",
  "게임",
  "AI/ML",
  "데이터 분석",
  "보안",
  "임베디드",
  "기타",
] as const;

export const THEME_OPTIONS = [
  "생산성",
  "엔터테인먼트",
  "교육",
  "소셜",
  "유틸리티",
  "게임",
  "금융",
  "건강",
  "기타",
] as const;

export const DIFFICULTY_DESCRIPTIONS = {
  초급: "프로그래밍의 기본 개념을 이해하고, 간단한 프로젝트를 완성할 수 있는 수준입니다.",
  중급: "여러 프로젝트를 경험했고, 주요 프레임워크나 라이브러리를 활용할 수 있는 수준입니다.",
  고급: "복잡한 시스템을 설계하고 구현할 수 있으며, 다양한 기술 스택에 능숙한 수준입니다.",
} as const;
