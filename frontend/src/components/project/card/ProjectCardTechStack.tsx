import { FaCode } from "react-icons/fa";
import { projectCardStyles } from "../../../styles/projectCardStyles";
import type { Project } from "../../../types";

interface ProjectCardTechStackProps {
  techStack: Project["techStack"];
}

export const ProjectCardTechStack = ({
  techStack,
}: ProjectCardTechStackProps) => {
  if (techStack.length === 0) return null;

  return (
    <div className={projectCardStyles.section.container}>
      <div className={projectCardStyles.section.header}>
        <FaCode className="w-3.5 h-3.5" />
        <span className={projectCardStyles.section.title}>기술 스택</span>
      </div>
      <div className={projectCardStyles.section.techStack.container}>
        {techStack.slice(0, 3).map((tech) => (
          <span
            key={tech.name}
            className={projectCardStyles.section.techStack.item}
          >
            {tech.name}
          </span>
        ))}
        {techStack.length > 3 && (
          <span className={projectCardStyles.section.techStack.more}>
            +{techStack.length - 3}
          </span>
        )}
      </div>
    </div>
  );
};
