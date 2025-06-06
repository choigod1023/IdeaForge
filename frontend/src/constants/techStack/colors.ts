import type { TechColors } from "./types";

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
  // ... rest of the colors

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
