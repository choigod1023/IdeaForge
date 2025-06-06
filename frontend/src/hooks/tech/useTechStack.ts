import { useState, useCallback } from "react";
import type { TechStackItem } from "../../constants/techStack/types";
import { TECH_COLORS } from "../../constants/techStack/colors";

interface UseTechStackProps {
  initialTechs?: string[];
  onTechsChange?: (techs: string[]) => void;
}

export function useTechStack({
  initialTechs = [],
  onTechsChange,
}: UseTechStackProps = {}) {
  const [selectedTechs, setSelectedTechs] = useState<string[]>(initialTechs);

  const handleTechSelect = useCallback(
    (techs: string[]) => {
      setSelectedTechs(techs);
      onTechsChange?.(techs);
    },
    [onTechsChange]
  );

  const getTechColors = useCallback((techName: string) => {
    return TECH_COLORS[techName] || TECH_COLORS.default;
  }, []);

  const getTechDescription = useCallback((tech: TechStackItem) => {
    if (typeof tech === "string") {
      return ["이 기술에 대한 설명이 준비 중이에요."];
    }
    return tech.descriptions;
  }, []);

  return {
    selectedTechs,
    handleTechSelect,
    getTechColors,
    getTechDescription,
  };
}
