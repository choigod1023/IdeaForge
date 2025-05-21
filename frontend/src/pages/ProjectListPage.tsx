import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../stores/projectStore";
import { FaPlus } from "react-icons/fa";
import ProjectCard from "../components/project/ProjectCard";
import { AnimatePresence } from "framer-motion";

export default function ProjectListPage() {
  const navigate = useNavigate();
  const { projectList, removeFromProjectList, exportToMarkdown, clearProject } =
    useProjectStore();

  const handleViewProject = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  const handleCreateProject = () => {
    clearProject();
    navigate("/create");
  };

  const handleRemoveProject = (projectId: string) => {
    removeFromProjectList(projectId);
  };

  const handleDownload = async (projectId: string) => {
    await exportToMarkdown(projectId);
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
          <AnimatePresence mode="popLayout">
            {projectList.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onView={handleViewProject}
                onRemove={handleRemoveProject}
                onDownload={handleDownload}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
