import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { ProjectRequest } from "../types";
import { ProjectDisplay } from "../components/ProjectDisplay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import { api } from "../services/api";
import { FaHome } from "react-icons/fa";

export default function ProjectPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData as ProjectRequest;

  const {
    data: project,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["project", formData],
    queryFn: async () => {
      if (!formData) {
        return null;
      }
      return api.generateRecommendation(formData);
    },
    enabled: !!formData,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isSuccess && project) {
      toast.success("프로젝트가 성공적으로 생성되었습니다!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  }, [isSuccess, project]);

  if (!formData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="p-6 text-center bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            프로젝트 정보를 찾을 수 없습니다
          </h2>
          <p className="mb-6 text-gray-600">
            프로젝트 생성 페이지에서 먼저 프로젝트를 생성해주세요.
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaHome className="mr-2" />
            홈으로 이동하기
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-2 text-gray-600">프로젝트를 생성하는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
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
      <ToastContainer position="top-right" autoClose={3000} />
      <ProjectDisplay project={project} />
    </div>
  );
}
