import { FaLaptopCode, FaCode, FaGithub, FaTools } from "react-icons/fa";

interface ProjectTypeProps {
  types: string[];
}

export function ProjectType({ types }: ProjectTypeProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "토이":
        return <FaCode className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "포트폴리오":
        return <FaLaptopCode className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "오픈소스":
        return <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "실용":
        return <FaTools className="w-4 h-4 sm:w-5 sm:h-5" />;
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

  return (
    <div>
      <h3 className="flex items-center mb-4 text-base font-semibold text-gray-900 sm:text-lg md:text-xl dark:text-gray-100">
        <FaCode className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-2.5 text-indigo-500 dark:text-indigo-400" />
        프로젝트 유형
      </h3>
      <div className="flex flex-wrap gap-2">
        {types.map((type, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg dark:bg-indigo-900/30 dark:text-indigo-400"
          >
            {getTypeIcon(type)}
            <span>{getTypeLabel(type)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
