import { useNavigate } from "react-router-dom";
import { ProjectForm } from "../components/ProjectForm";
import type { ProjectRequest } from "../types";
import { PopularTechBanner } from "../components/PopularTechBanner";
import { useState } from "react";
import { TechStackSelector } from "../components/forms/TechStackSelector";

export default function ProjectCreatePage() {
  const navigate = useNavigate();
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const onSubmit = async (data: ProjectRequest) => {
    navigate("/project", { state: { formData: data } });
  };

  const handleTechSelect = (techs: string[]) => {
    setSelectedTechs(techs);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <ProjectForm onSubmit={onSubmit} />
    </div>
  );
}
