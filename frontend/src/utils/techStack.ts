import type { TechStackItem } from "../styles/techStack/types";
import { TECH_COLORS } from "../styles/techStack/colors";

export const getTechColors = (techName: string) => {
  return TECH_COLORS[techName] || TECH_COLORS.default;
};

export const getTechDescription = (tech: TechStackItem) => {
  if (typeof tech === "string") {
    return ["이 기술에 대한 설명이 준비 중이에요."];
  }
  return tech.descriptions;
};
