import { motion } from "framer-motion";
import type { Project } from "../../../types";
import type { ProjectSection } from "../../../constants/projectSections";
import { ProjectDescription } from "../feature/ProjectDescription";
import { ProjectType } from "../type/ProjectType";
import { ProjectTechStack } from "../tech/ProjectTechStack";
import { ProjectFeatures } from "../feature/ProjectFeatures";
import { ProjectResources } from "../feature/ProjectResources";
import { ProjectPrerequisites } from "../feature/ProjectPrerequisites";
import { ProjectChallenges } from "../feature/ProjectChallenges";
import { ProjectTips } from "../feature/ProjectTips";

interface ProjectSectionContentProps {
  project: Project;
  currentSection: ProjectSection;
}

export function ProjectSectionContent({
  project,
  currentSection,
}: ProjectSectionContentProps) {
  return (
    <motion.div
      key={currentSection}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {currentSection === "overview" && (
        <ProjectDescription description={project.description} />
      )}
      {currentSection === "type" &&
        project.projectType.map((type, idx) => (
          <ProjectType key={idx} type={type} />
        ))}
      {currentSection === "techStack" && project.techStack?.length > 0 && (
        <ProjectTechStack techStack={project.techStack} />
      )}
      {currentSection === "features" && (
        <ProjectFeatures features={project.features} />
      )}
      {currentSection === "resources" && (
        <div className="relative">
          <ProjectResources resources={project.resources} />
        </div>
      )}
      {currentSection === "prerequisites" &&
        project.prerequisites?.length > 0 && (
          <ProjectPrerequisites prerequisites={project.prerequisites} />
        )}
      {currentSection === "challenges" && project.challenges?.length > 0 && (
        <ProjectChallenges challenges={project.challenges} />
      )}
      {currentSection === "tips" && project.tips?.length > 0 && (
        <ProjectTips tips={project.tips} />
      )}
    </motion.div>
  );
}
