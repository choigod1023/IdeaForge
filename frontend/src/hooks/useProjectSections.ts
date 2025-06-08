import { useState, useEffect } from "react";
import type { Project, ProjectSection } from "../types";
import { filterProjectSections } from "../utils/projectSections";

export const useProjectSections = (project: Project) => {
  const [currentSection, setCurrentSection] =
    useState<ProjectSection>("overview");

  // 프로젝트가 변경될 때마다 overview 섹션으로 초기화
  useEffect(() => {
    setCurrentSection("overview");
  }, [project.id]);

  const sections = filterProjectSections(project);

  return {
    currentSection,
    setCurrentSection,
    sections,
  };
};
