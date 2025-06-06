import { useState, useEffect } from "react";
import type { Project, ProjectSection } from "../types";

export const useProjectSections = (project: Project) => {
  const [currentSection, setCurrentSection] =
    useState<ProjectSection>("overview");

  // 프로젝트가 변경될 때마다 overview 섹션으로 초기화
  useEffect(() => {
    setCurrentSection("overview");
  }, [project.id]);

  const allSections = [
    "overview",
    "type",
    "techStack",
    "features",
    "resources",
    "prerequisites",
    "challenges",
    "tips",
  ] as const;

  type Section = (typeof allSections)[number];

  const sections = allSections.filter((section): section is Section => {
    switch (section) {
      case "techStack":
        return project.techStack && project.techStack.length > 0;
      case "prerequisites":
        return project.prerequisites?.length > 0;
      case "challenges":
        return project.challenges?.length > 0;
      case "tips":
        return project.tips?.length > 0;
      default:
        return true;
    }
  });

  return {
    currentSection,
    setCurrentSection,
    sections,
  };
};
