import { AnimatePresence } from "framer-motion";
import { match } from "ts-pattern";
import ProjectCard from "./ProjectCard";
import { ProjectListHeader } from "./ProjectListHeader";
import { EmptyProjectList } from "./EmptyProjectList";
import { ProjectListError } from "./ProjectListError";
import { ProjectLoading } from "../layout/ProjectLoading";
import { projectListStyles } from "../../../styles/projectStyles";
import type { Project } from "../../../types";
import type { ListPageState } from "../../../utils/projectList";

interface ProjectListContentProps {
  pageState: ListPageState;
  onCreateClick: () => void;
  onViewProject: (id: string) => void;
  onRemoveProject: (id: string) => void;
  onExportProject: (id: string) => void;
  onRetry: () => void;
}

export const ProjectListContent = ({
  pageState,
  onCreateClick,
  onViewProject,
  onRemoveProject,
  onExportProject,
  onRetry,
}: ProjectListContentProps) => {
  return (
    <div className={projectListStyles.container}>
      {match(pageState)
        .with({ status: "loading" }, () => <ProjectLoading />)
        .with({ status: "error" }, ({ error }) => (
          <ProjectListError message={error.message} onRetry={onRetry} />
        ))
        .with({ status: "success" }, ({ projects }) => (
          <>
            <ProjectListHeader onCreateClick={onCreateClick} />

            <div className={projectListStyles.grid}>
              <AnimatePresence mode="popLayout">
                {projects.map((project: Project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onView={() => onViewProject(project.id)}
                    onRemove={() => onRemoveProject(project.id)}
                    onDownload={() => onExportProject(project.id)}
                  />
                ))}
              </AnimatePresence>
            </div>

            {projects.length === 0 && (
              <EmptyProjectList onCreateClick={onCreateClick} />
            )}
          </>
        ))
        .exhaustive()}
    </div>
  );
};
