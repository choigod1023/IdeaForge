import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import {
  Project,
  PromptRequest,
  ResourcePromptContext,
  PROMPT_VERSIONS,
} from "../types";
import { BasePrompt } from "./basePrompt";

export class ResourcePrompt extends BasePrompt<ResourcePromptContext> {
  protected readonly version = PROMPT_VERSIONS.RESOURCE;
  protected readonly type = "resource" as const;

  constructor() {
    super();
  }

  protected generateSystemPrompt(): string {
    return `You are an expert programming mentor who provides detailed, practical learning resources for software development projects.
Your task is to search for and recommend high-quality learning resources that will help the user implement their project effectively.
Focus on providing resources that are:
- Highly relevant to the project's tech stack and features
- Suitable for the user's difficulty level
- Include practical code examples and real-world applications
- Cover both theoretical concepts and hands-on implementation
- Are from reputable sources (official docs, well-known tutorials, etc.)

Format your response as a JSON object with a 'resources' array. Each resource should include:
- category: "tech" or "feature"
- title: A concise, descriptive title
- url: A direct link to the resource
- description: A brief summary of what the resource covers
- learningPoints: Key concepts or skills to learn
- codeExamples: Specific code snippets or examples to implement
- practicalExamples: Real-world use cases or applications
- relevance: An object with:
  - score: A number from 0-100 indicating relevance
  - reason: Why this resource is particularly relevant
  - keyPoints: Specific aspects that make it valuable for this project

Ensure all resources are directly applicable to implementing the project's features and tech stack.`;
  }

  protected generateUserPrompt(context: ResourcePromptContext): string {
    this.validateContext(context);
    const { project, request } = context;

    return `Please search for learning resources for the following project:

Project Title: ${project.title}
Difficulty: ${project.difficulty}
Tech Stack: ${project.techStack.join(", ")}
Features: ${project.features.join(", ")}
Theme: ${project.theme}

User's Preferred Technologies: ${request.preferredTech.join(", ")}
Additional Context: ${request.description || "None provided"}

Prompt Version: ${context.version}
Generated at: ${new Date(context.timestamp).toISOString()}

Please provide a JSON response with an array of detailed, practical learning resources that will help implement this project effectively.`;
  }

  createContext(
    project: Project,
    request: PromptRequest
  ): ResourcePromptContext {
    return {
      ...this.createBaseContext(),
      project,
      request,
    };
  }
}
