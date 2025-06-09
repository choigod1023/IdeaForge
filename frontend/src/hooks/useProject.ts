import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProjectStore } from "../stores/projectStore";
import type { Project, ProjectSection } from "../types";
import { filterProjectSections } from "../utils/projectSections";
import { api } from "../services/api";

// ===== 프로젝트 데이터 조회 =====
export function useProject(projectId?: string) {
  const navigate = useNavigate();

  return useQuery<Project>({
    queryKey: ["project", projectId],
    queryFn: async () => {
      if (!projectId) {
        navigate("/projects", { replace: true });
        throw new Error("Project ID not found");
      }
      try {
        return await api.getProject(projectId);
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("프로젝트를 불러오는데 실패했습니다");
      }
    },
    enabled: !!projectId,
  });
}

// ===== 프로젝트 페이지 상태 관리 =====
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

// ===== 프로젝트 섹션 관리 =====
export const useProjectSections = (project: Project) => {
  const [currentSection, setCurrentSection] =
    useState<ProjectSection>("overview");

  // 프로젝트가 변경될 때마다 overview 섹션으로 초기화
  useEffect(() => {
    setCurrentSection("overview");
  }, [project.id]);

  const sections = filterProjectSections(project);

  return {
    currentSection,
    setCurrentSection,
    sections,
  };
};

// ===== 프로젝트 네비게이션 =====
interface UseProjectNavigationProps {
  currentSection: ProjectSection;
  onSectionChange: (section: ProjectSection) => void;
  onPrev?: () => void;
  sections: ProjectSection[];
}

interface UseProjectNavigationReturn {
  currentIndex: number;
  isFirstSection: boolean;
  isLastSection: boolean;
  prevSection: ProjectSection | null;
  nextSection: ProjectSection | null;
  handlePrev: () => void;
  handleNext: () => void;
}

export const useProjectNavigation = ({
  currentSection,
  onSectionChange,
  onPrev = () => {},
  sections,
}: UseProjectNavigationProps): UseProjectNavigationReturn => {
  const navigate = useNavigate();
  const currentIndex = sections.indexOf(currentSection);
  const isFirstSection = currentIndex === 0;
  const isLastSection = currentIndex === sections.length - 1;

  const prevSection = !isFirstSection ? sections[currentIndex - 1] : null;
  const nextSection = !isLastSection ? sections[currentIndex + 1] : null;

  const handlePrev = () => {
    if (isFirstSection) {
      onPrev();
    } else {
      onSectionChange(sections[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (isLastSection) {
      navigate("/projects");
    } else {
      onSectionChange(sections[currentIndex + 1]);
    }
  };

  return {
    currentIndex,
    isFirstSection,
    isLastSection,
    prevSection,
    nextSection,
    handlePrev,
    handleNext,
  };
};
