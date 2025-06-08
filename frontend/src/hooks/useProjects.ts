import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Project, ProjectRequest } from "../types";
import { api } from "../services/api";
import { useProjectStore } from "../stores/projectStore";
import { createProjectWithPolling } from "../utils/projectCreation";

export function useProjects() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    projectList: projects,
    addToProjectList,
    selectProject,
  } = useProjectStore();
  const [isCreating, setIsCreating] = useState(false);

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
    try {
      const project = await createProjectWithPolling(data, {
        onSuccess: (result) => {
          // localStorage에 프로젝트 저장
          const addResult = addToProjectList(result);
          if (!addResult.success) {
            throw new Error("이미 존재하는 프로젝트입니다");
          }

          // store에 프로젝트 선택
          selectProject(result);
          setIsCreating(false);
          // 프로젝트 생성이 완료되면 ProjectPage로 이동
          navigate("/project");
        },
        onError: () => {
          setIsCreating(false);
        },
        onTimeout: () => {
          setIsCreating(false);
        },
        onProcessing: () => {
          // 처리 중 상태는 이미 isCreating으로 표현됨
        },
      });
      return project;
    } catch (error) {
      setIsCreating(false);
      throw error;
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
    isPending: isCreating,
    error:
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
