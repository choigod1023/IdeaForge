export type Difficulty = "초급" | "중급" | "고급";

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
  features: string[];
  difficulty: Difficulty;
  category?: string;
  theme?: string;
  learningPoints: string[];
  recommendationReason: string;
  gettingStarted: string;
  references: string[];
  createdAt: string;
  prerequisites?: string[];
  challenges?: string[];
  tips?: string[];
  resources?: string[];
  estimatedTime?: string;
}

export interface ProjectRequest {
  difficulty: Difficulty;
  preferredTech: string[];
  interests: string[];
  category?: ProjectCategory;
  theme?: ProjectTheme;
  description?: string;
  hasPrerequisites: boolean;
  hasChallenges: boolean;
  hasTips: boolean;
  additionalInfo?: string;
}
