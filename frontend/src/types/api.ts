import type { Project, ProjectRequest } from "./index";

// ===== API 응답 기본 타입 =====
export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message: string;
  success: boolean;
}

// ===== API 에러 타입 =====
export type ApiErrorType =
  | "NETWORK_ERROR"
  | "VALIDATION_ERROR"
  | "API_ERROR"
  | "TIMEOUT_ERROR"
  | "UNAUTHORIZED_ERROR";

export interface ApiError {
  type: ApiErrorType;
  message: string;
  code?: number;
  field?: string;
  details?: Record<string, unknown>;
}

// ===== 작업 상태 타입 =====
export type JobStatus = "processing" | "completed" | "failed";

export interface JobStatusResponse {
  status: JobStatus;
  result?: Project;
  error?: string;
  progress?: number;
}

// ===== 프로젝트 생성 관련 타입 =====
export interface GenerateRecommendationRequest extends ProjectRequest {
  existingProjects: Project[];
}

export interface GenerateRecommendationResponse {
  jobId: string;
}

// ===== 프로젝트 CRUD 관련 타입 =====
export interface CreateProjectRequest extends ProjectRequest {
  existingProjects: Project[];
}

export type CreateProjectResponse = Project;
export type GetProjectsResponse = Project[];
export type GetProjectResponse = Project;

export interface DeleteProjectResponse {
  success: boolean;
  message: string;
}

export type ExportProjectResponse = Blob;

// ===== API 함수 타입 =====
export interface ApiClient {
  generateRecommendation(
    request: GenerateRecommendationRequest
  ): Promise<GenerateRecommendationResponse>;
  createProject(request: CreateProjectRequest): Promise<CreateProjectResponse>;
  getProjects(): Promise<GetProjectsResponse>;
  getProject(projectId: string): Promise<GetProjectResponse>;
  deleteProject(projectId: string): Promise<DeleteProjectResponse>;
  exportProject(projectId: string): Promise<ExportProjectResponse>;
  checkRecommendationStatus(jobId: string): Promise<JobStatusResponse>;
}

// ===== 타입 가드 함수 =====
export function isApiError(error: unknown): error is ApiError {
  return (
    error !== null &&
    typeof error === "object" &&
    "type" in error &&
    "message" in error &&
    typeof (error as ApiError).type === "string" &&
    typeof (error as ApiError).message === "string"
  );
}

export function isJobStatusResponse(obj: unknown): obj is JobStatusResponse {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "status" in obj &&
    typeof (obj as JobStatusResponse).status === "string" &&
    ["processing", "completed", "failed"].includes(
      (obj as JobStatusResponse).status
    )
  );
}

export function isApiResponse<T>(obj: unknown): obj is ApiResponse<T> {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "data" in obj &&
    "status" in obj &&
    "message" in obj &&
    "success" in obj &&
    typeof (obj as ApiResponse<T>).status === "number" &&
    typeof (obj as ApiResponse<T>).message === "string" &&
    typeof (obj as ApiResponse<T>).success === "boolean"
  );
}

// ===== 유틸리티 타입 =====
export type ApiResponseData<T> = T extends ApiResponse<infer U> ? U : never;

export type ApiRequest<T> = T extends (...args: infer Args) => Promise<unknown>
  ? Args[0]
  : never;

export type ApiResponseType<T> = T extends (
  ...args: unknown[]
) => Promise<infer Response>
  ? Response
  : never;
