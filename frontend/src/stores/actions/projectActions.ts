import type { Project } from "../../types";
import type { ProjectState } from "../../types/store";
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

  addToProjectList: (project: Project) => {
    const state = get();
    // 중복 체크
    const isDuplicate = state.projectList.some(
      (p) => p.title === project.title && p.description === project.description
    );

    if (isDuplicate) {
      return { success: false, isDuplicate: true };
    }

    const newList = [...state.projectList, project];
    saveProjectsToStorage(newList);
    set({ projectList: newList });
    return { success: true, isDuplicate: false };
  },

  removeFromProjectList: (projectId: string) => {
    const state = get();
    const newList = state.projectList.filter((p) => p.id !== projectId);
    saveProjectsToStorage(newList);
    set({ projectList: newList });
    return true;
  },

  clearProjectList: () => {
    set({ projectList: [] });
    saveProjectsToStorage([]);
  },

  saveToLocalStorage: () => {
    const { projectList } = get();
    saveProjectsToStorage(projectList);
  },

  loadFromLocalStorage: () => {
    const { projectList } = get();
    set({ projectList });
  },
});
