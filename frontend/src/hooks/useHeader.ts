import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../stores/projectStore";
import { useEffect } from "react";
import { setFavicon } from "../utils/favicon";

export const useHeader = () => {
  const navigate = useNavigate();
  const { clearProject } = useProjectStore();

  useEffect(() => {
    setFavicon();
  }, []);

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
