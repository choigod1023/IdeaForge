import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import type { Project, ProjectRequest } from "../types";
import { api } from "../services/api";
import { useProjectStore } from "../stores/projectStore";

export function useProjects() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { addToProjectList, selectProject } = useProjectStore();
  const [isCreating, setIsCreating] = useState(false);

  // 프로젝트 목록 쿼리
  const {
    data: projects = [],
    isLoading: isProjectsLoading,
    error: projectsError,
  } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: api.getProjects,
    enabled: location.pathname === "/projects",
    staleTime: 1000 * 60, // 1분 동안 캐시 유지
  });

  // 추천 생성 요청 mutation
  const recommendMutation = useMutation({
    mutationFn: api.generateRecommendation,
  });

  // 추천 상태 확인 mutation
  const checkRecommendationMutation = useMutation({
    mutationFn: api.checkRecommendationStatus,
  });

  // 프로젝트 생성 mutation
  const createProjectMutation = useMutation({
    mutationFn: api.createProject,
    onSuccess: (createdProject) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setIsCreating(false);
      if (createdProject?.id) {
        navigate(`/project/${createdProject.id}`);
      }
    },
    onError: () => {
      setIsCreating(false);
    },
  });

  // 통합된 프로젝트 생성 함수
  const createProject = async (data: ProjectRequest): Promise<Project> => {
    setIsCreating(true);
    let pollInterval: NodeJS.Timeout | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const cleanup = () => {
      if (pollInterval) clearInterval(pollInterval);
      if (timeoutId) clearTimeout(timeoutId);
    };

    try {
      // 1. 추천 생성 요청
      const { jobId } = await api.generateRecommendation(data);
      if (!jobId) throw new Error("Job ID를 받지 못했습니다");

      // 2. polling 시작
      return new Promise<Project>((resolve, reject) => {
        pollInterval = setInterval(async () => {
          try {
            const status = await api.checkRecommendationStatus(jobId);

            switch (status.status) {
              case "completed": {
                if (!status.result) {
                  throw new Error("프로젝트 데이터를 받지 못했습니다");
                }
                cleanup();

                // localStorage에 프로젝트 저장
                const addResult = addToProjectList(status.result);
                if (!addResult.success) {
                  throw new Error("이미 존재하는 프로젝트입니다");
                }

                // store에 프로젝트 선택
                selectProject(status.result);
                setIsCreating(false);
                // 프로젝트 생성이 완료되면 ProjectPage로 이동
                navigate("/project");
                resolve(status.result);
                break;
              }

              case "failed": {
                cleanup();
                setIsCreating(false);
                reject(
                  new Error(status.error || "프로젝트 생성에 실패했습니다")
                );
                break;
              }

              case "processing":
                break;
            }
          } catch (error) {
            cleanup();
            setIsCreating(false);
            reject(
              error instanceof Error
                ? error
                : new Error("상태 확인 중 오류가 발생했습니다")
            );
          }
        }, 2000);

        // 5분 타임아웃
        timeoutId = setTimeout(() => {
          cleanup();
          setIsCreating(false);
          reject(new Error("프로젝트 생성 시간이 초과되었습니다"));
        }, 5 * 60 * 1000);
      });
    } catch (error) {
      cleanup();
      setIsCreating(false);
      throw error instanceof Error
        ? error
        : new Error("프로젝트 생성 중 오류가 발생했습니다");
    }
  };

  const removeMutation = useMutation({
    mutationFn: api.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const exportMutation = useMutation({
    mutationFn: async (projectId: string) => {
      const blob = await api.exportProject(projectId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `project-${projectId}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    },
  });

  return {
    projects,
    createProject,
    isPending: isProjectsLoading || isCreating,
    error:
      projectsError ||
      recommendMutation.error ||
      checkRecommendationMutation.error ||
      createProjectMutation.error,
    removeProject: removeMutation.mutate,
    exportProject: exportMutation.mutate,
    viewProject: (projectId: string) => {
      const project = projects.find((p) => p.id === projectId);
      if (project) {
        selectProject(project);
        navigate("/project");
      }
    },
    navigateToCreate: () => navigate("/create"),
  };
}
