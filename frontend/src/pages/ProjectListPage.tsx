import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../stores/projectStore";
import { FaPlus } from "react-icons/fa";
import ProjectCard from "../components/project/ProjectCard";
import { AnimatePresence } from "framer-motion";

export default function ProjectListPage() {
  const navigate = useNavigate();
  const {
    projectList,
    removeFromProjectList,
    exportToMarkdown,
    clearProject,
    setProject,
  } = useProjectStore();

  const handleViewProject = (projectId: string) => {
    const project = projectList.find((p) => p.id === projectId);
    if (project) {
      setProject(project);
      navigate("/project");
    }
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
    <div className="max-w-7xl p-4 mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          내 프로젝트
        </h1>
        <button
          onClick={handleCreateProject}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-colors bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:from-indigo-400 dark:to-purple-500 dark:hover:from-indigo-500 dark:hover:to-purple-600 dark:focus:ring-offset-gray-800"
        >
          <FaPlus className="mr-2" />새 프로젝트
        </button>
      </div>

      {projectList.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-400">
            아직 생성된 프로젝트가 없습니다.
          </p>
          <button
            onClick={handleCreateProject}
            className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white transition-colors bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:from-indigo-400 dark:to-purple-500 dark:hover:from-indigo-500 dark:hover:to-purple-600 dark:focus:ring-offset-gray-800"
          >
            <FaPlus className="mr-2" />첫 프로젝트 만들기
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
