import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../stores/projectStore";

export const useProjectPage = () => {
  const navigate = useNavigate();
  const { project } = useProjectStore();

  const handlePrev = () => {
    navigate(-1);
  };

  // 프로젝트가 없으면 프로젝트 목록으로 리다이렉트
  if (!project) {
    navigate("/projects");
    return { project: null };
  }

  return {
    project,
    handlePrev,
  };
};
