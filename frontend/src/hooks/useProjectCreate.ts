import { useProjects } from "./useProjects";
import { calculateCreatePageState } from "../utils/projectCreate";

export type CreatePageState =
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "ready" };

export const useProjectCreate = () => {
  const { createProject, isPending, error } = useProjects();

  // 상태 계산을 유틸리티 함수로 분리
  const pageState = calculateCreatePageState({ isPending, error });

  // createProject를 직접 노출 (불필요한 래퍼 제거)
  return {
    pageState,
    createProject,
    isPending,
  };
};
