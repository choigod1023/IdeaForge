import { FaTools } from "react-icons/fa";
import {
  FaReact,
  FaVuejs,
  FaAngular,
  FaNodeJs,
  FaJava,
  FaPython,
} from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiRedux,
  SiNextdotjs,
  SiNuxtdotjs,
  SiSpring,
  SiDjango,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiRedis,
} from "react-icons/si";

const TECH_ICONS: Record<string, React.ReactNode> = {
  React: <FaReact className="w-6 h-6" />,
  Vue: <FaVuejs className="w-6 h-6" />,
  Angular: <FaAngular className="w-6 h-6" />,
  TypeScript: <SiTypescript className="w-6 h-6" />,
  JavaScript: <SiJavascript className="w-6 h-6" />,
  "HTML/CSS": (
    <div className="flex gap-1">
      <SiHtml5 className="w-6 h-6" />
      <SiCss3 className="w-6 h-6" />
    </div>
  ),
  "Tailwind CSS": <SiTailwindcss className="w-6 h-6" />,
  Redux: <SiRedux className="w-6 h-6" />,
  "Next.js": <SiNextdotjs className="w-6 h-6" />,
  "Nuxt.js": <SiNuxtdotjs className="w-6 h-6" />,
  "Node.js": <FaNodeJs className="w-6 h-6" />,
  Java: <FaJava className="w-6 h-6" />,
  Spring: <SiSpring className="w-6 h-6" />,
  Python: <FaPython className="w-6 h-6" />,
  Django: <SiDjango className="w-6 h-6" />,
  FastAPI: <SiFastapi className="w-6 h-6" />,
  PostgreSQL: <SiPostgresql className="w-6 h-6" />,
  MongoDB: <SiMongodb className="w-6 h-6" />,
  MySQL: <SiMysql className="w-6 h-6" />,
  Redis: <SiRedis className="w-6 h-6" />,
};

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
    darkBg: "dark:bg-blue-400/30",
    darkText: "dark:text-blue-300",
    border: "border-blue-200",
    darkBorder: "dark:border-blue-800/50",
  },
  Vue: {
    bg: "bg-green-100",
    text: "text-green-800",
    darkBg: "dark:bg-green-400/30",
    darkText: "dark:text-green-300",
    border: "border-green-200",
    darkBorder: "dark:border-green-800/50",
  },
  Angular: {
    bg: "bg-red-100",
    text: "text-red-800",
    darkBg: "dark:bg-red-400/30",
    darkText: "dark:text-red-300",
    border: "border-red-200",
    darkBorder: "dark:border-red-800/50",
  },
  TypeScript: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    darkBg: "dark:bg-blue-400/30",
    darkText: "dark:text-blue-300",
    border: "border-blue-200",
    darkBorder: "dark:border-blue-800/50",
  },
  JavaScript: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    darkBg: "dark:bg-yellow-400/30",
    darkText: "dark:text-yellow-300",
    border: "border-yellow-200",
    darkBorder: "dark:border-yellow-800/50",
  },
  "HTML/CSS": {
    bg: "bg-orange-100",
    text: "text-orange-800",
    darkBg: "dark:bg-orange-400/30",
    darkText: "dark:text-orange-300",
    border: "border-orange-200",
    darkBorder: "dark:border-orange-800/50",
  },
  "Tailwind CSS": {
    bg: "bg-cyan-100",
    text: "text-cyan-800",
    darkBg: "dark:bg-cyan-400/30",
    darkText: "dark:text-cyan-300",
    border: "border-cyan-200",
    darkBorder: "dark:border-cyan-800/50",
  },
  Redux: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    darkBg: "dark:bg-purple-400/30",
    darkText: "dark:text-purple-300",
    border: "border-purple-200",
    darkBorder: "dark:border-purple-800/50",
  },
  "Next.js": {
    bg: "bg-gray-100",
    text: "text-gray-800",
    darkBg: "dark:bg-gray-400/30",
    darkText: "dark:text-gray-300",
    border: "border-gray-200",
    darkBorder: "dark:border-gray-700/50",
  },
  "Nuxt.js": {
    bg: "bg-green-100",
    text: "text-green-800",
    darkBg: "dark:bg-green-400/30",
    darkText: "dark:text-green-300",
    border: "border-green-200",
    darkBorder: "dark:border-green-800/50",
  },

  // 백엔드
  "Node.js": {
    bg: "bg-green-100",
    text: "text-green-800",
    darkBg: "dark:bg-green-400/30",
    darkText: "dark:text-green-300",
    border: "border-green-200",
    darkBorder: "dark:border-green-800/50",
  },
  Java: {
    bg: "bg-red-100",
    text: "text-red-800",
    darkBg: "dark:bg-red-400/30",
    darkText: "dark:text-red-300",
    border: "border-red-200",
    darkBorder: "dark:border-red-800/50",
  },
  Spring: {
    bg: "bg-green-100",
    text: "text-green-800",
    darkBg: "dark:bg-green-400/30",
    darkText: "dark:text-green-300",
    border: "border-green-200",
    darkBorder: "dark:border-green-800/50",
  },
  Python: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    darkBg: "dark:bg-blue-400/30",
    darkText: "dark:text-blue-300",
    border: "border-blue-200",
    darkBorder: "dark:border-blue-800/50",
  },
  Django: {
    bg: "bg-green-100",
    text: "text-green-800",
    darkBg: "dark:bg-green-400/30",
    darkText: "dark:text-green-300",
    border: "border-green-200",
    darkBorder: "dark:border-green-800/50",
  },
  FastAPI: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    darkBg: "dark:bg-blue-400/30",
    darkText: "dark:text-blue-300",
    border: "border-blue-200",
    darkBorder: "dark:border-blue-800/50",
  },
  PostgreSQL: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    darkBg: "dark:bg-blue-400/30",
    darkText: "dark:text-blue-300",
    border: "border-blue-200",
    darkBorder: "dark:border-blue-800/50",
  },
  MongoDB: {
    bg: "bg-green-100",
    text: "text-green-800",
    darkBg: "dark:bg-green-400/30",
    darkText: "dark:text-green-300",
    border: "border-green-200",
    darkBorder: "dark:border-green-800/50",
  },
  MySQL: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    darkBg: "dark:bg-blue-400/30",
    darkText: "dark:text-blue-300",
    border: "border-blue-200",
    darkBorder: "dark:border-blue-800/50",
  },
  Redis: {
    bg: "bg-red-100",
    text: "text-red-800",
    darkBg: "dark:bg-red-400/30",
    darkText: "dark:text-red-300",
    border: "border-red-200",
    darkBorder: "dark:border-red-800/50",
  },

  // 기본값
  default: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    darkBg: "dark:bg-gray-400/30",
    darkText: "dark:text-gray-300",
    border: "border-gray-200",
    darkBorder: "dark:border-gray-700/50",
  },
};

