import type { Project, ProjectRequest } from "../types";
import { useProjectStore } from "../stores/projectStore";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, ""); // Remove trailing slash if exists

export const api = {
  /**
   * Generates a project recommendation based on user preferences
   * @param request User preferences and requirements
   * @returns Generated project recommendation
   */
  async generateRecommendation(request: ProjectRequest): Promise<Project> {
    const projectList = useProjectStore.getState().projectList;

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

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "프로젝트 추천 생성에 실패했습니다" }));
      throw new Error(errorData.message || "프로젝트 추천 생성에 실패했습니다");
    }

    const data = await response.json();
    if (!data) {
      throw new Error("프로젝트 추천 생성에 실패했습니다");
    }

    return data;
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
};
