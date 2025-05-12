import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Project, ProjectRequest } from "../types";
import { ProjectDisplay } from "../components/ProjectDisplay";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { api } from "../services/api";
import { FaHome } from "react-icons/fa";
import { useProjectStore } from "../stores/projectStore";

export default function ProjectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const savedProject = location.state?.project as Project | undefined;
  const initialFormData = location.state?.formData as
    | ProjectRequest
    | undefined;

  const {
    project: storeProject,
    generateProject,
    error: storeError,
    isLoading: storeLoading,
  } = useProjectStore();

  // formData가 없고 savedProject도 없는 경우 홈으로 리다이렉트
  useEffect(() => {
    if (!initialFormData && !savedProject && !storeProject) {
      toast.info("프로젝트 생성 페이지에서 먼저 프로젝트를 생성해주세요.");
      navigate("/create");
    }
  }, [initialFormData, savedProject, storeProject, navigate]);

  const {
    data: queryProject,
    isLoading: queryLoading,
    error: queryError,
    isSuccess,
  } = useQuery({
    queryKey: ["project", initialFormData],
    queryFn: async () => {
      if (!initialFormData) return null;
      return api.generateRecommendation(initialFormData);
    },
    enabled: !!initialFormData && !savedProject && !storeProject,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 0, // 캐시 시간을 0으로 설정하여 항상 새로운 데이터를 가져오도록 함
  });

  useEffect(() => {
    if (isSuccess && queryProject && initialFormData) {
      const result = generateProject(initialFormData);
      result.then(({ success }) => {
        if (!success) {
          toast.error(storeError || "프로젝트 생성 중 오류가 발생했습니다.");
          navigate("/create");
        }
      });
    }
  }, [
    isSuccess,
    queryProject,
    initialFormData,
    generateProject,
    storeError,
    navigate,
  ]);

  // 저장된 프로젝트가 있으면 그것을 사용, 그 다음 store의 프로젝트, 마지막으로 query의 프로젝트
  const project = savedProject || storeProject || queryProject;

  if ((storeLoading || queryLoading) && !savedProject) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-2 text-gray-600">프로젝트를 생성하는 중...</p>
        </div>
      </div>
    );
  }

  if ((storeError || queryError) && !savedProject) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="p-6 text-center bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-red-600">
            프로젝트 생성에 실패했습니다
          </h2>
          <p className="mb-6 text-gray-600">잠시 후 다시 시도해주세요.</p>
          <button
            onClick={() => navigate("/create")}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaHome className="mr-2" />
            프로젝트 생성 페이지로 이동
          </button>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <ProjectDisplay project={project} />
    </div>
  );
}
