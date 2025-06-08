import type { Project, ProjectRequest } from "./index";

export interface PollingStatus {
  jobId: string | null;
  status: "idle" | "polling" | "completed" | "failed";
  error: string | null;
  progress: number;
}

export interface ProjectState {
  // 상태
  project: Project | null;
  projectList: Project[];
  isLoading: boolean;
  error: string | null;
  preferredTech: string[];
  pollingStatus: PollingStatus;

  // 프로젝트 액션
  setProject: (project: Project) => void;
  clearProject: () => void;
  getProject: (id: string) => Project | undefined;
  selectProject: (project: Project) => void;
  generateProject: (
    request: ProjectRequest
  ) => Promise<{ success: boolean; isDuplicate?: boolean }>;
  setPreferredTech: (techs: string[]) => void;

  // 프로젝트 목록 액션
  addToProjectList: (project: Project) => {
    success: boolean;
    isDuplicate?: boolean;
  };
  removeFromProjectList: (projectId: string) => boolean;
  clearProjectList: () => void;

  // 스토리지 액션
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;

  // 마크다운 액션
  exportToMarkdown: (projectId: string) => void;
}
