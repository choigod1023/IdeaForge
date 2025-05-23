import { Request, Response } from "express";
import { openAIService } from "../services/openai";
import type { PromptRequest, Project } from "../types";

class ProjectController {
  /**
   * Generates a project recommendation based on user preferences
   * @param req Express request object
   * @param res Express response object
   */
  async generateRecommendation(req: Request, res: Response) {
    try {
      const { existingProjects, ...requestData } = req.body;
      const project = await openAIService.generateProjectRecommendation(
        requestData as PromptRequest,
        existingProjects as Project[]
      );
      res.json(project);
    } catch (error) {
      console.error("Error generating project recommendation:", error);
      res.status(500).json({
        message:
          error instanceof Error
            ? error.message
            : "프로젝트 추천 생성에 실패했습니다",
      });
    }
  }

  async createProject(req: Request, res: Response) {
    try {
      const { existingProjects, ...projectData } = req.body;
      const project = await openAIService.generateProjectRecommendation(
        projectData as PromptRequest,
        existingProjects as Project[]
      );
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({
        message:
          error instanceof Error
            ? error.message
            : "프로젝트 생성에 실패했습니다",
      });
    }
  }
}

export const projectController = new ProjectController();
export const { createProject } = projectController;
