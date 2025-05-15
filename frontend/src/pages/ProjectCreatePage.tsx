import { useNavigate } from "react-router-dom";
import { ProjectForm } from "../components/forms/ProjectForm";
import type { ProjectRequest } from "../types";
import { useProjectStore } from "../stores/projectStore";

export default function ProjectCreatePage() {
  const navigate = useNavigate();
  const { clearProject } = useProjectStore();

  const onSubmit = async (data: ProjectRequest) => {
    // 이전 프로젝트 데이터 초기화
    clearProject();
    // 새로운 폼 데이터로 이동
    navigate("/project", {
      state: { formData: data },
      replace: true, // 브라우저 히스토리에 현재 페이지를 대체
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <ProjectForm onSubmit={onSubmit} />
    </div>
  );
}
