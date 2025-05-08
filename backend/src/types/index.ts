import { z } from "zod";

// Project type validation schema
export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  techStack: z.array(z.string()),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  estimatedTime: z.string(),
  features: z.array(z.string()),
  learningOutcomes: z.array(z.string()),
  resources: z.array(z.string()),
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
});

// GPT prompt request validation schema
export const PromptRequestSchema = z.object({
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  preferredTech: z.array(z.string()),
  timeAvailable: z.string(),
  interests: z.array(z.string()),
  category: z
    .enum([
      "웹 개발",
      "모바일 앱",
      "데스크톱 앱",
      "게임",
      "AI/ML",
      "데이터 분석",
      "보안",
      "임베디드",
      "기타",
    ])
    .optional(),
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
export type ProjectCategory = z.infer<typeof ProjectSchema>["category"];
export type ProjectTheme = z.infer<typeof ProjectSchema>["theme"];
