import type { Project } from "../types";

export function parseProjectData(projectData: string | null): Project {
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
