import { useState, useCallback } from "react";
import { getTechColors, getTechDescription } from "../utils/techStack";

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

  return {
    selectedTechs,
    handleTechSelect,
    getTechColors,
    getTechDescription,
  };
}
