import { useProjects } from "../hooks/useProjects";
import { calculateListPageState } from "../utils/projectUtils";
import { ProjectListContent } from "../components/project/list/ProjectListContent";

export default function ProjectListPage() {
  const {
    projects,
    viewProject,
    navigateToCreate,
    removeProject,
    exportProject,
    isPending,
    error,
  } = useProjects();

  const pageState = calculateListPageState({ isPending, error, projects });

  return (
    <ProjectListContent
      pageState={pageState}
      onCreateClick={navigateToCreate}
      onViewProject={viewProject}
      onRemoveProject={removeProject}
      onExportProject={exportProject}
      onRetry={() => window.location.reload()}
    />
  );
}
