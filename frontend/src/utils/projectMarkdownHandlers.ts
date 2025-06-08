import { toast } from "react-toastify";
import { type Project } from "../types";
import { generateMarkdown } from "../stores/projectStore";

export const createMarkdownHandlers = (
  project: Project,
  exportToMarkdown: (projectId: string) => void
) => {
  const handleCopy = async () => {
    try {
      const markdown = generateMarkdown(project);
      await navigator.clipboard.writeText(markdown);
      toast.success("프로젝트가 마크다운 형식으로 복사되었습니다!");
    } catch (error) {
      console.error("복사하기 실패:", error);
      toast.error("복사하기에 실패했습니다.");
    }
  };

  const handleDownload = async () => {
    try {
      exportToMarkdown(project.id);
      toast.success("프로젝트가 마크다운 파일로 저장되었습니다!");
    } catch (error) {
      console.error("다운로드 실패:", error);
      toast.error("다운로드에 실패했습니다.");
    }
  };

  return {
    handleCopy,
    handleDownload,
  };
};
