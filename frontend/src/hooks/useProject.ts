import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { Project } from "../types";
import { api } from "../services/api";

export function useProject(projectId?: string) {
  const navigate = useNavigate();

  return useQuery<Project>({
    queryKey: ["project", projectId],
    queryFn: async () => {
      if (!projectId) {
        navigate("/projects", { replace: true });
        throw new Error("Project ID not found");
      }
      try {
        return await api.getProject(projectId);
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("프로젝트를 불러오는데 실패했습니다");
      }
    },
    enabled: !!projectId,
  });
}
