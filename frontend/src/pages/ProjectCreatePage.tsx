import { ProjectForm } from "../components/forms/ProjectForm";
import type { ProjectRequest } from "../types";
import { useProjectStore } from "../stores/projectStore";
import { useState } from "react";
import { ProjectLoading } from "../components/project/ProjectLoading";
import { ProjectDisplay } from "../components/project/ProjectDisplay";

export default function ProjectCreatePage() {
  const { project, clearProject, generateProject } = useProjectStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: ProjectRequest) => {
    try {
      setIsLoading(true);
      setError(null);

      // 이전 프로젝트 데이터 초기화
      clearProject();

      // 프로젝트 생성 및 자동으로 projectList에 추가
      const { success, isDuplicate } = await generateProject(data);

      if (!success) {
        throw new Error("프로젝트 생성에 실패했습니다");
      }

      if (isDuplicate) {
        setError("이미 동일한 프로젝트가 존재합니다");
      }

      // 로딩 상태 해제
      setIsLoading(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "프로젝트 생성에 실패했습니다"
      );
      setIsLoading(false);
    }
  };

  // 로딩 중일 때는 로딩 UI 표시
  if (isLoading) {
    return <ProjectLoading />;
  }

  // 프로젝트가 생성되면 프로젝트 표시
  if (project) {
    return (
      <div className="max-w-4xl p-4 mx-auto">
        <ProjectDisplay project={project} />
      </div>
    );
  }

  // 폼 표시
  return (
    <div className="max-w-3xl mx-auto">
      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}
      <ProjectForm onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
}
