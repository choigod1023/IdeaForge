import { z } from "zod";

const ProjectDescriptionSchema = z.object({
  summary: z.string(),
  keyPoints: z.array(z.string()),
  details: z.string(),
});

// Project type validation schema
export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: ProjectDescriptionSchema,
  techStack: z.array(z.string()),
  difficulty: z.enum(["초급", "중급", "고급"]),
  estimatedTime: z.string(),
  features: z.array(z.string()),
  learningOutcomes: z.array(z.string()),
  resources: z.array(z.string()),
  theme: z.enum([
    "생산성",
    "엔터테인먼트",
    "교육",
    "소셜",
    "유틸리티",
    "게임",
    "금융",
    "건강",
    "기타",
  ]),
  prerequisites: z.array(z.string()),
  challenges: z.array(z.string()),
  tips: z.array(z.string()),
  category: z.enum([
    "웹 개발",
    "모바일 앱",
    "데스크톱 앱",
    "게임",
    "AI/ML",
    "데이터 분석",
    "보안",
    "임베디드",
    "기타",
  ]),
});

// GPT prompt request validation schema
export const PromptRequestSchema = z.object({
  difficulty: z.enum(["초급", "중급", "고급"]),
  preferredTech: z.array(z.string()),
  theme: z
    .enum([
      "생산성",
      "엔터테인먼트",
      "교육",
      "소셜",
      "유틸리티",
      "게임",
      "금융",
      "건강",
      "기타",
    ])
    .optional(),
  description: z.string().optional(),
  hasPrerequisites: z.boolean(),
  hasChallenges: z.boolean(),
  hasTips: z.boolean(),
});

// Type definitions inferred from Zod schemas
export type Project = z.infer<typeof ProjectSchema>;
export type PromptRequest = z.infer<typeof PromptRequestSchema>;

// Enum types for use in other parts of the application
export type Difficulty = z.infer<typeof ProjectSchema>["difficulty"];
export type ProjectTheme = z.infer<typeof ProjectSchema>["theme"];
export type ProjectCategory = z.infer<typeof ProjectSchema>["category"];

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
