import { motion } from "framer-motion";
import { projectCardStyles } from "../../../styles/projectCardStyles";
import type { Project } from "../../../types";
import { createProjectCardHandlers } from "../../../utils/projectCard";
import { ProjectCardHeader } from "../card/ProjectCardHeader";
import { ProjectCardTags } from "../card/ProjectCardTags";
import { ProjectCardTechStack } from "../card/ProjectCardTechStack";
import { ProjectCardFooter } from "../card/ProjectCardFooter";

interface ProjectCardProps {
  project: Project;
  onView: (projectId: string) => void;
  onRemove: (projectId: string) => void;
  onDownload: (projectId: string) => void;
}

export default function ProjectCard({
  project,
  onView,
  onRemove,
  onDownload,
}: ProjectCardProps) {
  const { handleRemove, handleDownload } = createProjectCardHandlers(project, {
    onRemove,
    onDownload,
  });

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onClick={() => onView(project.id)}
      className={projectCardStyles.container}
    >
      <div className={projectCardStyles.ring} />
      <div className={projectCardStyles.content}>
        <ProjectCardHeader
          project={project}
          onDownload={handleDownload}
          onRemove={handleRemove}
        />
        <ProjectCardTags project={project} />
        <ProjectCardTechStack techStack={project.techStack} />
        <ProjectCardFooter project={project} />
      </div>
    </motion.div>
  );
}
