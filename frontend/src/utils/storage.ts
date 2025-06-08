import type { Project } from "../types";

const STORAGE_KEYS = {
  PROJECT_LIST: "ideaforge_projects",
  SELECTED_PROJECT: "selectedProject",
} as const;

export const loadProjectsFromStorage = (): Project[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROJECT_LIST);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const loadSelectedProjectFromStorage = (): Project | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SELECTED_PROJECT);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveProjectsToStorage = (projects: Project[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECT_LIST, JSON.stringify(projects));
  } catch {
    // Storage operation failed
  }
};

export const saveSelectedProjectToStorage = (project: Project | null): void => {
  try {
    if (project) {
      localStorage.setItem(
        STORAGE_KEYS.SELECTED_PROJECT,
        JSON.stringify(project)
      );
    } else {
      localStorage.removeItem(STORAGE_KEYS.SELECTED_PROJECT);
    }
  } catch {
    // Storage operation failed
  }
};

export const clearProjectStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.PROJECT_LIST);
    localStorage.removeItem(STORAGE_KEYS.SELECTED_PROJECT);
  } catch {
    // Storage operation failed
  }
};
