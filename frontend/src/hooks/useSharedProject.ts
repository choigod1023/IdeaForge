import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "../types";

function parseProjectData(projectData: string | null): Project {
  if (!projectData) {
    throw new Error("유효하지 않은 프로젝트 링크입니다.");
  }

  try {
    const decodedData = decodeURIComponent(projectData);
    return JSON.parse(decodedData) as Project;
  } catch (error) {
    console.error("프로젝트 데이터 파싱 실패:", error);
    throw new Error("프로젝트 데이터를 불러오는데 실패했습니다.");
  }
}

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