interface ProjectTechStackProps {
  techStack: Array<string | { name: string; descriptions: string[] }>;
}

export function ProjectTechStack({ techStack }: ProjectTechStackProps) {
  return (
    <div className="space-y-6">
      <h3 className="flex items-center text-lg font-semibold text-gray-900 sm:text-xl md:text-2xl dark:text-white">
        <FaTools className="w-5 h-5 mr-3 text-indigo-500 sm:w-6 sm:h-6 dark:text-indigo-300" />
        기술 스택
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        {techStack.map((tech) => {
          // 이전 형식(string)과 새로운 형식(object) 모두 처리
          const techName = typeof tech === "string" ? tech : tech.name;
          const descriptions =
            typeof tech === "string"
              ? ["이 기술에 대한 설명이 준비 중이에요."]
              : tech.descriptions;

          const colors = TECH_COLORS[techName] || TECH_COLORS.default;
          const Icon = TECH_ICONS[techName];

          return (
            <div
              key={techName}
              className="relative overflow-hidden bg-white border border-gray-200 rounded-2xl dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={colors.text}>{Icon}</div>
                  <h4
                    className={`text-lg font-medium ${colors.text} ${colors.darkText}`}
                  >
                    {techName}
                  </h4>
                </div>
                <ul className="space-y-2">
                  {descriptions.map((desc, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-sm text-gray-600 dark:text-gray-200"
                    >
                      <span
                        className={`flex-shrink-0 w-1.5 h-1.5 mt-1.5 mr-2 rounded-full ${colors.bg} dark:bg-opacity-100 ${colors.darkBg}`}
                      />
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
