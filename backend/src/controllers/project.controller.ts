import { Request, Response } from "express";
import { openAIService } from "../services/openai";
import type { ProjectRequest } from "../types";

class ProjectController {
  /**
   * Generates a project recommendation based on user preferences
   * @param req Express request object
   * @param res Express response object
   */
  async generateRecommendation(req: Request, res: Response) {
    try {
      const project = await openAIService.generateProjectRecommendation(
        req.body
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
      const projectData: ProjectRequest = req.body;

      // OpenAI 서비스를 통해 프로젝트 생성
      const project = await openAIService.generateProjectRecommendation(
        projectData
      );

      // 생성된 프로젝트 반환
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
