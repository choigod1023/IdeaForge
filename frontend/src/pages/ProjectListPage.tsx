import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../stores/projectStore";
import { FaPlus, FaTrash, FaEye, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProjectListPage() {
  const navigate = useNavigate();
  const { projectList, removeFromProjectList, exportToMarkdown } =
    useProjectStore();

  const handleViewProject = (projectId: string) => {
    const project = projectList.find((p) => p.id === projectId);
    if (project) {
      navigate("/project", { state: { project } });
    } else {
      toast.error("프로젝트를 찾을 수 없습니다.");
    }
  };

  const handleRemoveProject = (projectId: string) => {
    if (window.confirm("정말로 이 프로젝트를 삭제하시겠습니까?")) {
      removeFromProjectList(projectId);
      toast.success("프로젝트가 삭제되었습니다.");
    }
  };

  const handleDownload = async (projectId: string) => {
    try {
      await exportToMarkdown(projectId);
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

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">
          내 프로젝트 목록
        </h1>
        <button
          onClick={() => navigate("/create")}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:px-4 sm:py-2"
        >
          <FaPlus className="mr-2" />새 프로젝트 생성
        </button>
      </div>

      {projectList.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-12">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100 sm:text-xl">
            아직 생성된 프로젝트가 없습니다
          </h2>
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
            새로운 프로젝트를 생성해보세요!
          </p>
          <button
            onClick={() => navigate("/create")}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:px-4 sm:py-2"
          >
            <FaPlus className="mr-2" />
            프로젝트 생성하기
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectList.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 sm:text-xl">
                  {project.title}
                </h2>
                <div className="flex space-x-1 sm:space-x-2">
                  <button
                    onClick={() => handleDownload(project.id)}
                    className="p-1.5 text-green-600 transition-colors rounded-full hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/30 sm:p-2"
                    title="마크다운으로 저장"
                  >
                    <FaDownload className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleViewProject(project.id)}
                    className="p-1.5 text-gray-600 transition-colors rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 sm:p-2"
                    title="프로젝트 보기"
                  >
                    <FaEye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRemoveProject(project.id)}
                    className="p-1.5 text-red-600 transition-colors rounded-full hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30 sm:p-2"
                    title="프로젝트 삭제"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="mb-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 sm:text-base">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="px-2 py-0.5 text-xs font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-200">
                  {project.difficulty}
                </span>
                {project.category && (
                  <span className="px-2 py-0.5 text-xs font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-900/30 dark:text-green-200">
                    {project.category}
                  </span>
                )}
                {project.theme && (
                  <span className="px-2 py-0.5 text-xs font-medium text-purple-800 bg-purple-100 rounded-full dark:bg-purple-900/30 dark:text-purple-200">
                    {project.theme}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-1">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-200"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-400">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
