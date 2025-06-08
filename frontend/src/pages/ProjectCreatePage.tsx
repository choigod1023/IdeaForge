import { ProjectForm } from "../components/forms/ProjectForm";
import { ProjectLoading } from "../components/project/layout/ProjectLoading";
import { FormError } from "../components/forms/FormError";
import { useProjectCreate } from "../hooks/useProjectCreate";
import { match } from "ts-pattern";
import { projectPageStyles } from "../styles/projectStyles";
import type { ProjectRequest } from "../types";

export default function ProjectCreatePage() {
  const { pageState, createProject, isPending } = useProjectCreate();

  const handleSubmit = async (data: ProjectRequest) => {
    await createProject(data);
  };

  return (
    <div className={projectPageStyles.container}>
      {match(pageState)
        .with({ status: "loading" }, () => <ProjectLoading />)
        .with({ status: "error" }, ({ error }) => (
          <>
            <FormError message={error.message} />
            <ProjectForm onSubmit={handleSubmit} isLoading={false} />
          </>
        ))
        .with({ status: "ready" }, () => (
          <ProjectForm onSubmit={handleSubmit} isLoading={isPending} />
        ))
        .exhaustive()}
    </div>
  );
}
