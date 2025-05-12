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
  RECOMMENDED_TECHS,
} from "../constants/formOptions";
import { useEffect, useState, useRef } from "react";
import { FaSeedling, FaStar, FaFire } from "react-icons/fa";
import { useProjectStore } from "../stores/projectStore";
import { z } from "zod";

// 기술 스택과 관심 분야 매핑 제거

// 기술 스택과 프로젝트 카테고리 매핑 제거

const DIFFICULTY_MAP = {
  초급: "초급",
  중급: "중급",
  고급: "고급",
} as const;

const ERROR_MESSAGES = {
  preferredTech: "기술 스택을 최소 1개 이상 선택해주세요",
  difficulty: "난이도를 선택해주세요",
  theme: "프로젝트 테마를 선택해주세요",
} as const;

// 공통 스타일 상수 추가
const INPUT_STYLES = {
  base: "w-full px-5 py-4 text-base transition-all border-2 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/95 dark:bg-gray-800/95 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 hover:border-blue-300 dark:hover:border-blue-400",
  select: "appearance-none bg-no-repeat bg-right pr-10",
  textarea: "resize-none",
  checkbox:
    "w-5 h-5 mt-1 text-blue-600 border-gray-300 rounded-xl focus:ring-blue-500",
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
  } = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    mode: "onChange",
    defaultValues: {
      interests: [],
      hasPrerequisites: false,
      hasChallenges: false,
      hasTips: false,
    },
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

  // 난이도가 변경될 때마다 기술 스택 필터링
  useEffect(() => {
    if (selectedDifficulty) {
      const recommendedTechs = RECOMMENDED_TECHS[
        selectedDifficulty as keyof typeof RECOMMENDED_TECHS
      ] as readonly string[];
      // 현재 선택된 기술 스택 중 추천 기술 스택에 없는 것들은 제거
      const filteredTechs = preferredTech.filter((tech) =>
        recommendedTechs.includes(tech)
      );
      if (filteredTechs.length !== preferredTech.length) {
        setPreferredTech(filteredTechs);
      }
    }
  }, [selectedDifficulty, preferredTech, setPreferredTech]);

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
      className="space-y-10"
    >
      {/* 난이도 섹션 - 맨 위로 이동 */}
      <section className="p-8 border border-gray-100 shadow-sm bg-white/95 dark:bg-gray-800/95 rounded-2xl dark:border-gray-700">
        <div
          className="space-y-4"
          ref={(el) => void (errorRefs.current.difficulty = el)}
        >
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              난이도
            </h2>
            <span className="px-2 py-1 text-xs font-medium text-blue-600 rounded-full bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300">
              필수
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
            난이도에 따라 추천 기술 스택이 표시돼요
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {(["초급", "중급", "고급"] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => {
                  setSelectedDifficulty(DIFFICULTY_MAP[level]);
                  setValue("difficulty", level);
                  trigger("difficulty");
                }}
                className={`flex flex-row items-center p-4 rounded-2xl border-2 transition-all min-h-[80px] ${
                  selectedDifficulty === DIFFICULTY_MAP[level]
                    ? "border-blue-500 bg-blue-50/95 dark:bg-blue-900/30 dark:border-blue-400 shadow-sm"
                    : "border-gray-200 hover:border-blue-300 dark:border-gray-600 dark:hover:border-blue-400 bg-white/95 dark:bg-gray-800/95 hover:bg-gray-50/95 dark:hover:bg-gray-700/95"
                }`}
              >
                <div
                  className={`p-3 rounded-xl mr-4 flex-shrink-0 ${
                    selectedDifficulty === DIFFICULTY_MAP[level]
                      ? "bg-white/95 dark:bg-gray-800/95"
                      : "bg-gray-50/95 dark:bg-gray-700/95"
                  }`}
                >
                  {level === "초급" && (
                    <FaSeedling className="w-6 h-6 text-green-500" />
                  )}
                  {level === "중급" && (
                    <FaStar className="w-6 h-6 text-yellow-500" />
                  )}
                  {level === "고급" && (
                    <FaFire className="w-6 h-6 text-red-500" />
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <span
                    className={`text-lg font-medium ${
                      selectedDifficulty === DIFFICULTY_MAP[level]
                        ? "text-blue-900 dark:text-blue-100"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {level}
                  </span>
                  <span
                    className={`text-sm text-left ${
                      selectedDifficulty === DIFFICULTY_MAP[level]
                        ? "text-blue-700 dark:text-blue-200"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {DIFFICULTY_DESCRIPTIONS[level]}
                  </span>
                </div>
              </button>
            ))}
          </div>
          {errors.difficulty && (
            <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
              {ERROR_MESSAGES.difficulty}
            </p>
          )}
        </div>
      </section>

      {/* 기술 스택 섹션 */}
      <section className="p-8 border border-gray-100 shadow-sm bg-white/95 dark:bg-gray-800/95 rounded-2xl dark:border-gray-700">
        <div
          className="space-y-4"
          ref={(el) => void (errorRefs.current.preferredTech = el)}
        >
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              기술 스택
            </h2>
            <span className="px-2 py-1 text-xs font-medium text-blue-600 rounded-full bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300">
              필수
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {selectedDifficulty
              ? `${selectedDifficulty} 난이도에 맞는 기술 스택을 선택해요`
              : "난이도를 먼저 선택해주세요"}
          </p>
          {selectedDifficulty ? (
            <TechStackSelector
              selectedTechs={preferredTech}
              onTechSelect={setPreferredTech}
              recommendedTechs={
                RECOMMENDED_TECHS[
                  selectedDifficulty as keyof typeof RECOMMENDED_TECHS
                ]
              }
            />
          ) : (
            <div className="p-4 text-sm text-center text-gray-500 bg-gray-50 rounded-xl dark:bg-gray-700/50 dark:text-gray-400 whitespace-nowrap">
              난이도를 선택하면 추천 기술 스택이 표시돼요
            </div>
          )}
          {errors.preferredTech && (
            <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
              {ERROR_MESSAGES.preferredTech}
            </p>
          )}
        </div>
      </section>

      {/* 프로젝트 테마 섹션 */}
      <section className="p-8 border border-gray-100 shadow-sm bg-white/95 dark:bg-gray-800/95 rounded-2xl dark:border-gray-700">
        <div
          className="space-y-4"
          ref={(el) => void (errorRefs.current.theme = el)}
        >
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              프로젝트 테마
            </h2>
            <span className="px-2 py-1 text-xs font-medium text-blue-600 rounded-full bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300">
              필수
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
            프로젝트의 주제와 방향성을 선택해요
          </p>
          <div className="relative">
            <select
              {...register("theme")}
              className={`${INPUT_STYLES.base} ${INPUT_STYLES.select} h-14`}
            >
              <option value="">테마를 선택해주세요</option>
              {THEME_OPTIONS.map((theme) => (
                <option
                  key={theme}
                  value={theme}
                  className="dark:bg-gray-800 dark:text-gray-100"
                >
                  {theme}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {errors.theme && (
            <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
              {ERROR_MESSAGES.theme}
            </p>
          )}
        </div>
      </section>

      {/* 프로젝트 상세 정보 섹션 */}
      <section className="p-8 border border-gray-100 shadow-sm bg-white/95 dark:bg-gray-800/95 rounded-2xl dark:border-gray-700">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              프로젝트 상세 정보
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              프로젝트에 대한 추가 정보를 알려주세요
            </p>
          </div>

          <textarea
            {...register("description")}
            rows={4}
            className={`${INPUT_STYLES.base} ${INPUT_STYLES.textarea}`}
            placeholder="프로젝트 테마, 기능 등"
          />

          <div className="grid gap-4 sm:grid-cols-1">
            <label className="flex items-start p-4 space-x-3 transition-all border-2 border-gray-200 rounded-xl hover:border-blue-300 dark:border-gray-600 dark:hover:border-blue-400 bg-white/95 dark:bg-gray-800/95 hover:bg-gray-50/95 dark:hover:bg-gray-700/95">
              <input
                type="checkbox"
                {...register("hasPrerequisites")}
                className={INPUT_STYLES.checkbox}
              />
              <div className="flex-1 min-w-0">
                <span className="block text-base font-semibold text-gray-900 dark:text-gray-50">
                  사전 지식
                </span>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  사전 지식과 요구사항을 알려주세요
                </p>
              </div>
            </label>

            <label className="flex items-start p-4 space-x-3 transition-all border-2 border-gray-200 rounded-xl hover:border-blue-300 dark:border-gray-600 dark:hover:border-blue-400 bg-white/95 dark:bg-gray-800/95 hover:bg-gray-50/95 dark:hover:bg-gray-700/95">
              <input
                type="checkbox"
                {...register("hasChallenges")}
                className={INPUT_STYLES.checkbox}
              />
              <div className="flex-1 min-w-0">
                <span className="block text-base font-semibold text-gray-900 dark:text-gray-50">
                  도전 과제
                </span>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  도전 과제와 해결 방법을 알려주세요
                </p>
              </div>
            </label>

            <label className="flex items-start p-4 space-x-3 transition-all border-2 border-gray-200 rounded-xl hover:border-blue-300 dark:border-gray-600 dark:hover:border-blue-400 bg-white/95 dark:bg-gray-800/95 hover:bg-gray-50/95 dark:hover:bg-gray-700/95">
              <input
                type="checkbox"
                {...register("hasTips")}
                className={INPUT_STYLES.checkbox}
              />
              <div className="flex-1 min-w-0">
                <span className="block text-base font-semibold text-gray-900 dark:text-gray-50">
                  개발 팁
                </span>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  유용한 개발 팁과 트릭을 알려주세요
                </p>
              </div>
            </label>
          </div>
        </div>
      </section>

      {/* 제출 버튼 */}
      <div className="sticky bottom-0 left-0 right-0 pt-4 pb-6 bg-gradient-to-t from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900">
        <div className="relative">
          {/* 그라데이션 오버레이 */}
          <div className="absolute inset-x-0 h-8 pointer-events-none -top-8 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent" />

          {/* 버튼 컨테이너 */}
          <div className="relative px-4 mx-auto max-w-7xl">
            <div className="p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-800">
              <button
                type="submit"
                className="w-full px-6 py-4 text-lg font-medium text-white transition-all bg-blue-600 border border-transparent rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:shadow-xl active:scale-[0.98]"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>프로젝트 생성하기</span>
                  <span role="img" aria-label="rocket" className="text-xl">
                    🚀
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
