import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  category: string;
  relevance: {
    score: number;
    reason: string;
    keyPoints: string[];
  };
}

interface TechStackItem {
  name: string;
  descriptions: string[];
}

export type Project = {
  id: string;
  title: string;
  description: {
    summary: string;
    keyPoints: string[];
  };
  techStack: TechStackItem[];
  difficulty: "beginner" | "intermediate" | "advanced";
  projectType: ("toy" | "portfolio" | "opensource" | "practical")[];
  features: string[];
  learningOutcomes: string[];
  resources: ProjectResource[];
  theme: string;
  prerequisites: string[];
  challenges: string[];
  tips: string[];
};

export type ProjectResource = {
  category: "tech" | "feature";
  title: string;
  url: string;
  description: string;
  learningPoints: string[];
  codeExamples: string[];
  practicalExamples: string[];
  relevance: {
    score: number;
    reason: string;
    keyPoints: string[];
  };
};

export const PROMPT_VERSIONS = {
  PROJECT: "1.0.0",
  RESOURCE: "1.0.0",
} as const;

export type PromptVersion =
  (typeof PROMPT_VERSIONS)[keyof typeof PROMPT_VERSIONS];

export type BasePromptContext = {
  timestamp: number;
  version: PromptVersion;
};

export type PromptRequest = {
  difficulty: "beginner" | "intermediate" | "advanced";
  preferredTech: string[];
  theme?: string;
  description?: string;
};

export type ProjectPromptContext = BasePromptContext & PromptRequest;

export type ResourcePromptContext = BasePromptContext & {
  project: Project;
  request: PromptRequest;
};

export type OpenAIConfig = {
  apiKey: string;
};

export type PerplexityConfig = {
  apiKey: string;
  baseURL: string;
};

export class APIError extends Error {
  constructor(
    message: string,
    public readonly provider: "openai" | "perplexity",
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = "APIError";
  }

  static fromError(
    error: unknown,
    provider: "openai" | "perplexity"
  ): APIError {
    if (error instanceof APIError) {
      return error;
    }

    const message =
      error instanceof Error
        ? error.message
        : "An unknown error occurred while calling the API";

    return new APIError(message, provider, error);
  }
}

export class PromptError extends Error {
  constructor(
    message: string,
    public readonly type: "project" | "resource",
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = "PromptError";
  }
}
