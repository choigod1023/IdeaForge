import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProjectDisplay } from "../components/ProjectDisplay";
import { useProjectStore } from "../stores/projectStore";
import type { Project, ProjectRequest } from "../types";
import { FaHome, FaLightbulb, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

// 개발 팁 목록
const DEV_TIPS = [
  "코드를 작성하기 전에 먼저 설계를 해보세요. 설계는 시간을 절약해줍니다.",
  "주석은 '왜'를 설명해야 합니다. '무엇'을 하는지는 코드가 이미 보여줍니다.",
  "작은 단위로 테스트하고, 자주 커밋하세요. 이는 문제를 빠르게 발견하는 데 도움이 됩니다.",
  "코드 리뷰는 배움의 좋은 기회입니다. 다른 개발자의 관점을 받아들이세요.",
  "버그를 고치기 전에 먼저 재현 방법을 찾아보세요.",
  "깃 커밋 메시지는 명확하고 구체적으로 작성하세요.",
  "IDE의 단축키를 익히면 생산성이 크게 향상됩니다.",
  "정기적으로 코드를 리팩토링하세요. 깔끔한 코드는 유지보수가 쉽습니다.",
  "문서화는 코드만큼 중요합니다. 특히 API나 라이브러리를 만들 때는 더욱 그렇습니다.",
  "에러 메시지를 자세히 읽어보세요. 대부분의 경우 해결 방법을 알려줍니다.",
  "코드 스니펫을 만들어두면 반복 작업을 줄일 수 있습니다.",
  "디버깅은 과학적 방법을 따르세요: 가설을 세우고, 테스트하고, 결과를 분석하세요.",
  "버전 관리는 필수입니다. 깃을 사용하지 않는다면 지금 바로 시작하세요.",
  "코드 포맷팅 도구를 사용하면 일관된 코드 스타일을 유지할 수 있습니다.",
  "성능 최적화는 측정 후에 하세요. 직관은 종종 틀립니다.",
];

export default function ProjectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const savedProject = location.state?.project as Project | undefined;
  const initialFormData = location.state?.formData as
    | ProjectRequest
    | undefined;
  const [currentTip, setCurrentTip] = useState("");
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
      return storeProject; // store에 저장된 프로젝트 반환
    },
    enabled: !!initialFormData && !savedProject && !storeProject,
    retry: 1, // 실패 시 1번만 재시도
    staleTime: Infinity, // 데이터가 stale되지 않도록 설정
    gcTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  // 로딩 상태 통합 관리
  useEffect(() => {
    const loading = (storeLoading || queryLoading) && !savedProject;
    if (loading !== isLoading) {
      setIsLoading(loading);
    }
  }, [storeLoading, queryLoading, savedProject, isLoading]);

  // 랜덤 팁 선택
  useEffect(() => {
    if (isLoading) {
      setCurrentTip(DEV_TIPS[Math.floor(Math.random() * DEV_TIPS.length)]);
      const tipInterval = setInterval(() => {
        setCurrentTip(DEV_TIPS[Math.floor(Math.random() * DEV_TIPS.length)]);
      }, 6000);
      return () => clearInterval(tipInterval);
    }
  }, [isLoading]);

  // formData가 없고 savedProject도 없는 경우 홈으로 리다이렉트
  useEffect(() => {
    if (!initialFormData && !savedProject && !storeProject && !queryProject) {
      toast.info("프로젝트 생성 페이지에서 먼저 프로젝트를 생성해주세요.");
      navigate("/create");
    }
  }, [initialFormData, savedProject, storeProject, queryProject, navigate]);

  // 저장된 프로젝트가 있으면 그것을 사용, 그 다음 store의 프로젝트, 마지막으로 query의 프로젝트
  const project = savedProject || storeProject || queryProject;

  // 에러 처리
  useEffect(() => {
    if (queryError) {
      toast.error("프로젝트 생성에 실패했습니다.");
      navigate("/create");
    }
  }, [queryError, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-2xl p-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="inline-block w-16 h-16 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent dark:border-indigo-400"
              />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
              프로젝트를 생성하는 중...
            </h2>
          </motion.div>

          {/* 개발 팁 */}
          <motion.div
            key={currentTip}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="p-4 mb-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30"
          >
            <div className="flex items-center justify-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400">
              <FaLightbulb className="w-5 h-5" />
              <span className="font-medium">개발 팁</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {currentTip}
            </p>
          </motion.div>

          {/* 재미있는 로딩 메시지 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400"
          >
            <FaRocket className="w-4 h-4" />
            <span>AI가 열심히 프로젝트를 구상하고 있어요!</span>
          </motion.div>
        </div>
      </div>
    );
  }

  if (storeError && !savedProject) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="p-6 text-center bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold text-red-600 dark:text-red-400">
            프로젝트 생성에 실패했습니다
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            잠시 후 다시 시도해주세요.
          </p>
          <button
            onClick={() => navigate("/create")}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800"
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
      <ProjectDisplay
        project={project}
        source={initialFormData ? "create" : "list"}
      />
    </div>
  );
}
