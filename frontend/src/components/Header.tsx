import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useProjectStore } from "../stores/projectStore";

// 파비콘 설정 함수
const setFavicon = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // 그라데이션 배경
  const gradient = ctx.createLinearGradient(0, 0, 32, 32);
  gradient.addColorStop(0, "#4f46e5"); // indigo-600
  gradient.addColorStop(1, "#6366f1"); // indigo-500
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);

  // 텍스트
  ctx.fillStyle = "white";
  ctx.font = "bold 20px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("IF", 16, 16);

  // 파비콘 설정
  const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
  if (link) {
    link.href = canvas.toDataURL();
  } else {
    const newLink = document.createElement("link");
    newLink.rel = "icon";
    newLink.href = canvas.toDataURL();
    document.head.appendChild(newLink);
  }
};

const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="flex items-center justify-center text-base font-bold text-white rounded-lg w-9 h-9 bg-gradient-to-r from-indigo-600 to-indigo-500 sm:w-12 sm:h-12 sm:text-lg">
      IF
    </div>
    <h1 className="text-lg font-bold text-gray-900 transition cursor-pointer sm:text-2xl dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 whitespace-nowrap">
      IdeaForge
    </h1>
  </div>
);

export const Header = () => {
  const navigate = useNavigate();
  const { clearProject } = useProjectStore();

  useEffect(() => {
    setFavicon();
  }, []);

  const handleCreateProject = () => {
    clearProject();
    navigate("/create");
  };

  const handleViewProjects = () => {
    navigate("/projects");
  };

  return (
    <header className="flex-shrink-0 w-full bg-white shadow-sm dark:bg-gray-800">
      <div className="w-full px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={handleViewProjects}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-indigo-700 transition-colors bg-indigo-50 rounded-xl hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:text-indigo-400 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:focus:ring-offset-gray-800 sm:px-4 sm:py-2 sm:text-sm"
            >
              내 프로젝트
            </button>
            <button
              onClick={handleCreateProject}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white transition-colors bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl hover:from-indigo-700 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:from-indigo-500 dark:to-indigo-400 dark:hover:from-indigo-600 dark:hover:to-indigo-500 dark:focus:ring-offset-gray-800 sm:px-4 sm:py-2 sm:text-sm"
            >
              프로젝트 생성
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
