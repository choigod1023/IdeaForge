import type { Project, ProjectSection } from "../types";

const ALL_SECTIONS = [
  "overview",
  "type",
  "techStack",
  "features",
  "resources",
  "prerequisites",
  "challenges",
  "tips",
] as const;

type Section = (typeof ALL_SECTIONS)[number];

export const filterProjectSections = (project: Project): ProjectSection[] => {
  return ALL_SECTIONS.filter((section): section is Section => {
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
};
