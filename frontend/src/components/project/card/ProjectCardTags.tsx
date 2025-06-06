import { projectCardStyles } from "../../../styles/projectCardStyles";
import { ProjectTypeIcon } from "../ProjectTypeIcon";
import { getTypeLabel } from "../../../utils/projectUtils";
import type { Project } from "../../../types";

interface ProjectCardTagsProps {
  project: Project;
}

export const ProjectCardTags = ({ project }: ProjectCardTagsProps) => (
  <div className={projectCardStyles.tags.container}>
    <span className={projectCardStyles.tags.difficulty}>
      {project.difficulty}
    </span>
    {project.projectType.map((type, index) => (
      <span key={index} className={projectCardStyles.tags.type}>
        <ProjectTypeIcon type={type} />
        {getTypeLabel(type)}
      </span>
    ))}
    {project.category && (
      <span className={projectCardStyles.tags.category}>
        {project.category}
      </span>
    )}
    {project.theme && (
      <span className={projectCardStyles.tags.theme}>{project.theme}</span>
    )}
  </div>
);
