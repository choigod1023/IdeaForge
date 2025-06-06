import { useNavigate } from "react-router-dom";
import type { ProjectSection } from "../constants/projectSections";

interface UseProjectNavigationProps {
  currentSection: ProjectSection;
  onSectionChange: (section: ProjectSection) => void;
  onPrev?: () => void;
  sections: ProjectSection[];
}

interface UseProjectNavigationReturn {
  currentIndex: number;
  isFirstSection: boolean;
  isLastSection: boolean;
  prevSection: ProjectSection | null;
  nextSection: ProjectSection | null;
  handlePrev: () => void;
  handleNext: () => void;
}

export const useProjectNavigation = ({
  currentSection,
  onSectionChange,
  onPrev = () => {},
  sections,
}: UseProjectNavigationProps): UseProjectNavigationReturn => {
  const navigate = useNavigate();
  const currentIndex = sections.indexOf(currentSection);
  const isFirstSection = currentIndex === 0;
  const isLastSection = currentIndex === sections.length - 1;

  const prevSection = !isFirstSection ? sections[currentIndex - 1] : null;
  const nextSection = !isLastSection ? sections[currentIndex + 1] : null;

  const handlePrev = () => {
    if (isFirstSection) {
      onPrev();
    } else {
      onSectionChange(sections[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (isLastSection) {
      navigate("/projects");
    } else {
      onSectionChange(sections[currentIndex + 1]);
    }
  };

  return {
    currentIndex,
    isFirstSection,
    isLastSection,
    prevSection,
    nextSection,
    handlePrev,
    handleNext,
  };
};
