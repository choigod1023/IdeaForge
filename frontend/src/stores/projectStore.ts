import { create } from "zustand";
import type { Project, ProjectRequest } from "../types";
import { api } from "../services/api";

interface ProjectState {
  project: Project | null;
  isLoading: boolean;
  error: string | null;
  generateProject: (request: ProjectRequest) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set) => ({
  project: null,
  isLoading: false,
  error: null,
  generateProject: async (request: ProjectRequest) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.generateRecommendation(request);
      set({ project: data, isLoading: false });
    } catch (error) {
      let errorMessage = "알 수 없는 오류가 발생했습니다.";

      if (error instanceof Error) {
        // 백엔드에서 오는 에러 메시지 처리
        if (error.message.includes("Required")) {
          errorMessage = "모든 필수 항목을 입력해주세요.";
        } else if (error.message.includes("invalid_type")) {
          errorMessage = "입력하신 정보가 올바르지 않습니다.";
        } else {
          errorMessage = error.message;
        }
      }

      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
}));
