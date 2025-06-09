import type { ProjectRequest } from "../../types";
import type { ProjectState, ProjectActionResult } from "../../types/store";
import type { GenerateRecommendationRequest } from "../../types/api";
import type { StoreApi } from "zustand/vanilla";
import { api } from "../../services/api";

export const createPollingActions = (
  set: StoreApi<ProjectState>["setState"],
  get: () => ProjectState
) => {
  let pollInterval: NodeJS.Timeout | null = null;
  let timeoutId: NodeJS.Timeout | null = null;

  const cleanup = () => {
    if (pollInterval) {
      clearInterval(pollInterval);
      pollInterval = null;
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return {
    generateProject: async (
      request: ProjectRequest
    ): Promise<ProjectActionResult> => {
      cleanup();

      set({
        isLoading: true,
        error: null,
        pollingStatus: {
          jobId: null,
          status: "polling",
          error: null,
          progress: 0,
        },
      });

      try {
        // 1. 초기 요청으로 jobId 받기
        const { jobId } = await api.generateRecommendation(
          request as GenerateRecommendationRequest
        );

        if (!jobId) {
          throw new Error("Job ID를 받지 못했습니다");
        }

        // jobId 저장
        set((state: ProjectState) => ({
          pollingStatus: {
            ...state.pollingStatus,
            jobId,
          },
        }));

        // 2. 폴링 시작
        pollInterval = setInterval(async () => {
          const currentStatus = get().pollingStatus.status;

          if (currentStatus !== "polling") {
            cleanup();
            return;
          }

          try {
            const status = await api.checkRecommendationStatus(jobId);

            switch (status.status) {
              case "completed": {
                if (!status.result) {
                  throw new Error("프로젝트 데이터를 받지 못했습니다");
                }
                cleanup();

                // 프로젝트 추가
                const addResult = get().addToProjectList(status.result);
                if (!addResult.success) {
                  throw new Error("이미 존재하는 프로젝트입니다");
                }

                set({
                  project: status.result,
                  isLoading: false,
                  pollingStatus: {
                    jobId: null,
                    status: "completed",
                    error: null,
                    progress: 100,
                  },
                });
                break;
              }

              case "failed": {
                cleanup();
                set({
                  error: status.error || "프로젝트 생성에 실패했습니다",
                  isLoading: false,
                  pollingStatus: {
                    jobId: null,
                    status: "failed",
                    error: status.error || "프로젝트 생성에 실패했습니다",
                    progress: 0,
                  },
                });
                break;
              }

              case "processing": {
                set((state: ProjectState) => ({
                  pollingStatus: {
                    ...state.pollingStatus,
                    progress: Math.min(state.pollingStatus.progress + 10, 90),
                  },
                }));
                break;
              }
            }
          } catch (error) {
            cleanup();
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "상태 확인 중 오류가 발생했습니다",
              isLoading: false,
              pollingStatus: {
                jobId: null,
                status: "failed",
                error:
                  error instanceof Error
                    ? error.message
                    : "상태 확인 중 오류가 발생했습니다",
                progress: 0,
              },
            });
          }
        }, 2000);

        // 5분 타임아웃
        timeoutId = setTimeout(() => {
          const currentStatus = get().pollingStatus.status;

          if (currentStatus === "polling") {
            cleanup();
            set({
              error: "프로젝트 생성 시간이 초과되었습니다",
              isLoading: false,
              pollingStatus: {
                jobId: null,
                status: "failed",
                error: "프로젝트 생성 시간이 초과되었습니다",
                progress: 0,
              },
            });
          }
        }, 5 * 60 * 1000);

        return { success: true };
      } catch (error) {
        cleanup();
        set({
          error:
            error instanceof Error
              ? error.message
              : "프로젝트 생성 중 오류가 발생했습니다",
          isLoading: false,
          pollingStatus: {
            jobId: null,
            status: "failed",
            error:
              error instanceof Error
                ? error.message
                : "프로젝트 생성 중 오류가 발생했습니다",
            progress: 0,
          },
        });
        return {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "프로젝트 생성 중 오류가 발생했습니다",
        };
      }
    },
  };
};
