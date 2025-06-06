import { ProjectDisplay } from "../components/project/ProjectDisplay";
import { useSharedProject } from "../hooks/useSharedProject";

export default function SharedProjectPage() {
  const { data: project } = useSharedProject();

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <ProjectDisplay project={project!} />
    </div>
  );
}
