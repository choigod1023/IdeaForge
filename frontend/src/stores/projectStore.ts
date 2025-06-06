import { create } from "zustand";
import type { Project, ProjectRequest } from "../types";
import { api } from "../services/api";

// 로컬 스토리지 키
const STORAGE_KEY = "ideaforge_projects";

interface FeatureItem {
  title: string;
  description: string;
  keyPoints: string[];
}

interface FeatureSection {
  mainTitle: string;
  description: string;
  items: FeatureItem[];
}

// 마크다운 템플릿 생성 함수
export const generateMarkdown = (project: Project): string => {
  try {
    return `# ${project.title}

## 프로젝트 정보
- **난이도**: ${project.difficulty}
${project.category ? `- **카테고리**: ${project.category}\n` : ""}${
      project.theme ? `- **테마**: ${project.theme}\n` : ""
    }

## 프로젝트 설명
${project.description.summary}

## 핵심 포인트
${project.description.keyPoints.map((point) => `- ${point}`).join("\n")}

## 기술 스택
${project.techStack
  .map((tech) => `- ${tech.name}\n  ${tech.descriptions.join("\n  ")}`)
  .join("\n")}

## 주요 기능
${project.features
  .map((feature: string | FeatureSection) => {
    if (typeof feature === "string") {
      return `- ${feature}`;
    }
    return `### ${feature.mainTitle}
${feature.description}

${feature.items
  .map(
    (item: FeatureItem) =>
      `#### ${item.title}
${item.description}

${item.keyPoints.map((point: string) => `- ${point}`).join("\n")}`
  )
  .join("\n\n")}`;
  })
  .join("\n\n")}

${
  project.prerequisites && project.prerequisites.length > 0
    ? `## 사전 지식
${project.prerequisites
  .map(
    (category) =>
      `### ${category.category}\n${category.items
        .map((item) => `- **${item.name}**: ${item.description}`)
        .join("\n")}`
  )
  .join("\n\n")}\n`
    : ""
}

${
  project.challenges && project.challenges.length > 0
    ? `## 도전 과제
${project.challenges
  .map(
    (category) =>
      `### ${category.category}\n${category.items
        .map((item) => `- **${item.name}**: ${item.description}`)
        .join("\n")}`
  )
  .join("\n\n")}\n`
    : ""
}

${
  project.tips && project.tips.length > 0
    ? `## 개발 팁
${project.tips
  .map(
    (category) =>
      `### ${category.category}\n${category.items
        .map((item) => `- **${item.name}**: ${item.description}`)
        .join("\n")}`
  )
  .join("\n\n")}\n`
    : ""
}

${
  project.resources && project.resources.length > 0
    ? `## 참고 자료
${project.resources
  .map(
    (resource) =>
      `### ${resource.title}
- **설명**: ${resource.description}
- **URL**: ${resource.url}
- **학습 포인트**:
${resource.learningPoints.map((point) => `  - ${point}`).join("\n")}
${
  resource.codeExamples.length > 0
    ? `- **코드 예시**:\n${resource.codeExamples
        .map((example) => `  - ${example}`)
        .join("\n")}`
    : ""
}
${
  resource.practicalExamples.length > 0
    ? `- **실전 예시**:\n${resource.practicalExamples
        .map((example) => `  - ${example}`)
        .join("\n")}`
    : ""
}`
  )
  .join("\n\n")}\n`
    : ""
}

---
생성일: ${project.createdAt || new Date().toLocaleDateString()}`;
  } catch (error) {
    console.error("마크다운 생성 중 오류:", error);
    throw new Error("마크다운 생성에 실패했습니다.");
  }
};

interface ProjectState {
  project: Project | null;
  projectList: Project[];
  isLoading: boolean;
  error: string | null;
  preferredTech: string[];
  pollingStatus: {
    jobId: string | null;
    status: "idle" | "polling" | "completed" | "failed";
    error: string | null;
    progress: number;
  };
  setProject: (project: Project) => void;
  clearProject: () => void;
  getProject: (id: string) => Project | undefined;
  selectProject: (project: Project) => void;
  generateProject: (
    request: ProjectRequest
  ) => Promise<{ success: boolean; isDuplicate?: boolean }>;
  setPreferredTech: (techs: string[]) => void;
  addToProjectList: (project: Project) => {
    success: boolean;
    isDuplicate?: boolean;
  };
  removeFromProjectList: (projectId: string) => boolean;
  clearProjectList: () => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  exportToMarkdown: (projectId: string) => void;
}

// 로컬 스토리지에서 프로젝트 목록 로드
const loadProjectsFromStorage = (): Project[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load projects from storage:", error);
    return [];
  }
};

