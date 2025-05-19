import { FaTools } from "react-icons/fa";

// 기술 스택별 파스텔톤 색상 매핑
const TECH_COLORS: Record<
  string,
  {
    bg: string;
    text: string;
    darkBg: string;
    darkText: string;
    border: string;
    darkBorder: string;
  }
> = {
  // 프론트엔드
  React: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    darkBg: "dark:bg-blue-900/30",
    darkText: "dark:text-blue-300",
    border: "border-blue-200",
    darkBorder: "dark:border-blue-800/50",
  },
  Vue: {
    bg: "bg-green-100",
    text: "text-green-800",
    darkBg: "dark:bg-green-900/30",
    darkText: "dark:text-green-300",
    border: "border-green-200",
    darkBorder: "dark:border-green-800/50",
  },
  Angular: {
    bg: "bg-red-100",
    text: "text-red-800",
    darkBg: "dark:bg-red-900/30",
    darkText: "dark:text-red-300",
    border: "border-red-200",
    darkBorder: "dark:border-red-800/50",
  },
  TypeScript: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    darkBg: "dark:bg-blue-900/30",
    darkText: "dark:text-blue-300",
    border: "border-blue-200",
    darkBorder: "dark:border-blue-800/50",
  },
  JavaScript: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    darkBg: "dark:bg-yellow-900/30",
    darkText: "dark:text-yellow-300",
    border: "border-yellow-200",
    darkBorder: "dark:border-yellow-800/50",
  },
  "HTML/CSS": {
    bg: "bg-orange-100",
    text: "text-orange-800",
    darkBg: "dark:bg-orange-900/30",
    darkText: "dark:text-orange-300",
    border: "border-orange-200",
    darkBorder: "dark:border-orange-800/50",
  },
  "Tailwind CSS": {
    bg: "bg-cyan-100",
    text: "text-cyan-800",
    darkBg: "dark:bg-cyan-900/30",
    darkText: "dark:text-cyan-300",
    border: "border-cyan-200",
    darkBorder: "dark:border-cyan-800/50",
  },
  Redux: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    darkBg: "dark:bg-purple-900/30",
    darkText: "dark:text-purple-300",
    border: "border-purple-200",
    darkBorder: "dark:border-purple-800/50",
  },
  "Next.js": {
    bg: "bg-gray-100",
    text: "text-gray-800",
    darkBg: "dark:bg-gray-800/50",
    darkText: "dark:text-gray-300",
    border: "border-gray-200",
    darkBorder: "dark:border-gray-700/50",
  },
  "Nuxt.js": {
    bg: "bg-green-100",
    text: "text-green-800",
    darkBg: "dark:bg-green-900/30",
    darkText: "dark:text-green-300",
    border: "border-green-200",
    darkBorder: "dark:border-green-800/50",
  },

  // 백엔드
  "Node.js": {
    bg: "bg-green-100",
    text: "text-green-800",
    darkBg: "dark:bg-green-900/30",
    darkText: "dark:text-green-300",
    border: "border-green-200",
    darkBorder: "dark:border-green-800/50",
  },
  Java: {
    bg: "bg-red-100",
    text: "text-red-800",
    darkBg: "dark:bg-red-900/30",
    darkText: "dark:text-red-300",
    border: "border-red-200",
    darkBorder: "dark:border-red-800/50",
  },
  Spring: {
    bg: "bg-green-100",
    text: "text-green-800",
    darkBg: "dark:bg-green-900/30",
    darkText: "dark:text-green-300",
    border: "border-green-200",
    darkBorder: "dark:border-green-800/50",
  },
  Python: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    darkBg: "dark:bg-blue-900/30",
    darkText: "dark:text-blue-300",
    border: "border-blue-200",
    darkBorder: "dark:border-blue-800/50",
  },
  Django: {
    bg: "bg-green-100",
    text: "text-green-800",
    darkBg: "dark:bg-green-900/30",
    darkText: "dark:text-green-300",
    border: "border-green-200",
    darkBorder: "dark:border-green-800/50",
  },
  FastAPI: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    darkBg: "dark:bg-blue-900/30",
    darkText: "dark:text-blue-300",
    border: "border-blue-200",
    darkBorder: "dark:border-blue-800/50",
  },
  PostgreSQL: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    darkBg: "dark:bg-blue-900/30",
    darkText: "dark:text-blue-300",
    border: "border-blue-200",
    darkBorder: "dark:border-blue-800/50",
  },
  MongoDB: {
    bg: "bg-green-100",
    text: "text-green-800",
    darkBg: "dark:bg-green-900/30",
    darkText: "dark:text-green-300",
    border: "border-green-200",
    darkBorder: "dark:border-green-800/50",
  },
  MySQL: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    darkBg: "dark:bg-blue-900/30",
    darkText: "dark:text-blue-300",
    border: "border-blue-200",
    darkBorder: "dark:border-blue-800/50",
  },
  Redis: {
    bg: "bg-red-100",
    text: "text-red-800",
    darkBg: "dark:bg-red-900/30",
    darkText: "dark:text-red-300",
    border: "border-red-200",
    darkBorder: "dark:border-red-800/50",
  },

  // 기본값
  default: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    darkBg: "dark:bg-gray-800/50",
    darkText: "dark:text-gray-300",
    border: "border-gray-200",
    darkBorder: "dark:border-gray-700/50",
  },
};

interface ProjectTechStackProps {
  techStack: string[];
}

export function ProjectTechStack({ techStack }: ProjectTechStackProps) {
  return (
    <div>
      <h3 className="flex items-center mb-4 text-base font-semibold text-gray-900 sm:text-lg md:text-xl dark:text-gray-100">
        <FaTools className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-2.5 text-indigo-500 dark:text-indigo-400" />
        기술 스택
      </h3>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {techStack.map((tech, index) => {
          const { bg, text, darkBg, darkText, border, darkBorder } =
            TECH_COLORS[tech] || TECH_COLORS.default;
          return (
            <span
              key={index}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium ${bg} ${text} ${darkBg} ${darkText} border ${border} ${darkBorder} rounded-xl`}
            >
              {tech}
            </span>
          );
        })}
      </div>
    </div>
  );
}
