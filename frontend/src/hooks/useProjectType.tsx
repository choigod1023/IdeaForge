import { useMemo } from "react";
import type { ProjectType } from "../constants/projectTypes";
import {
  PROJECT_TYPE_DESCRIPTIONS,
  PROJECT_TYPE_ICONS,
} from "../constants/projectTypes";

export function useProjectType(type: string) {
  const cleanType = useMemo(() => {
    console.log("Original type:", type);
    // 이모지와 특수문자 제거, 순수 타입 텍스트만 추출
    const cleaned = type
      .replace(/[\p{Emoji}]/gu, "") // 이모지 제거
      .replace(/[^\p{L}\p{N}\s]/gu, "") // 특수문자 제거
      .trim();
    console.log("Cleaned type:", cleaned);

    // 전체 타입 문자열과 매칭
    const availableTypes = Object.keys(PROJECT_TYPE_DESCRIPTIONS);
    console.log("Available types:", availableTypes);

    const fullType = availableTypes.find((key) => {
      const matches = key.includes(cleaned) || cleaned.includes(key);
      console.log(`Comparing "${key}" with "${cleaned}":`, matches);
      return matches;
    }) as ProjectType | undefined;
    console.log("Matched type:", fullType);

    return fullType || "실용 프로젝트"; // 기본값 설정
  }, [type]);

  const icon = useMemo(() => PROJECT_TYPE_ICONS[cleanType], [cleanType]);
  const descriptions = useMemo(
    () => PROJECT_TYPE_DESCRIPTIONS[cleanType],
    [cleanType]
  );

  return {
    type: cleanType,
    icon,
    descriptions,
  };
}
