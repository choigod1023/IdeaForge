import {
  FaDownload,
  FaTrash,
  FaStar,
  FaCode,
  FaLightbulb,
  FaLaptopCode,
  FaGithub,
  FaTools,
  FaBook,
  FaGraduationCap,
  FaExclamationTriangle,
  FaLightbulb as FaTip,
} from "react-icons/fa";
import { motion } from "framer-motion";
import type { Project } from "../../types";
import { toast } from "react-toastify";

interface ProjectCardProps {
  project: Project;
  onView: (projectId: string) => void;
  onRemove: (projectId: string) => void;
  onDownload: (projectId: string) => void;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "토이":
      return <FaCode className="w-3.5 h-3.5" />;
    case "포트폴리오":
      return <FaLaptopCode className="w-3.5 h-3.5" />;
    case "오픈소스":
      return <FaGithub className="w-3.5 h-3.5" />;
    case "실용":
      return <FaTools className="w-3.5 h-3.5" />;
    default:
      return null;
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case "토이":
      return "토이 프로젝트";
    case "포트폴리오":
      return "포트폴리오 프로젝트";
    case "오픈소스":
      return "오픈소스 프로젝트";
    case "실용":
      return "실용 프로젝트";
    default:
      return type;
  }
};

export default function ProjectCard({
  project,
  onView,
  onRemove,
  onDownload,
}: ProjectCardProps) {
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

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onClick={() => onView(project.id)}
      className="relative p-4 transition-all duration-200 bg-white rounded-2xl shadow cursor-pointer hover:bg-gray-50 hover:shadow-md active:bg-gray-100 active:scale-[0.98] dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600 sm:p-6 group"
    >
      <div className="absolute inset-0 transition-opacity duration-200 rounded-2xl ring-2 ring-transparent group-hover:ring-indigo-500/20 group-active:ring-indigo-500/40 dark:group-hover:ring-indigo-400/20 dark:group-active:ring-indigo-400/40" />
      <div className="relative space-y-4">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-400 sm:text-xl">
              {project.title}
            </h2>
            <p className="text-sm text-gray-600 transition-colors group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300 line-clamp-2 sm:text-base">
              {project.description.summary}
            </p>
          </div>
          <div
            className="flex space-x-1 sm:space-x-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleDownload}
              className="p-1.5 text-green-600 transition-colors rounded-xl hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/30 sm:p-2"
              title="마크다운으로 저장"
            >
              <FaDownload className="w-4 h-4" />
            </button>
            <button
              onClick={handleRemove}
              className="p-1.5 text-red-600 transition-colors rounded-xl hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30 sm:p-2"
              title="프로젝트 삭제"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2 py-0.5 text-xs font-medium text-blue-800 bg-blue-100 rounded-xl transition-colors group-hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:group-hover:bg-blue-900/50">
            {project.difficulty}
          </span>
          {project.projectType.map((type, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-orange-800 bg-orange-100 rounded-xl transition-colors group-hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-200 dark:group-hover:bg-orange-900/50"
            >
              {getTypeIcon(type)}
              {getTypeLabel(type)}
            </span>
          ))}
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

        {/* Key Points Section */}
        {project.description.keyPoints.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
              <FaStar className="w-3.5 h-3.5" />
              <span className="font-medium">주요 특징</span>
            </div>
            <ul className="pl-5 space-y-1 text-xs text-gray-600 list-disc dark:text-gray-400">
              {project.description.keyPoints.slice(0, 2).map((point, index) => (
                <li key={index} className="line-clamp-1">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack Section */}
        {project.techStack.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
              <FaCode className="w-3.5 h-3.5" />
              <span className="font-medium">기술 스택</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {project.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech.name}
                  className="px-2 py-0.5 text-xs font-medium text-gray-800 bg-gray-100 rounded-xl transition-colors group-hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:group-hover:bg-gray-600"
                >
                  {tech.name}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-xl transition-colors group-hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:group-hover:bg-gray-600">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Features Section */}
        {project.features.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
              <FaLightbulb className="w-3.5 h-3.5" />
              <span className="font-medium">주요 기능</span>
            </div>
            <ul className="pl-5 space-y-1 text-xs text-gray-600 list-disc dark:text-gray-400">
              {project.features.slice(0, 2).map((feature, index) => (
                <li key={index} className="line-clamp-1">
                  {typeof feature === "string"
                    ? feature
                    : (feature as { mainTitle: string }).mainTitle}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Additional Info Section */}
        <div className="flex flex-wrap gap-2 pt-2 text-xs text-gray-500 dark:text-gray-400">
          {project.prerequisites.length > 0 && (
            <div className="flex items-center gap-1">
              <FaBook className="w-3.5 h-3.5" />
              <span>사전지식 {project.prerequisites.length}개</span>
            </div>
          )}
          {project.challenges.length > 0 && (
            <div className="flex items-center gap-1">
              <FaExclamationTriangle className="w-3.5 h-3.5" />
              <span>도전과제 {project.challenges.length}개</span>
            </div>
          )}
          {project.tips.length > 0 && (
            <div className="flex items-center gap-1">
              <FaTip className="w-3.5 h-3.5" />
              <span>팁 {project.tips.length}개</span>
            </div>
          )}
          {project.learningPoints && project.learningPoints.length > 0 && (
            <div className="flex items-center gap-1">
              <FaGraduationCap className="w-3.5 h-3.5" />
              <span>학습 포인트 {project.learningPoints.length}개</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
