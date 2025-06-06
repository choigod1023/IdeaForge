import { AnimatePresence } from "framer-motion";
import ProjectCard from "../components/project/ProjectCard";
import { ProjectLoading } from "../components/project/ProjectLoading";
import { ProjectListHeader } from "../components/project/ProjectListHeader";
import { EmptyProjectList } from "../components/project/EmptyProjectList";
import { ProjectListError } from "../components/project/ProjectListError";
import { useProjectList } from "../hooks/useProjectList";
import { match } from "ts-pattern";
import { projectPageStyles } from "../styles/projectStyles";
import { toast } from "react-toastify";

export default function ProjectListPage() {
  const {
    pageState,
    viewProject,
    navigateToCreate,
    removeProject,
    exportProject,
  } = useProjectList();

  return (
    <div className={projectPageStyles.list.container}>
      {match(pageState)
        .with({ status: "loading" }, () => <ProjectLoading />)
        .with({ status: "error" }, ({ error }) => {
          toast.error(error.message);
          return (
            <ProjectListError
              message={error.message}
              onRetry={() => window.location.reload()}
            />
          );
        })
        .with({ status: "success" }, ({ projects }) => (
          <>
            <ProjectListHeader onCreateClick={navigateToCreate} />

            <div className={projectPageStyles.list.grid}>
              <AnimatePresence mode="popLayout">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onView={() => viewProject(project.id)}
                    onRemove={() => removeProject(project.id)}
                    onDownload={() => exportProject(project.id)}
                  />
                ))}
              </AnimatePresence>
            </div>

            {projects.length === 0 && (
              <EmptyProjectList onCreateClick={navigateToCreate} />
            )}
          </>
        ))
        .exhaustive()}
    </div>
  );
}
