import type { Project, ProjectRequest } from "../types";
import { useProjectStore } from "../stores/projectStore";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, ""); // Remove trailing slash if exists

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
      const response = await fetch(`${API_URL}/api/projects/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...request,
          existingProjects: projectList,
        }),
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch {
        throw new Error("서버 응답을 처리할 수 없습니다");
      }

      if (!response.ok) {
        throw new Error(
          responseData.error ||
            responseData.message ||
            "프로젝트 추천 생성에 실패했습니다"
        );
      }

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

    const response = await fetch(`${API_URL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...request,
        existingProjects: projectList,
      }),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "프로젝트 생성에 실패했습니다" }));
      throw new Error(errorData.message || "프로젝트 생성에 실패했습니다");
    }

    return response.json();
  },

  async checkRecommendationStatus(jobId: string): Promise<{
    status: "processing" | "completed" | "failed";
    result?: Project;
    error?: string;
  }> {
    try {
      const response = await fetch(
        `${API_URL}/api/projects/recommend/${jobId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
        }
      );

      let responseData;
      try {
        responseData = await response.json();
      } catch {
        throw new Error("서버 응답을 처리할 수 없습니다");
      }

      if (!response.ok) {
        throw new Error(responseData.error || "상태 확인에 실패했습니다");
      }

      if (!responseData.status) {
        throw new Error("상태 정보를 받지 못했습니다");
      }

      return {
        status: responseData.status,
        result: responseData.result,
        error: responseData.error,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("상태 확인 중 오류가 발생했습니다");
    }
  },
};
