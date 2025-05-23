import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { BasePromptContext, PromptError, PromptVersion } from "../types";

export abstract class BasePrompt<T extends BasePromptContext> {
  protected abstract readonly version: PromptVersion;
  protected abstract readonly type: "project" | "resource";

  constructor() {
    this.validateVersion();
  }

  protected abstract generateSystemPrompt(): string;
  protected abstract generateUserPrompt(context: T): string;

  generatePrompt(context: T): ChatCompletionMessageParam[] {
    try {
      const timestamp = Date.now();
      const promptContext = { ...context, timestamp, version: this.version };

      return [
        {
          role: "system",
          content: this.generateSystemPrompt(),
        },
        {
          role: "user",
          content: this.generateUserPrompt(promptContext),
        },
      ];
    } catch (error) {
      throw new PromptError(
        error instanceof Error ? error.message : "Failed to generate prompt",
        this.type,
        { context, error }
      );
    }
  }

  protected validateVersion(): void {
    if (!this.version.match(/^\d+\.\d+\.\d+$/)) {
      throw new PromptError(
        `Invalid prompt version format: ${this.version}`,
        this.type
      );
    }
  }

  protected validateContext(context: T): void {
    if (!context) {
      throw new PromptError("Prompt context is required", this.type);
    }
  }

  protected createBaseContext(): BasePromptContext {
    return {
      timestamp: Date.now(),
      version: this.version,
    };
  }
}
