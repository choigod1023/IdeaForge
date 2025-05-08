export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type ProjectCategory =
  | "웹 개발"
  | "모바일 앱"
  | "데스크톱 앱"
  | "게임"
  | "AI/ML"
  | "데이터 분석"
  | "보안"
  | "임베디드"
  | "기타";

export type ProjectTheme =
  | "생산성"
  | "엔터테인먼트"
  | "교육"
  | "소셜"
  | "유틸리티"
  | "게임"
  | "금융"
  | "건강"
  | "기타";

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  difficulty: Difficulty;
  estimatedTime: string;
  features: string[];
  learningOutcomes: string[];
  resources: string[];
  category: ProjectCategory;
  theme: ProjectTheme;
  prerequisites: string[];
  challenges: string[];
  tips: string[];
}

export interface ProjectRequest {
  difficulty: Difficulty;
  preferredTech: string[];
  timeAvailable: string;
  interests: string[];
  category?: ProjectCategory;
  theme?: ProjectTheme;
  description?: string;
  hasPrerequisites: boolean;
  hasChallenges: boolean;
  hasTips: boolean;
}
