import type { Project } from "../types";
import {
  FaCode,
  FaBook,
  FaExclamationTriangle,
  FaLightbulb,
  FaTools,
  FaCopy,
  FaArrowLeft,
  FaSave,
  FaDownload,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../stores/projectStore";

interface ProjectDisplayProps {
  project: Project;
}

// 기술 스택별 파스텔톤 색상 매핑
const TECH_COLORS: Record<string, { bg: string; text: string }> = {
  // 프론트엔드
  React: { bg: "bg-blue-100", text: "text-blue-800" },
  Vue: { bg: "bg-green-100", text: "text-green-800" },
  Angular: { bg: "bg-red-100", text: "text-red-800" },
  TypeScript: { bg: "bg-blue-100", text: "text-blue-800" },
  JavaScript: { bg: "bg-yellow-100", text: "text-yellow-800" },
  "HTML/CSS": { bg: "bg-orange-100", text: "text-orange-800" },
  "Tailwind CSS": { bg: "bg-cyan-100", text: "text-cyan-800" },
  Redux: { bg: "bg-purple-100", text: "text-purple-800" },
  "Next.js": { bg: "bg-gray-100", text: "text-gray-800" },
  "Nuxt.js": { bg: "bg-green-100", text: "text-green-800" },

  // 백엔드
  "Node.js": { bg: "bg-green-100", text: "text-green-800" },
  Java: { bg: "bg-red-100", text: "text-red-800" },
  Spring: { bg: "bg-green-100", text: "text-green-800" },
  Python: { bg: "bg-blue-100", text: "text-blue-800" },
  Django: { bg: "bg-green-100", text: "text-green-800" },
  FastAPI: { bg: "bg-blue-100", text: "text-blue-800" },
  PostgreSQL: { bg: "bg-blue-100", text: "text-blue-800" },
  MongoDB: { bg: "bg-green-100", text: "text-green-800" },
  MySQL: { bg: "bg-blue-100", text: "text-blue-800" },
  Redis: { bg: "bg-red-100", text: "text-red-800" },

  // 기본값
  default: { bg: "bg-gray-100", text: "text-gray-800" },
};

export function ProjectDisplay({ project }: ProjectDisplayProps) {
  const navigate = useNavigate();
  const { addToProjectList, exportToMarkdown } = useProjectStore();

  const getTechColor = (tech: string) => {
    return TECH_COLORS[tech] || TECH_COLORS.default;
  };

  const handleSave = () => {
    try {
      const { success, isDuplicate } = addToProjectList(project);
      if (success) {
        if (isDuplicate) {
          toast.warning("이미 동일한 프로젝트가 저장되어 있습니다.");
        } else {
          toast.success("프로젝트가 내 프로젝트 목록에 저장되었습니다!");
        }
      } else {
        toast.error("저장하기에 실패했습니다. 이미 저장되어 있거든요.");
      }
    } catch (error) {
      console.error("저장하기 실패:", error);
      toast.error("저장하기에 실패했습니다.");
    }
  };

  const handleCopy = async () => {
    try {
      // 마크다운 형식으로 프로젝트 데이터 포맷팅
      const markdown = `# ${project.title}

## 프로젝트 정보
- **난이도**: ${project.difficulty}
${project.category ? `- **카테고리**: ${project.category}\n` : ""}${
        project.theme ? `- **테마**: ${project.theme}\n` : ""
      }

## 프로젝트 설명
${project.description}

## 기술 스택
${project.techStack.map((tech) => `- ${tech}`).join("\n")}

## 주요 기능
${project.features.map((feature) => `- ${feature}`).join("\n")}

${
  project.prerequisites && project.prerequisites.length > 0
    ? `## 사전 지식/요구사항
${project.prerequisites
  .map((prerequisite) => `- ${prerequisite}`)
  .join("\n")}\n`
    : ""
}

${
  project.challenges && project.challenges.length > 0
    ? `## 예상되는 도전 과제
${project.challenges.map((challenge) => `- ${challenge}`).join("\n")}\n`
    : ""
}

${
  project.tips && project.tips.length > 0
    ? `## 개발 팁
${project.tips.map((tip) => `- ${tip}`).join("\n")}\n`
    : ""
}

${
  project.resources && project.resources.length > 0
    ? `## 추천 학습 자료
${project.resources.map((resource) => `- ${resource}`).join("\n")}\n`
    : ""
}`;

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
    <div className="p-4 mt-2 bg-white rounded-lg shadow-lg">
      {/* 프로젝트 제목과 메타 정보 */}
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">{project.title}</h2>
          <div className="flex space-x-2">
            <button
              onClick={handleDownload}
              className="p-2 text-blue-600 transition-colors rounded-full hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/30"
              title="마크다운으로 다운로드"
            >
              <FaDownload className="w-4 h-4" />
            </button>
            <button
              onClick={handleSave}
              className="p-2 text-green-600 transition-colors rounded-full hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/30"
              title="프로젝트 저장하기"
            >
              <FaSave className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopy}
              className="p-2 text-gray-600 transition-colors rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              title="프로젝트 데이터 복사하기"
            >
              <FaCopy className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          <span className="px-1.5 py-0.5 text-xs font-medium text-indigo-800 bg-indigo-100 rounded-full">
            {project.difficulty}
          </span>
          {project.category && (
            <span className="px-1.5 py-0.5 text-xs font-medium text-green-800 bg-green-100 rounded-full">
              {project.category}
            </span>
          )}
          {project.theme && (
            <span className="px-1.5 py-0.5 text-xs font-medium text-purple-800 bg-purple-100 rounded-full">
              {project.theme}
            </span>
          )}
        </div>
      </div>

      {/* 프로젝트 설명 */}
      <div className="mb-3">
        <h3 className="flex items-center mb-2 text-sm font-semibold text-gray-900">
          <FaCode className="mr-1 text-indigo-600" />
          프로젝트 설명
        </h3>
        <p className="px-2 py-1.5 text-xs text-gray-600 whitespace-pre-line bg-gray-50 rounded">
          {project.description}
        </p>
      </div>

      {/* 기술 스택 */}
      {project.techStack && project.techStack.length > 0 && (
        <div className="mb-3">
          <h3 className="flex items-center mb-2 text-sm font-semibold text-gray-900">
            <FaTools className="mr-1 text-indigo-600" />
            기술 스택
          </h3>
          <div className="flex flex-wrap gap-1">
            {project.techStack.map((tech) => {
              const { bg, text } = getTechColor(tech);
              return (
                <span
                  key={tech}
                  className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${bg} ${text}`}
                >
                  {tech}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* 주요 기능 */}
      {project.features && project.features.length > 0 && (
        <div className="mb-3">
          <h3 className="flex items-center mb-2 text-sm font-semibold text-gray-900">
            <FaCode className="mr-1 text-indigo-600" />
            주요 기능
          </h3>
          <ul className="pl-3 space-y-0.5 text-xs text-gray-600 list-disc">
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 사전 지식/요구사항 */}
      {project.prerequisites && project.prerequisites.length > 0 && (
        <div className="mb-3">
          <h3 className="flex items-center mb-2 text-sm font-semibold text-gray-900">
            <FaBook className="mr-1 text-indigo-600" />
            사전 지식/요구사항
          </h3>
          <ul className="pl-3 space-y-0.5 text-xs text-gray-600 list-disc">
            {project.prerequisites.map((prerequisite, index) => (
              <li key={index}>{prerequisite}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 예상되는 도전 과제 */}
      {project.challenges && project.challenges.length > 0 && (
        <div className="mb-3">
          <h3 className="flex items-center mb-2 text-sm font-semibold text-gray-900">
            <FaExclamationTriangle className="mr-1 text-indigo-600" />
            예상되는 도전 과제
          </h3>
          <ul className="pl-3 space-y-0.5 text-xs text-gray-600 list-disc">
            {project.challenges.map((challenge, index) => (
              <li key={index}>{challenge}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 개발 팁 */}
      {project.tips && project.tips.length > 0 && (
        <div className="mb-3">
          <h3 className="flex items-center mb-2 text-sm font-semibold text-gray-900">
            <FaLightbulb className="mr-1 text-indigo-600" />
            개발 팁
          </h3>
          <ul className="pl-3 space-y-0.5 text-xs text-gray-600 list-disc">
            {project.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 추천 학습 자료 */}
      {project.resources && project.resources.length > 0 && (
        <div>
          <h3 className="flex items-center mb-2 text-sm font-semibold text-gray-900">
            <FaBook className="mr-1 text-indigo-600" />
            추천 학습 자료
          </h3>
          <ul className="pl-3 space-y-0.5 text-xs text-gray-600 list-disc">
            {project.resources.map((resource, index) => {
              // URL 패턴 매칭
              const urlPattern = /(https?:\/\/[^\s]+)/g;
              const parts = resource.split(urlPattern);

              return (
                <li key={index} className="flex items-center gap-1">
                  {parts.map((part, i) => {
                    if (part.match(urlPattern)) {
                      return (
                        <a
                          key={i}
                          href={part}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {part}
                          <span className="ml-1 text-[10px]">↗</span>
                        </a>
                      );
                    }
                    return <span key={i}>{part}</span>;
                  })}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* 뒤로가기 버튼 */}
      <div className="flex justify-center pt-6 mt-8 border-t border-gray-100">
        <button
          onClick={() => navigate("/create")}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          title="프로젝트 생성 페이지로 돌아가기"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>프로젝트 생성으로 돌아가기</span>
        </button>
      </div>
    </div>
  );
}
