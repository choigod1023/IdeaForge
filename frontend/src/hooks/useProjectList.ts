import { useProjects } from "./useProjects";
import { match, P } from "ts-pattern";
import type { Project } from "../types";

export type ListPageState =
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "success"; projects: Project[] };

export const useProjectList = () => {
  const {
    projects,
    viewProject,
    navigateToCreate,
    removeProject,
    exportProject,
    isPending,
    error,
  } = useProjects();

  // 현재 페이지 상태 결정
  const pageState = match({ isPending, error, projects })
    .with(
      { isPending: true },
      () =>
        ({
          status: "loading" as const,
        } as ListPageState)
    )
    .with(
      { error: P.not(null) },
      ({ error }) =>
        ({
          status: "error" as const,
          error:
            error instanceof Error
              ? error
              : new Error("프로젝트를 불러오는데 실패했습니다"),
        } as ListPageState)
    )
    .with(
      { projects: P.array() },
      ({ projects }) =>
        ({
          status: "success" as const,
          projects,
        } as ListPageState)
    )
    .exhaustive();

  return {
    pageState,
    viewProject,
    navigateToCreate,
    removeProject,
    exportProject,
  };
};
