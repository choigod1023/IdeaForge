import { match, P } from "ts-pattern";
import type { Project } from "../types";

export type ListPageState =
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "success"; projects: Project[] };

export const calculateListPageState = ({
  isPending,
  error,
  projects,
}: {
  isPending: boolean;
  error: Error | null;
  projects: Project[] | undefined;
}): ListPageState => {
  return match({ isPending, error, projects })
    .with({ isPending: true }, () => ({
      status: "loading" as const,
    }))
    .with({ error: P.not(null) }, ({ error }) => ({
      status: "error" as const,
      error:
        error instanceof Error
          ? error
          : new Error("프로젝트를 불러오는데 실패했습니다"),
    }))
    .with({ projects: P.array() }, ({ projects }) => ({
      status: "success" as const,
      projects,
    }))
    .with({ projects: undefined }, () => ({
      status: "loading" as const,
    }))
    .exhaustive();
};
