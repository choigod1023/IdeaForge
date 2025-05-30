import { FaDownload, FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { type Project } from "../../types";
import { useProjectStore, generateMarkdown } from "../../stores/projectStore";

interface ProjectHeaderProps {
  project: Project;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const { exportToMarkdown } = useProjectStore();

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
      await exportToMarkdown(project.id);
      toast.success("프로젝트가 마크다운 파일로 저장되었습니다!");
    } catch (error) {
      console.error("다운로드 실패:", error);
      toast.error("다운로드에 실패했습니다.");
    }
  };

  return (
    <div className="pb-6 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-2xl md:text-3xl dark:text-gray-100">
          {project.title}
        </h2>
        <div className="flex space-x-3">
          <button
            onClick={handleDownload}
            className="p-2 text-blue-600 transition-colors rounded-xl hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30"
            title="마크다운으로 다운로드"
          >
            <FaDownload className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleCopy}
            className="p-2 text-gray-600 transition-colors rounded-xl hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
            title="프로젝트 데이터 복사하기"
          >
            <FaCopy className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-indigo-700 bg-indigo-50 rounded-xl">
          {project.difficulty}
        </span>
        {project.category && (
          <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-green-700 bg-green-50 rounded-xl">
            {project.category}
          </span>
        )}
        {project.theme && (
          <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-purple-700 bg-purple-50 rounded-xl">
            {project.theme}
          </span>
        )}
      </div>
    </div>
  );
}
