import { type Project } from "../types";
import { ProjectCard } from "./project/ProjectCard";

interface ProjectDisplayProps {
  project: Project;
  source?: "create" | "list";
}

export function ProjectDisplay({
  project,
  source = "list",
}: ProjectDisplayProps) {
  return <ProjectCard project={project} source={source} />;
}
