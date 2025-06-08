import type { Project, ProjectRequest } from "../types";
import { api } from "../services/api";

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
    // 1. 추천 생성 요청
    const { jobId } = await api.generateRecommendation(data);
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
