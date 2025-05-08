import type { Project, ProjectRequest } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  /**
   * Generates a project recommendation based on user preferences
   * @param request User preferences and requirements
   * @returns Generated project recommendation
   */
  async generateRecommendation(request: ProjectRequest): Promise<Project> {
    const response = await fetch(`${API_URL}/api/projects/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "프로젝트 추천 생성에 실패했습니다");
    }

    return response.json();
  },
};
