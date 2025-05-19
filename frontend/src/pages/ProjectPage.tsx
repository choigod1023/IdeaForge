import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useProjectStore } from "../stores/projectStore";
import { ProjectDisplay } from "../components/project/ProjectDisplay";
import { ProjectLoading } from "../components/project/ProjectLoading";

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { clearProject, isLoading, getProject } = useProjectStore();

  useEffect(() => {
    if (!id) {
      navigate("/projects", { replace: true });
      return;
    }

    const foundProject = getProject(id);
    if (!foundProject && !isLoading) {
      navigate("/projects", { replace: true });
      return;
    }

    // 컴포넌트 언마운트 시 프로젝트 데이터 초기화
    return () => {
      clearProject();
    };
  }, [id, navigate, clearProject, isLoading, getProject]);

  // 로딩 중일 때는 로딩 UI 표시
  if (isLoading) {
    return <ProjectLoading />;
  }

  const foundProject = id ? getProject(id) : null;
  if (!foundProject) {
    return null;
  }

  // 로딩이 완료되고 프로젝트가 있으면 프로젝트 표시
  return (
    <div className="max-w-4xl p-4 mx-auto">
      <ProjectDisplay project={foundProject} />
    </div>
  );
}
