import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { Project } from "../types";

export function useProject(projectId?: string) {
  const navigate = useNavigate();

  return useQuery<Project>({
    queryKey: ["project", projectId],
    queryFn: async () => {
      if (!projectId) {
        navigate("/projects", { replace: true });
        throw new Error("Project ID not found");
      }
      // TODO: 실제 API 호출로 변경
      const response = await fetch(`/api/projects/${projectId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }
      return response.json();
    },
    enabled: !!projectId,
  });
}
