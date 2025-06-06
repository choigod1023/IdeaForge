import type { IconType } from "react-icons";
import type { ProjectType } from "../constants/projectTypes";
import {
  PROJECT_TYPE_DESCRIPTIONS,
  PROJECT_TYPE_ICONS,
} from "../constants/projectTypes";

interface ProjectTypeInfo {
  icon: IconType;
  descriptions: string[];
}

export function getProjectType(type: string): ProjectTypeInfo {
  // 이모지와 특수문자 제거
  const cleaned = type
    .replace(/[\p{Emoji}]/gu, "")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .trim();

  // 전체 타입 문자열과 매칭
  const fullType = Object.keys(PROJECT_TYPE_DESCRIPTIONS).find(
    (key) => key.includes(cleaned) || cleaned.includes(key)
  ) as ProjectType | undefined;

  const matchedType = fullType || "실용 프로젝트";

  return {
    icon: PROJECT_TYPE_ICONS[matchedType],
    descriptions: PROJECT_TYPE_DESCRIPTIONS[matchedType],
  };
}
