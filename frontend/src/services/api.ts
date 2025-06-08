import type { Project, ProjectRequest } from "../types";
import { useProjectStore } from "../stores/projectStore";
import ky from "ky";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, ""); // Remove trailing slash if exists

const apiClient = ky.create({
  prefixUrl: API_URL,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const api = {
  /**
   * Generates a project recommendation based on user preferences
   * @param request User preferences and requirements
   * @returns Generated project recommendation
   */
  async generateRecommendation(
    request: ProjectRequest
  ): Promise<{ jobId: string }> {
    const projectList = useProjectStore.getState().projectList;

    try {
      const responseData = await apiClient
        .post("api/projects/recommend", {
          json: {
            ...request,
            existingProjects: projectList,
          },
        })
        .json<{ jobId: string }>();

      if (!responseData.jobId) {
        throw new Error("Job ID를 받지 못했습니다");
      }

      return { jobId: responseData.jobId };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("프로젝트 추천 생성 중 오류가 발생했습니다");
    }
  },

  /**
   * Creates a new project
   * @param request Project creation request
   * @returns Created project
   */
  async createProject(request: ProjectRequest): Promise<Project> {
    const projectList = useProjectStore.getState().projectList;

    try {
      return await apiClient
        .post("api/projects", {
          json: {
            ...request,
            existingProjects: projectList,
          },
        })
        .json<Project>();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("프로젝트 생성에 실패했습니다");
    }
  },

  /**
   * Fetches all projects
   * @returns List of projects
   */
  async getProjects(): Promise<Project[]> {
    const projectList = useProjectStore.getState().projectList;
    return projectList;
  },

  /**
   * Deletes a project
   * @param projectId ID of the project to delete
   */
  async deleteProject(projectId: string): Promise<void> {
    try {
      await apiClient.delete(`api/projects/${projectId}`);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("프로젝트 삭제에 실패했습니다");
    }
  },

  /**
   * Exports a project as markdown
   * @param projectId ID of the project to export
   * @returns Blob containing the markdown file
   */
  async exportProject(projectId: string): Promise<Blob> {
    try {
      return await apiClient.get(`api/projects/${projectId}/export`).blob();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("프로젝트 내보내기에 실패했습니다");
    }
  },

  async checkRecommendationStatus(jobId: string): Promise<{
    status: "processing" | "completed" | "failed";
    result?: Project;
    error?: string;
  }> {
    try {
      const responseData = await apiClient
        .get(`api/projects/recommend/${jobId}`)
        .json<{
          status: "processing" | "completed" | "failed";
          result?: Project;
          error?: string;
        }>();

      if (!responseData.status) {
        throw new Error("상태 정보를 받지 못했습니다");
      }

      return responseData;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("상태 확인 중 오류가 발생했습니다");
    }
  },

  /**
   * Fetches a single project by ID
   * @param projectId ID of the project to fetch
   * @returns Project data
   */
  async getProject(projectId: string): Promise<Project> {
    try {
      return await apiClient.get(`api/projects/${projectId}`).json<Project>();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("프로젝트를 불러오는데 실패했습니다");
    }
  },
};
