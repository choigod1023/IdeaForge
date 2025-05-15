import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProjectDisplay } from "../components/ProjectDisplay";
import { useProjectStore } from "../stores/projectStore";
import type { Project, ProjectRequest } from "../types";
import { FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ProjectLoading } from "../components/ProjectLoading";

export default function ProjectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const savedProject = location.state?.project as Project | undefined;
  const initialFormData = location.state?.formData as
    | ProjectRequest
    | undefined;
  const [isLoading, setIsLoading] = useState(false);

  const {
    project: storeProject,
    generateProject,
    error: storeError,
    isLoading: storeLoading,
  } = useProjectStore();

  // useQuery를 사용하여 프로젝트 데이터 가져오기
  const {
    data: queryProject,
    isLoading: queryLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["project", initialFormData],
    queryFn: async () => {
      if (!initialFormData) return null;
      const result = await generateProject(initialFormData);
      if (!result.success) {
        throw new Error(storeError || "프로젝트 생성에 실패했습니다.");
      }
      return storeProject;
    },
    enabled: !!initialFormData && !savedProject && !storeProject,
    retry: 1,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 5,
  });

  // 로딩 상태 통합 관리
  useEffect(() => {
    const loading = (storeLoading || queryLoading) && !savedProject;
    if (loading !== isLoading) {
      setIsLoading(loading);
    }
  }, [storeLoading, queryLoading, savedProject, isLoading]);

  // formData가 없고 savedProject도 없는 경우 홈으로 리다이렉트
  useEffect(() => {
    if (!initialFormData && !savedProject && !storeProject && !queryProject) {
      toast.info("프로젝트 생성 페이지에서 먼저 프로젝트를 생성해주세요.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/create");
    }
  }, [initialFormData, savedProject, storeProject, queryProject, navigate]);

  // 저장된 프로젝트가 있으면 그것을 사용, 그 다음 store의 프로젝트, 마지막으로 query의 프로젝트
  const project = savedProject || storeProject || queryProject;

  // 에러 처리
  useEffect(() => {
    if (queryError) {
      toast.error("프로젝트 생성에 실패했습니다. 잠시 후 다시 시도해주세요.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/create");
    }
  }, [queryError, navigate]);

  if (isLoading) {
    return <ProjectLoading />;
  }

  if (storeError && !savedProject) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        role="alert"
        aria-live="assertive"
      >
        <div className="w-full max-w-md p-6 text-center bg-white shadow-lg rounded-xl dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <h2 className="mb-4 text-xl font-bold text-red-600 sm:text-2xl dark:text-red-400">
            프로젝트 생성에 실패했습니다
          </h2>
          <p className="mb-6 text-base text-gray-700 sm:text-lg dark:text-gray-200">
            잠시 후 다시 시도해주세요.
          </p>
          <button
            onClick={() => navigate("/create")}
            className="inline-flex items-center px-5 py-2.5 text-base sm:text-lg font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800 dark:shadow-indigo-500/20 dark:text-gray-100"
          >
            <FaHome className="w-5 h-5 mr-2 sm:w-6 sm:h-6" />
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl p-4 mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100"
    >
      <ProjectDisplay
        project={project}
        source={initialFormData ? "create" : "list"}
      />
    </motion.div>
  );
}
