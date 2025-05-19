import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProjectStore } from "../../stores/projectStore";

interface ProjectNavigationProps {
  source?: "create" | "list";
}

export function ProjectNavigation({ source = "list" }: ProjectNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearProject } = useProjectStore();
  const [canGoBack, setCanGoBack] = useState(false);

  const handleNavigation = () => {
    if (source === "create") {
      clearProject(); // 프로젝트 데이터 초기화
      navigate("/create");
    } else {
      navigate("/projects");
    }
  };

  useEffect(() => {
    // create 모드일 때는 항상 버튼을 보여주고, list 모드일 때만 히스토리 체크
    if (source === "create") {
      setCanGoBack(true);
    } else {
      setCanGoBack(window.history.length > 1);
    }
  }, [location, source]);

  // 히스토리가 없거나 특정 조건에서는 버튼을 숨김
  if (!canGoBack) {
    return null;
  }

  return (
    <div className="flex justify-center pt-6 pb-6 mt-8 border-t border-gray-100 dark:border-gray-700">
      <button
        onClick={handleNavigation}
        className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          location.pathname.startsWith("/create")
            ? "text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:ring-indigo-500 dark:text-indigo-400 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:focus:ring-offset-gray-800"
            : "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800"
        }`}
        title={
          location.pathname.startsWith("/create")
            ? "새로운 프로젝트 생성하기"
            : "프로젝트 목록으로 돌아가기"
        }
      >
        <FaArrowLeft className="w-4 h-4" />
        <span>
          {location.pathname.startsWith("/create")
            ? "새로운 프로젝트 만들기"
            : "내 프로젝트 목록으로"}
        </span>
      </button>
    </div>
  );
}
