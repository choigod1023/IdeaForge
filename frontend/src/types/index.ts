// ===== 기본 타입 정의 =====
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

// ===== 공통 인터페이스 =====
export interface BaseItem {
  name: string;
  description: string;
}

export interface BaseCategory {
  category: string;
  items: BaseItem[];
}

// ===== 프로젝트 관련 타입 =====
export type PrerequisiteItem = BaseItem;
export type PrerequisiteCategory = BaseCategory;

export type ChallengeItem = BaseItem;
export type ChallengeCategory = BaseCategory;

export type TipItem = BaseItem;
export type TipCategory = BaseCategory;

export interface TechStackItem {
  name: string;
  descriptions: string[];
}

// ===== 리소스 관련 타입 =====
export interface Relevance {
  score: number;
  reason: string;
  keyPoints: string[];
}

export interface Resource {
  category: string;
  title: string;
  url: string;
  description: string;
  relevance: Relevance;
  learningOutcomes: string[];
  implementationTips: string[];
}

export interface ProjectResource {
  category: "tech" | "feature";
  title: string;
  url: string;
  description: string;
  learningPoints: string[];
  codeExamples: string[];
  practicalExamples: string[];
  relevance: Relevance;
}

// ===== 프로젝트 메인 타입 =====
export interface Project {
  id: string;
  title: string;
  description: {
    summary: string;
    keyPoints: string[];
  };
  difficulty: Difficulty;
  category?: ProjectCategory;
  theme?: ProjectTheme;
  projectType: string[];
  features: string[];
  resources: ProjectResource[];
  prerequisites: PrerequisiteCategory[];
  challenges: ChallengeCategory[];
  tips: TipCategory[];
  techStack: TechStackItem[];
  createdAt: string;
  updatedAt: string;
  learningPoints?: string[];
  recommendationReason?: string;
  gettingStarted?: string;
  references?: string[];
}

// ===== 요청 타입 =====
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

// ===== 유틸리티 타입 =====
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

// ===== 타입 가드 =====
export function isValidDifficulty(
  difficulty: string
): difficulty is Difficulty {
  return ["초급", "중급", "고급"].includes(difficulty);
}

export function isValidProjectCategory(
  category: string
): category is ProjectCategory {
  return [
    "웹 개발",
    "모바일 앱",
    "데스크톱 앱",
    "게임",
    "AI/ML",
    "데이터 분석",
    "보안",
    "임베디드",
    "기타",
  ].includes(category);
}

export function isValidProjectTheme(theme: string): theme is ProjectTheme {
  return [
    "생산성",
    "엔터테인먼트",
    "교육",
    "소셜",
    "유틸리티",
    "게임",
    "금융",
    "건강",
    "기타",
  ].includes(theme);
}

export function isProject(obj: unknown): obj is Project {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "id" in obj &&
    "title" in obj &&
    "description" in obj &&
    "difficulty" in obj
  );
}

// ===== 기존 타입 재export =====
export type { ProjectSection } from "./project";
