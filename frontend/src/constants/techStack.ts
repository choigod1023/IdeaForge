export interface PopularTechStack {
  category: string;
  techs: string[];
  description: string;
}

export interface TechStackCategory {
  name: string;
  stacks: PopularTechStack[];
}

export type TechStackItem = string | { name: string; descriptions: string[] };

export interface TechColors {
  bg: string;
  text: string;
  darkBg: string;
  darkText: string;
  border: string;
  darkBorder: string;
}

export const TECH_COLORS: Record<string, TechColors> = {
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
