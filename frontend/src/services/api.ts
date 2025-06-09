import type {
  GenerateRecommendationRequest,
  GenerateRecommendationResponse,
  CreateProjectRequest,
  CreateProjectResponse,
  GetProjectsResponse,
  GetProjectResponse,
  DeleteProjectResponse,
  ExportProjectResponse,
  JobStatusResponse,
  ApiClient,
} from "../types/api";
import { useProjectStore } from "../stores/projectStore";
import { isApiError, isProject, isJobStatusResponse } from "../types/api";
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

export const api: ApiClient = {
  /**
   * Generates a project recommendation based on user preferences
   * @param request User preferences and requirements
   * @returns Generated project recommendation
   */
  async generateRecommendation(
    request: GenerateRecommendationRequest
  ): Promise<GenerateRecommendationResponse> {
    const projectList = useProjectStore.getState().projectList;

    try {
      const responseData = await apiClient
        .post("api/projects/recommend", {
          json: {
            ...request,
            existingProjects: projectList,
          },
        })
        .json<GenerateRecommendationResponse>();

      if (!responseData.jobId) {
        throw new Error("Job ID를 받지 못했습니다");
      }

      return responseData;
    } catch (error) {
      if (isApiError(error)) {
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
  async createProject(
    request: CreateProjectRequest
  ): Promise<CreateProjectResponse> {
    const projectList = useProjectStore.getState().projectList;

    try {
      const response = await apiClient
        .post("api/projects", {
          json: {
            ...request,
            existingProjects: projectList,
          },
        })
        .json<CreateProjectResponse>();

      if (!isProject(response)) {
        throw new Error("유효하지 않은 프로젝트 데이터입니다");
      }

      return response;
    } catch (error) {
      if (isApiError(error)) {
        throw error;
      }
      throw new Error("프로젝트 생성에 실패했습니다");
    }
  },

  /**
   * Fetches all projects
   * @returns List of projects
   */
  async getProjects(): Promise<GetProjectsResponse> {
    const projectList = useProjectStore.getState().projectList;
    return projectList;
  },

  /**
   * Deletes a project
   * @param projectId ID of the project to delete
   */
  async deleteProject(projectId: string): Promise<DeleteProjectResponse> {
    try {
      await apiClient.delete(`api/projects/${projectId}`);
      return {
        success: true,
        message: "프로젝트가 성공적으로 삭제되었습니다",
      };
    } catch (error) {
      if (isApiError(error)) {
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
  async exportProject(projectId: string): Promise<ExportProjectResponse> {
    try {
      return await apiClient.get(`api/projects/${projectId}/export`).blob();
    } catch (error) {
      if (isApiError(error)) {
        throw error;
      }
      throw new Error("프로젝트 내보내기에 실패했습니다");
    }
  },

  async checkRecommendationStatus(jobId: string): Promise<JobStatusResponse> {
    try {
      const responseData = await apiClient
        .get(`api/projects/recommend/${jobId}`)
        .json<JobStatusResponse>();

      if (!isJobStatusResponse(responseData)) {
        throw new Error("상태 정보를 받지 못했습니다");
      }

      return responseData;
    } catch (error) {
      if (isApiError(error)) {
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
  async getProject(projectId: string): Promise<GetProjectResponse> {
    try {
      const response = await apiClient
        .get(`api/projects/${projectId}`)
        .json<GetProjectResponse>();

      if (!isProject(response)) {
        throw new Error("유효하지 않은 프로젝트 데이터입니다");
      }

      return response;
    } catch (error) {
      if (isApiError(error)) {
        throw error;
      }
      throw new Error("프로젝트를 불러오는데 실패했습니다");
    }
  },
};
