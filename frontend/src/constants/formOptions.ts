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
  "Git",
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
  초급: "프로그래밍이 처음이에요.",
  중급: "기본기를 갖췄지만 더 배워볼래요.",
  고급: "전문적인 시스템을 만들어 볼래요.",
} as const;

// 난이도별 추천 기술 스택 정의
export const RECOMMENDED_TECHS = {
  초급: [
    "HTML/CSS",
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "MySQL",
    "Git",
  ] as const,
  중급: [
    "TypeScript",
    "React",
    "Vue",
    "Next.js",
    "Node.js",
    "Spring",
    "Django",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "AWS",
    "Redux",
    "Tailwind CSS",
    "Git",
  ] as const,
  고급: TECH_OPTIONS,
} as const;
