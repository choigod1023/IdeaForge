import { match, P } from "ts-pattern";
import type { CreatePageState } from "../hooks/useProjectCreate";

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
