import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../stores/projectStore";

export const useNavigation = () => {
  const navigate = useNavigate();
  const { clearProject } = useProjectStore();

  const handleCreateProject = () => {
    clearProject();
    navigate("/create");
  };

  const handleViewProjects = () => {
    navigate("/projects");
  };

  return {
    handleCreateProject,
    handleViewProjects,
  };
};
