import { toast } from "react-toastify";
import type { Project } from "../types";

interface ProjectCardHandlers {
  onRemove: (projectId: string) => void;
  onDownload: (projectId: string) => void;
}

export const createProjectCardHandlers = (
  project: Project,
  { onRemove, onDownload }: ProjectCardHandlers
) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("정말로 이 프로젝트를 삭제하시겠습니까?")) {
      onRemove(project.id);
      toast.success("프로젝트가 삭제되었습니다.");
    }
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await onDownload(project.id);
      toast.success("프로젝트가 마크다운 파일로 저장되었습니다.");
    } catch (error) {
      console.error("다운로드 실패:", error);
      if (error instanceof Error) {
        toast.error(error.message || "다운로드에 실패했습니다.");
      } else {
        toast.error("다운로드에 실패했습니다.");
      }
    }
  };

  return {
    handleRemove,
    handleDownload,
  };
};
