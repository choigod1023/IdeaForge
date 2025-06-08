import type { Project } from "../types";

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
