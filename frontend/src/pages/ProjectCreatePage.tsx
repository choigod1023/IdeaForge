import { ProjectForm } from "../components/forms/ProjectForm";
import { ProjectLoading } from "../components/project/ProjectLoading";
import { FormError } from "../components/forms/FormError";
import { useProjectCreate } from "../hooks/useProjectCreate";
import { match } from "ts-pattern";
import { projectPageStyles } from "../styles/projectStyles";

export default function ProjectCreatePage() {
  const { pageState, handleSubmit, isPending } = useProjectCreate();

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
