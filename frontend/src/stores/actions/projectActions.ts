import type { Project } from "../../types";
import type {
  ProjectState,
  ActionResult,
  ProjectActionResult,
} from "../../types/store";
import type { StoreApi } from "zustand/vanilla";
import {
  saveProjectsToStorage,
  saveSelectedProjectToStorage,
} from "../../utils/storage";

export const createProjectActions = (
  set: StoreApi<ProjectState>["setState"],
  get: () => ProjectState
) => ({
  setProject: (project: Project) => set({ project }),

  clearProject: () => {
    set({
      project: null,
      error: null,
      isLoading: false,
      preferredTech: [],
    });
    saveSelectedProjectToStorage(null);
  },

  getProject: (id: string) => {
    const { projectList } = get();
    return projectList.find((p) => p.id === id);
  },

  selectProject: (project: Project) => {
    set({ project });
    saveSelectedProjectToStorage(project);
  },

  setPreferredTech: (techs: string[]) => set({ preferredTech: techs }),

  addToProjectList: (project: Project): ProjectActionResult => {
    const state = get();
    // 중복 체크
    const isDuplicate = state.projectList.some(
      (p) => p.title === project.title && p.description === project.description
    );

    if (isDuplicate) {
      return {
        success: false,
        isDuplicate: true,
        error: "이미 존재하는 프로젝트입니다",
      };
    }

    const newList = [...state.projectList, project];
    saveProjectsToStorage(newList);
    set({ projectList: newList });
    return {
      success: true,
      isDuplicate: false,
      data: project,
    };
  },

  removeFromProjectList: (projectId: string): ActionResult => {
    const state = get();
    const newList = state.projectList.filter((p) => p.id !== projectId);
    saveProjectsToStorage(newList);
    set({ projectList: newList });
    return { success: true };
  },

  clearProjectList: () => {
    set({ projectList: [] });
    saveProjectsToStorage([]);
  },

  saveToLocalStorage: (): ActionResult => {
    try {
      const { projectList } = get();
      saveProjectsToStorage(projectList);
      return { success: true };
    } catch {
      return {
        success: false,
        error: "로컬 스토리지 저장에 실패했습니다",
      };
    }
  },

  loadFromLocalStorage: (): ActionResult => {
    try {
      const { projectList } = get();
      set({ projectList });
      return { success: true };
    } catch {
      return {
        success: false,
        error: "로컬 스토리지 로드에 실패했습니다",
      };
    }
  },
});
