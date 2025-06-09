import { match, P } from "ts-pattern";
import type { Project, ProjectRequest } from "../types";
import type { CreatePageState } from "../hooks/useProjectCreate";
import type { GenerateRecommendationRequest } from "../types/api";
import { api } from "../services/api";
import { useProjectStore } from "../stores/projectStore";

// ===== 프로젝트 리스트 관련 =====
export type ListPageState =
  | { status: "loading"; projects: Project[] }
  | { status: "error"; error: Error; projects: Project[] }
  | { status: "success"; projects: Project[] };

export const calculateListPageState = ({
  isPending,
  error,
  projects,
}: {
  isPending: boolean;
  error: Error | null;
  projects: Project[];
}): ListPageState => {
  if (isPending) {
    return { status: "loading", projects };
  }

  if (error) {
    return { status: "error", error, projects };
  }

  return { status: "success", projects };
};

// ===== 프로젝트 데이터 파싱 =====
export function parseProjectData(projectData: string | null): Project {
  if (!projectData) {
    throw new Error("유효하지 않은 프로젝트 링크입니다.");
  }

  try {
    const decodedData = decodeURIComponent(projectData);
    return JSON.parse(decodedData) as Project;
  } catch {
    throw new Error("프로젝트 데이터를 불러오는데 실패했습니다.");
  }
}

// ===== 프로젝트 생성 페이지 상태 =====
export const calculateCreatePageState = ({
  isPending,
  error,
}: {
  isPending: boolean;
  error: Error | null;
}): CreatePageState => {
  return match({ isPending, error })
    .with({ isPending: true }, () => ({
      status: "loading" as const,
    }))
    .with({ error: P.not(null) }, ({ error }) => ({
      status: "error" as const,
      error:
        error instanceof Error
          ? error
          : new Error("프로젝트 생성 중 오류가 발생했습니다"),
    }))
    .otherwise(() => ({
      status: "ready" as const,
    }));
};

// ===== 프로젝트 생성 (폴링 포함) =====
type ProjectCreationCallbacks = {
  onSuccess: (project: Project) => void;
  onError: (error: Error) => void;
  onTimeout: () => void;
  onProcessing: () => void;
};

export async function createProjectWithPolling(
  data: ProjectRequest,
  callbacks: ProjectCreationCallbacks
): Promise<Project> {
  let pollInterval: NodeJS.Timeout | null = null;
  let timeoutId: NodeJS.Timeout | null = null;

  const cleanup = () => {
    if (pollInterval) clearInterval(pollInterval);
    if (timeoutId) clearTimeout(timeoutId);
  };

  try {
    // 1. 추천 생성 요청 - existingProjects 추가
    const projectList = useProjectStore.getState().projectList;
    const requestData: GenerateRecommendationRequest = {
      ...data,
      existingProjects: projectList,
    };

    const { jobId } = await api.generateRecommendation(requestData);
    if (!jobId) throw new Error("Job ID를 받지 못했습니다");

    // 2. polling 시작
    return new Promise<Project>((resolve, reject) => {
      pollInterval = setInterval(async () => {
        try {
          const status = await api.checkRecommendationStatus(jobId);

          switch (status.status) {
            case "completed": {
              if (!status.result) {
                throw new Error("프로젝트 데이터를 받지 못했습니다");
              }
              cleanup();
              callbacks.onSuccess(status.result);
              resolve(status.result);
              break;
            }

            case "failed": {
              cleanup();
              const error = new Error(
                status.error || "프로젝트 생성에 실패했습니다"
              );
              callbacks.onError(error);
              reject(error);
              break;
            }

            case "processing":
              callbacks.onProcessing();
              break;
          }
        } catch (error) {
          cleanup();
          const wrappedError =
            error instanceof Error
              ? error
              : new Error("상태 확인 중 오류가 발생했습니다");
          callbacks.onError(wrappedError);
          reject(wrappedError);
        }
      }, 2000);

      // 5분 타임아웃
      timeoutId = setTimeout(() => {
        cleanup();
        const error = new Error("프로젝트 생성 시간이 초과되었습니다");
        callbacks.onTimeout();
        reject(error);
      }, 5 * 60 * 1000);
    });
  } catch (error) {
    cleanup();
    const wrappedError =
      error instanceof Error
        ? error
        : new Error("프로젝트 생성 중 오류가 발생했습니다");
    callbacks.onError(wrappedError);
    throw wrappedError;
  }
}
