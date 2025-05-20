import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../stores/projectStore";
import { FaPlus, FaTrash, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProjectListPage() {
  const navigate = useNavigate();
  const {
    projectList,
    removeFromProjectList,
    exportToMarkdown,
    clearProject,
    loadFromLocalStorage,
  } = useProjectStore();

  const handleViewProject = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  const handleCreateProject = () => {
    clearProject();
    navigate("/create");
  };

  const handleRemoveProject = (projectId: string) => {
    if (window.confirm("정말로 이 프로젝트를 삭제하시겠습니까?")) {
      removeFromProjectList(projectId);
      loadFromLocalStorage();
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
          onClick={handleCreateProject}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:px-4 sm:py-2"
        >
          <FaPlus className="mr-2" />새 프로젝트
        </button>
      </div>

      {projectList.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white shadow rounded-3xl dark:bg-gray-800 sm:p-12">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100 sm:text-xl">
            생성된 프로젝트가 없습니다.
          </h2>
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
            새로운 프로젝트를 생성해보세요!
          </p>
          <button
            onClick={handleCreateProject}
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
              onClick={() => handleViewProject(project.id)}
              className="relative p-4 transition-all duration-200 bg-white rounded-2xl shadow cursor-pointer hover:bg-gray-50 hover:shadow-md active:bg-gray-100 active:scale-[0.98] dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600 sm:p-6 group"
            >
              <div className="absolute inset-0 transition-opacity duration-200 rounded-2xl ring-2 ring-transparent group-hover:ring-indigo-500/20 group-active:ring-indigo-500/40 dark:group-hover:ring-indigo-400/20 dark:group-active:ring-indigo-400/40" />
              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-400 sm:text-xl">
                    {project.title}
                  </h2>
                  <div
                    className="flex space-x-1 sm:space-x-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => handleDownload(project.id)}
                      className="p-1.5 text-green-600 transition-colors rounded-xl hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/30 sm:p-2"
                      title="마크다운으로 저장"
                    >
                      <FaDownload className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveProject(project.id)}
                      className="p-1.5 text-red-600 transition-colors rounded-xl hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30 sm:p-2"
                      title="프로젝트 삭제"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="mb-3 text-sm text-gray-600 transition-colors group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300 line-clamp-2 sm:text-base">
                  {project.description.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="px-2 py-0.5 text-xs font-medium text-blue-800 bg-blue-100 rounded-xl transition-colors group-hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:group-hover:bg-blue-900/50">
                    {project.difficulty}
                  </span>
                  {project.category && (
                    <span className="px-2 py-0.5 text-xs font-medium text-green-800 bg-green-100 rounded-xl transition-colors group-hover:bg-green-200 dark:bg-green-900/30 dark:text-green-200 dark:group-hover:bg-green-900/50">
                      {project.category}
                    </span>
                  )}
                  {project.theme && (
                    <span className="px-2 py-0.5 text-xs font-medium text-purple-800 bg-purple-100 rounded-xl transition-colors group-hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:group-hover:bg-purple-900/50">
                      {project.theme}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs font-medium text-gray-800 bg-gray-100 rounded-xl transition-colors group-hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:group-hover:bg-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-xl transition-colors group-hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:group-hover:bg-gray-600">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
