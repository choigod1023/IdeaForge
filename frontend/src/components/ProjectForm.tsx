import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  projectFormSchema,
  type ProjectRequest,
} from "../schemas/projectFormSchema";
import { TechStackSelector } from "./forms/TechStackSelector";
import {
  THEME_OPTIONS,
  DIFFICULTY_DESCRIPTIONS,
} from "../constants/formOptions";
import { useEffect, useState, useRef } from "react";
import { FaSeedling, FaStar, FaFire } from "react-icons/fa";
import { useProjectStore } from "../stores/projectStore";

// 기술 스택과 관심 분야 매핑 제거

// 기술 스택과 프로젝트 카테고리 매핑 제거

const DIFFICULTY_LABELS = {
  Beginner: "초급",
  Intermediate: "중급",
  Advanced: "고급",
} as const;

const ERROR_MESSAGES = {
  preferredTech: "기술 스택을 최소 1개 이상 선택해주세요",
  difficulty: "난이도를 선택해주세요",
  theme: "프로젝트 테마를 선택해주세요",
} as const;

interface ProjectFormProps {
  onSubmit: (data: ProjectRequest) => Promise<void>;
}

export const ProjectForm = ({ onSubmit }: ProjectFormProps) => {
  const { preferredTech, setPreferredTech } = useProjectStore();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const errorRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<ProjectRequest>({
    resolver: zodResolver(projectFormSchema),
    mode: "onChange",
  });

  // projectStore의 preferredTech가 변경될 때마다 폼 데이터 업데이트
  useEffect(() => {
    setValue("preferredTech", preferredTech);
  }, [preferredTech, setValue]);

  // 에러가 발생하면 해당 필드로 스크롤
  useEffect(() => {
    const firstError = Object.keys(errors)[0];
    if (firstError && errorRefs.current[firstError]) {
      errorRefs.current[firstError]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [errors]);

  const handleFormSubmit = async (data: ProjectRequest) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error preparing form submission:", error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        console.log("Form submit event triggered");
        handleSubmit(handleFormSubmit)(e);
      }}
      className="space-y-8"
    >
      {/* 기술 스택 선택 */}
      <div
        className="space-y-2"
        ref={(el) => void (errorRefs.current.preferredTech = el)}
      >
        <label className="block text-lg font-medium text-gray-700">
          기술 스택
        </label>
        <TechStackSelector
          selectedTechs={preferredTech}
          onTechSelect={setPreferredTech}
        />
        {errors.preferredTech && (
          <p className="mt-2 text-sm font-medium text-red-600">
            {ERROR_MESSAGES.preferredTech}
          </p>
        )}
      </div>

      {/* 난이도 선택 */}
      <div
        className="space-y-2"
        ref={(el) => void (errorRefs.current.difficulty = el)}
      >
        <label className="block text-lg font-medium text-gray-700">
          난이도
        </label>
        <div className="grid grid-cols-3 gap-4">
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => {
                setSelectedDifficulty(level);
                setValue(
                  "difficulty",
                  level as "Beginner" | "Intermediate" | "Advanced"
                );
                trigger("difficulty");
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                selectedDifficulty === level
                  ? "border-blue-500 bg-blue-50/80 dark:bg-blue-900/30 dark:border-blue-400 shadow-sm"
                  : "border-gray-200 hover:border-blue-300 dark:border-gray-600 dark:hover:border-blue-400 bg-white/80 dark:hover:bg-gray-700/80"
              }`}
            >
              <div
                className={`p-2 rounded-md mb-2 ${
                  selectedDifficulty === level
                    ? "bg-white/90 dark:bg-gray-800/90"
                    : "bg-gray-50/90 dark:bg-gray-700/90"
                }`}
              >
                {level === "Beginner" && (
                  <FaSeedling className="w-6 h-6 text-green-500" />
                )}
                {level === "Intermediate" && (
                  <FaStar className="w-6 h-6 text-yellow-500" />
                )}
                {level === "Advanced" && (
                  <FaFire className="w-6 h-6 text-red-500" />
                )}
              </div>
              <span
                className={`font-medium ${
                  selectedDifficulty === level
                    ? "text-blue-900 dark:text-black"
                    : "text-gray-700 dark:text-black"
                }`}
              >
                {DIFFICULTY_LABELS[level as keyof typeof DIFFICULTY_LABELS]}
              </span>
              <span className="mt-1 text-sm text-gray-600 dark:text-gray-900">
                {
                  DIFFICULTY_DESCRIPTIONS[
                    level as keyof typeof DIFFICULTY_DESCRIPTIONS
                  ]
                }
              </span>
            </button>
          ))}
        </div>
        {errors.difficulty && (
          <p className="mt-2 text-sm font-medium text-red-600">
            {ERROR_MESSAGES.difficulty}
          </p>
        )}
      </div>

      {/* 프로젝트 테마 선택 */}
      <div
        className="space-y-2"
        ref={(el) => void (errorRefs.current.theme = el)}
      >
        <label className="block text-lg font-medium text-gray-700">
          프로젝트 테마
        </label>
        <select
          {...register("theme")}
          className="block w-full h-12 px-4 text-lg transition-all border-2 border-gray-200 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white/80 dark:bg-gray-800/80 dark:border-gray-600 dark:text-gray-100 hover:border-blue-300 dark:hover:border-blue-400"
        >
          <option value="">테마를 선택해주세요</option>
          {THEME_OPTIONS.map((theme) => (
            <option key={theme} value={theme} className="dark:bg-gray-800">
              {theme}
            </option>
          ))}
        </select>
        {errors.theme && (
          <p className="mt-2 text-sm font-medium text-red-600">
            {ERROR_MESSAGES.theme}
          </p>
        )}
      </div>

      {/* 프로젝트 기타 정보 */}
      <div className="space-y-2">
        <label className="block text-lg font-medium text-gray-700">
          프로젝트 기타 정보
        </label>
        <textarea
          {...register("description")}
          rows={4}
          className="block w-full px-4 py-3 text-lg transition-all border-2 border-gray-200 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white/80 dark:bg-gray-800/80 dark:border-gray-600 dark:text-gray-100 hover:border-blue-300 dark:hover:border-blue-400"
          placeholder="프로젝트에 대한 추가 정보를 입력해주세요"
        />
      </div>

      {/* 프로젝트 상세 정보 */}
      <div className="space-y-2">
        <label className="block text-lg font-medium text-gray-700">
          프로젝트 상세 정보
        </label>
        <div className="space-y-3">
          <label className="flex items-center p-4 space-x-3 transition-all border-2 border-gray-200 rounded-lg hover:border-blue-300 dark:border-gray-600 dark:hover:border-blue-400 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-700/80">
            <input
              type="checkbox"
              {...register("hasPrerequisites")}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <span className="text-base font-medium text-gray-900 dark:text-gray-100">
                사전 지식
              </span>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                프로젝트에 필요한 사전 지식과 요구사항을 포함합니다
              </p>
            </div>
          </label>
          <label className="flex items-center p-4 space-x-3 transition-all border-2 border-gray-200 rounded-lg hover:border-blue-300 dark:border-gray-600 dark:hover:border-blue-400 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-700/80">
            <input
              type="checkbox"
              {...register("hasChallenges")}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <span className="text-base font-medium text-gray-900 dark:text-gray-100">
                도전 과제
              </span>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                프로젝트 진행 시 예상되는 도전 과제와 해결 방법을 포함합니다
              </p>
            </div>
          </label>
          <label className="flex items-center p-4 space-x-3 transition-all border-2 border-gray-200 rounded-lg hover:border-blue-300 dark:border-gray-600 dark:hover:border-blue-400 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-700/80">
            <input
              type="checkbox"
              {...register("hasTips")}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <span className="text-base font-medium text-gray-900 dark:text-gray-100">
                개발 팁
              </span>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                프로젝트 개발 시 유용한 팁과 트릭을 포함합니다
              </p>
            </div>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-3 text-lg font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <span className="flex items-center justify-center space-x-2">
          <span>프로젝트 생성하기</span>
          <span role="img" aria-label="rocket" className="text-xl">
            🚀
          </span>
        </span>
      </button>
    </form>
  );
};
