import { useProjects } from "./useProjects";
import type { ProjectRequest } from "../types";
import { match, P } from "ts-pattern";

export type CreatePageState =
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "ready" };

export const useProjectCreate = () => {
  const { createProject, isPending, error } = useProjects();

  const handleSubmit = async (data: ProjectRequest) => {
    createProject(data);
  };

  // 현재 페이지 상태 결정
  const pageState = match({ isPending, error })
    .with(
      { isPending: true },
      () =>
        ({
          status: "loading" as const,
        } as CreatePageState)
    )
    .with(
      { error: P.not(null) },
      ({ error }) =>
        ({
          status: "error" as const,
          error:
            error instanceof Error
              ? error
              : new Error("프로젝트 생성 중 오류가 발생했습니다"),
        } as CreatePageState)
    )
    .otherwise(
      () =>
        ({
          status: "ready" as const,
        } as CreatePageState)
    );

  return {
    pageState,
    handleSubmit,
    isPending,
  };
};
