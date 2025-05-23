import { z } from "zod";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

// API 서비스 타입
export interface PerplexityConfig {
  apiKey: string;
  baseURL: string;
  model: string;
}

export interface OpenAIConfig {
  apiKey: string;
  model: string;
}

// 에러 타입
export class APIError extends Error {
  constructor(
    message: string,
    public readonly service: "openai" | "perplexity",
    public readonly code?: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = "APIError";
  }

  static fromError(error: unknown, service: "openai" | "perplexity"): APIError {
    if (error instanceof APIError) {
      return error;
    }
    return new APIError(
      error instanceof Error ? error.message : "Unknown error occurred",
      service,
      error instanceof Error ? error.name : undefined,
      error
    );
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public readonly field?: string,
    public readonly value?: unknown
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

export class PromptError extends Error {
  constructor(
    message: string,
    public readonly promptType: "project" | "resource",
    public readonly context?: Record<string, unknown>
  ) {
    super(message);
    this.name = "PromptError";
  }
}

// 프롬프트 관련 타입
export interface BasePromptContext {
  timestamp: number;
  version: string;
}

export interface ProjectPromptContext extends BasePromptContext {
  difficulty: "beginner" | "intermediate" | "advanced";
  preferredTech: string[];
  theme?: string;
  description?: string;
}

export interface ResourcePromptContext extends BasePromptContext {
  project: Project;
  request: PromptRequest;
}

// 프롬프트 버전 관리
export const PROMPT_VERSIONS = {
  PROJECT: "1.0.0",
  RESOURCE: "1.0.0",
} as const;

// Zod 스키마 정의
const ResourceSchema = z.object({
  category: z.enum(["tech", "feature"]),
  title: z.string().max(30),
  url: z.string().url(),
  description: z.string().max(100),
  learningPoints: z.array(z.string()),
  codeExamples: z.array(z.string()),
  practicalExamples: z.array(z.string()),
  relevance: z.object({
    score: z.number().min(0).max(100),
    reason: z.string(),
    keyPoints: z.array(z.string()),
  }),
});

const ProjectDescriptionSchema = z.object({
  summary: z.string().max(18),
  keyPoints: z.array(z.string().max(15)),
});

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string().max(10),
  description: ProjectDescriptionSchema,
  techStack: z.array(z.string()),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  projectType: z.array(z.enum(["toy", "portfolio", "opensource", "practical"])),
  features: z.array(z.string().max(20)),
  learningOutcomes: z.array(z.string().max(20)),
  resources: z.array(ResourceSchema),
  theme: z.string(),
  prerequisites: z.array(z.string().max(15)),
  challenges: z.array(z.string().max(15)),
  tips: z.array(z.string().max(20)),
});

export const PromptRequestSchema = z.object({
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  preferredTech: z.array(z.string()),
  theme: z.string().optional(),
  description: z.string().optional(),
});

// Type definitions inferred from Zod schemas
export type Project = z.infer<typeof ProjectSchema>;
export type PromptRequest = z.infer<typeof PromptRequestSchema>;
export type ProjectResource = z.infer<typeof ResourceSchema>;

// Enum types for use in other parts of the application
export type Difficulty = Project["difficulty"];
export type ProjectType = Project["projectType"][number];
export type ResourceCategory = ProjectResource["category"];

// API 응답 타입
export interface PerplexityResponse {
  resources: ProjectResource[];
}

export interface OpenAIResponse {
  project: Project;
}

export interface ProjectRequest {
  difficulty: Difficulty;
  preferredTech: string[];
  interests: string[];
  category?: ResourceCategory;
  theme?: Project["theme"];
  description?: string;
  hasPrerequisites: boolean;
  hasChallenges: boolean;
  hasTips: boolean;
  additionalInfo?: string;
}