export const useProjectStore = create<ProjectState>((set, get) => ({
  project: null,
  projectList: loadProjectsFromStorage(),
  isLoading: false,
  error: null,
  preferredTech: [],
  pollingStatus: {
    jobId: null,
    status: "idle",
    error: null,
    progress: 0,
  },
  setProject: (project) => set({ project }),
  clearProject: () =>
    set({
      project: {
        id: "",
        title: "",
        description: {
          summary: "",
          keyPoints: [],
        },
        techStack: [],
        difficulty: "초급" as const,
        projectType: [],
        features: [],
        resources: [], // 리소스 초기화
        theme: undefined, // ProjectTheme는 optional이므로 undefined로 설정
        prerequisites: [],
        challenges: [],
        tips: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      error: null,
      isLoading: false,
      preferredTech: [],
    }),
  getProject: (id: string) => {
    const { projectList } = get();
    return projectList.find((p) => p.id === id);
  },
  selectProject: (project: Project) => {
    set({ project });
  },
  generateProject: async (request: ProjectRequest) => {
    let pollInterval: NodeJS.Timeout | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const cleanup = () => {
      if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = null;
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    set({
      isLoading: true,
      error: null,
      pollingStatus: {
        jobId: null,
        status: "polling",
        error: null,
        progress: 0,
      },
    });

    try {
      // 1. 초기 요청으로 jobId 받기
      const { jobId } = await api.generateRecommendation(request);

      if (!jobId) {
        throw new Error("Job ID를 받지 못했습니다");
      }

      // jobId 저장
      set((state) => ({
        pollingStatus: {
          ...state.pollingStatus,
          jobId,
        },
      }));

      // 2. 폴링 시작
      pollInterval = setInterval(async () => {
        const currentStatus = get().pollingStatus.status;

        if (currentStatus !== "polling") {
          cleanup();
          return;
        }

        try {
          const status = await api.checkRecommendationStatus(jobId);

          switch (status.status) {
            case "completed": {
              if (!status.result) {
                throw new Error("프로젝트 데이터를 받지 못했습니다");
              }
              cleanup();

              // 프로젝트 추가
              const addResult = get().addToProjectList(status.result);
              if (!addResult.success) {
                throw new Error("이미 존재하는 프로젝트입니다");
              }

              set({
                project: status.result,
                isLoading: false,
                pollingStatus: {
                  jobId: null,
                  status: "completed",
                  error: null,
                  progress: 100,
                },
              });
              break;
            }

            case "failed": {
              cleanup();
              set({
                error: status.error || "프로젝트 생성에 실패했습니다",
                isLoading: false,
                pollingStatus: {
                  jobId: null,
                  status: "failed",
                  error: status.error || "프로젝트 생성에 실패했습니다",
                  progress: 0,
                },
              });
              break;
            }

            case "processing": {
              set((state) => ({
                pollingStatus: {
                  ...state.pollingStatus,
                  progress: Math.min(state.pollingStatus.progress + 10, 90),
                },
              }));
              break;
            }
          }
        } catch (error) {
          cleanup();
          set({
            error:
              error instanceof Error
                ? error.message
                : "상태 확인 중 오류가 발생했습니다",
            isLoading: false,
            pollingStatus: {
              jobId: null,
              status: "failed",
              error:
                error instanceof Error
                  ? error.message
                  : "상태 확인 중 오류가 발생했습니다",
              progress: 0,
            },
          });
        }
      }, 2000);

      // 5분 타임아웃
      timeoutId = setTimeout(() => {
        const currentStatus = get().pollingStatus.status;

        if (currentStatus === "polling") {
          cleanup();
          set({
            error: "프로젝트 생성 시간이 초과되었습니다",
            isLoading: false,
            pollingStatus: {
              jobId: null,
              status: "failed",
              error: "프로젝트 생성 시간이 초과되었습니다",
              progress: 0,
            },
          });
        }
      }, 5 * 60 * 1000);

      return { success: true };
    } catch (error) {
      cleanup();
      set({
        error:
          error instanceof Error
            ? error.message
            : "프로젝트 생성 중 오류가 발생했습니다",
        isLoading: false,
        pollingStatus: {
          jobId: null,
          status: "failed",
          error:
            error instanceof Error
              ? error.message
              : "프로젝트 생성 중 오류가 발생했습니다",
          progress: 0,
        },
      });
      return { success: false };
    }
  },
  setPreferredTech: (techs: string[]) => set({ preferredTech: techs }),
  addToProjectList: (project: Project) => {
    const state = get();
    // 중복 체크
    const isDuplicate = state.projectList.some(
      (p) => p.title === project.title && p.description === project.description
    );

    if (isDuplicate) {
      return { success: false, isDuplicate: true };
    }

    const newList = [...state.projectList, project];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    set({ projectList: newList });
    return { success: true, isDuplicate: false };
  },
  removeFromProjectList: (projectId: string) => {
    const state = get();
    const newList = state.projectList.filter((p) => p.id !== projectId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    set({ projectList: newList });
    return true;
  },
  clearProjectList: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ projectList: [] });
  },
  saveToLocalStorage: () => {
    const { projectList } = get();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projectList));
  },
  loadFromLocalStorage: () => {
    const projects = loadProjectsFromStorage();
    set({ projectList: projects });
  },
  exportToMarkdown: (projectId: string) => {
    const { projectList } = get();

    const project = projectList.find((p) => p.id === projectId);

    if (!project) {
      throw new Error(`ID가 ${projectId}인 프로젝트를 찾을 수 없습니다.`);
    }

    const markdown = generateMarkdown(project);

    // 파일명 생성 (특수문자 제거 및 공백을 언더스코어로 변환)
    const safeFileName = project.title
      .replace(/[^a-zA-Z0-9가-힣]/g, "_")
      .replace(/_+/g, "_")
      .toLowerCase();

    const blob = new Blob([markdown], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${safeFileName}.md`;
    document.body.appendChild(a);
    a.click();

    // 클린업
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);

    return true;
  },
}));
