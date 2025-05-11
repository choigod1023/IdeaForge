import { useNavigate } from "react-router-dom";
import { ProjectForm } from "../components/ProjectForm";
import type { ProjectRequest } from "../types";

export default function ProjectCreatePage() {
  const navigate = useNavigate();
  const onSubmit = async (data: ProjectRequest) => {
    navigate("/project", { state: { formData: data } });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <ProjectForm onSubmit={onSubmit} />
    </div>
  );
}
