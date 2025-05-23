import { ProjectPromptContext, PROMPT_VERSIONS, PromptRequest } from "../types";
import { BasePrompt } from "./basePrompt";

export class ProjectPrompt extends BasePrompt<ProjectPromptContext> {
  protected readonly version = PROMPT_VERSIONS.PROJECT;
  protected readonly type = "project" as const;

  constructor() {
    super();
  }

  protected generateSystemPrompt(): string {
    return `You are an expert software development mentor who creates detailed, practical project recommendations.
Your task is to generate a comprehensive project specification that will help users learn and practice software development effectively.

Focus on creating projects that are:
- Appropriate for the user's difficulty level
- Utilize their preferred technologies
- Include clear learning objectives
- Have practical, real-world applications
- Are challenging but achievable

Format your response as a JSON object with a 'project' object containing:
- id: A unique identifier
- title: A concise, descriptive title
- description: An object with:
  - summary: A brief overview
  - keyPoints: Main learning objectives
- techStack: Array of technologies to use
- difficulty: "beginner", "intermediate", or "advanced"
- projectType: Array of project types ("toy", "portfolio", "opensource", "practical")
- features: Array of key features to implement
- learningOutcomes: Array of specific skills to learn
- theme: The project's theme or domain
- prerequisites: Array of required knowledge/skills
- challenges: Array of potential challenges
- tips: Array of helpful implementation tips

Ensure the project is well-structured, educational, and achievable within a reasonable timeframe.`;
  }

  protected generateUserPrompt(context: ProjectPromptContext): string {
    this.validateContext(context);

    return `Please generate a project recommendation with the following requirements:

Difficulty Level: ${context.difficulty}
Preferred Technologies: ${context.preferredTech.join(", ")}
Theme: ${context.theme || "Not specified"}
Additional Context: ${context.description || "None provided"}

Prompt Version: ${context.version}
Generated at: ${new Date(context.timestamp).toISOString()}

Please provide a JSON response with a detailed project specification that will help me learn and practice software development effectively.`;
  }

  createContext(request: PromptRequest): ProjectPromptContext {
    return {
      ...this.createBaseContext(),
      ...request,
    };
  }
}
