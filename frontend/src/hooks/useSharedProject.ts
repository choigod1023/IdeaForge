import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "../types";
import { parseProjectData } from "../utils/projectUtils";

export function useSharedProject() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return useQuery<Project>({
    queryKey: ["sharedProject", searchParams.get("data")],
    queryFn: () => {
      const projectData = searchParams.get("data");
      try {
        return parseProjectData(projectData);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
        navigate("/");
        throw error;
      }
    },
    enabled: !!searchParams.get("data"),
  });
}
