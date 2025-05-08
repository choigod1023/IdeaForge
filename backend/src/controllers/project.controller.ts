import { Request, Response } from "express";
import { openAIService } from "../services/openai";
import { PromptRequestSchema } from "../types";

export class ProjectController {
  /**
   * Generates a project recommendation based on user preferences
   * @param req Express request object
   * @param res Express response object
   */
  async generateRecommendation(req: Request, res: Response) {
    try {
      // Validate request body
      const promptRequest = PromptRequestSchema.parse(req.body);

      // Generate project recommendation
      const project = await openAIService.generateProjectRecommendation(
        promptRequest
      );

      res.json(project);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }
}

export const projectController = new ProjectController();
