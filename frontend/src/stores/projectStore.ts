import { create } from "zustand";
import type { ProjectState, ActionResult } from "../types/store";
import {
  loadProjectsFromStorage,
  loadSelectedProjectFromStorage,
} from "../utils/storage";
import { exportProjectToMarkdown } from "../utils/markdown";
import { createProjectActions } from "./actions/projectActions";
import { createPollingActions } from "./actions/pollingActions";

export const useProjectStore = create<ProjectState>((set, get) => ({
  // 초기 상태
  project: loadSelectedProjectFromStorage(),
  projectList: loadProjectsFromStorage(),
  isLoading: false,
  error: null,
  preferredTech: [],
  pollingStatus: {
    jobId: null,
    status: "idle",
    error: null,
    progress: 0,
  },

  // 프로젝트 액션
  ...createProjectActions(set, get),

  // 폴링 액션
  ...createPollingActions(set, get),

  // 마크다운 액션
  exportToMarkdown: (projectId: string): ActionResult => {
    try {
      const { projectList } = get();
      const project = projectList.find((p) => p.id === projectId);

      if (!project) {
        return {
          success: false,
          error: `ID가 ${projectId}인 프로젝트를 찾을 수 없습니다.`,
        };
      }

      exportProjectToMarkdown(project);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "마크다운 내보내기에 실패했습니다",
      };
    }
  },
}));
