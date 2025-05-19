import { useSearchParams, useNavigate } from "react-router-dom";
import { ProjectDisplay } from "../components/project/ProjectDisplay";
import type { Project } from "../types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SharedProjectPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const projectData = searchParams.get("data");
    if (!projectData) {
      toast.error("유효하지 않은 프로젝트 링크입니다.");
      navigate("/");
      return;
    }

    try {
      const decodedData = decodeURIComponent(projectData);
      const parsedProject = JSON.parse(decodedData) as Project;
      setProject(parsedProject);
    } catch (error) {
      console.error("프로젝트 데이터 파싱 실패:", error);
      toast.error("프로젝트 데이터를 불러오는데 실패했습니다.");
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  }, [searchParams, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-2 text-gray-600">프로젝트를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <ProjectDisplay project={project} />
    </div>
  );
}
