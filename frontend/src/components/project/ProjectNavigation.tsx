import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ProjectNavigationProps {
  source?: "create" | "list";
}

export function ProjectNavigation({ source = "list" }: ProjectNavigationProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center pt-6 mt-8 border-t border-gray-100">
      <button
        onClick={() => navigate(source === "create" ? "/create" : "/projects")}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800"
        title={
          source === "create"
            ? "프로젝트 생성 페이지로 돌아가기"
            : "프로젝트 목록으로 돌아가기"
        }
      >
        <FaArrowLeft className="w-4 h-4" />
        <span>
          {source === "create"
            ? "프로젝트 다시 생성하기"
            : "내 프로젝트 다시 보기"}
        </span>
      </button>
    </div>
  );
}
