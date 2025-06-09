import type { Project, ProjectRequest } from "./index";

// ===== 폴링 상태 타입 강화 =====
export type PollingStatusType = "idle" | "polling" | "completed" | "failed";

export interface PollingStatus {
  jobId: string | null;
  status: PollingStatusType;
  error: string | null;
  progress: number;
}

// ===== 액션 결과 타입 =====
export interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ProjectActionResult extends ActionResult<Project> {
  isDuplicate?: boolean;
}

// ===== 스토어 상태 타입 =====
export interface ProjectState {
  // ===== 상태 =====
  project: Project | null;
  projectList: Project[];
  isLoading: boolean;
  error: string | null;
  preferredTech: string[];
  pollingStatus: PollingStatus;

  // ===== 프로젝트 액션 =====
  setProject: (project: Project) => void;
  clearProject: () => void;
  getProject: (id: string) => Project | undefined;
  selectProject: (project: Project) => void;
  generateProject: (request: ProjectRequest) => Promise<ProjectActionResult>;
  setPreferredTech: (techs: string[]) => void;

  // ===== 프로젝트 목록 액션 =====
  addToProjectList: (project: Project) => ProjectActionResult;
  removeFromProjectList: (projectId: string) => ActionResult;
  clearProjectList: () => void;

  // ===== 스토리지 액션 =====
  saveToLocalStorage: () => ActionResult;
  loadFromLocalStorage: () => ActionResult;

  // ===== 마크다운 액션 =====
  exportToMarkdown: (projectId: string) => ActionResult;
}

// ===== 스토어 선택자 타입 =====
export type ProjectSelector<T> = (state: ProjectState) => T;

// ===== 스토어 액션 타입 =====
export type ProjectAction = (
  state: ProjectState
) => Partial<ProjectState> | void;

// ===== 유틸리티 타입 =====
export type ProjectStateKeys = keyof ProjectState;

export type ProjectStateValues = ProjectState[ProjectStateKeys];

export type ProjectActions = {
  [K in keyof ProjectState]: ProjectState[K] extends (
    ...args: unknown[]
  ) => unknown
    ? ProjectState[K]
    : never;
};

export type ProjectStateOnly = {
  [K in keyof ProjectState]: ProjectState[K] extends (
    ...args: unknown[]
  ) => unknown
    ? never
    : ProjectState[K];
};

// ===== 타입 가드 =====
export function isValidPollingStatus(
  status: string
): status is PollingStatusType {
  return ["idle", "polling", "completed", "failed"].includes(status);
}

export function isProjectState(obj: unknown): obj is ProjectState {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "project" in obj &&
    "projectList" in obj &&
    "isLoading" in obj &&
    "error" in obj &&
    "preferredTech" in obj &&
    "pollingStatus" in obj
  );
}

export function isPollingStatus(obj: unknown): obj is PollingStatus {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "jobId" in obj &&
    "status" in obj &&
    "error" in obj &&
    "progress" in obj &&
    typeof (obj as PollingStatus).progress === "number"
  );
}

export function isActionResult<T>(obj: unknown): obj is ActionResult<T> {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "success" in obj &&
    typeof (obj as ActionResult<T>).success === "boolean"
  );
}
