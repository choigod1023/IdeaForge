import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import type { ProjectRequest } from "../../schemas/projectFormSchema";
import { FaPlus, FaCheck } from "react-icons/fa";
import { useRef, useEffect } from "react";

const INPUT_STYLES = {
  base: "w-full px-3 sm:px-5 py-2.5 sm:py-4 text-sm sm:text-base transition-all border-2 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/95 dark:bg-gray-800/95 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 hover:border-blue-300 dark:hover:border-blue-400",
  textarea: "resize-none",
} as const;

const TOPIC_MESSAGES = {
  hasPrerequisites: "사전 지식에 대한 정보를 알려주세요.",
  hasChallenges: "도전 과제와 해결 방법에 대한 정보를 알려주세요.",
  hasTips: "유용한 개발 팁과 트릭에 대한 정보를 알려주세요.",
} as const;

interface DetailsStepProps {
  register: UseFormRegister<ProjectRequest>;
  setValue: UseFormSetValue<ProjectRequest>;
  watch: UseFormWatch<ProjectRequest>;
}

export const DetailsStep = ({
  register,
  setValue,
  watch,
}: DetailsStepProps) => {
  const currentDescription = watch("description") || "";
  const hasPrerequisites = watch("hasPrerequisites");
  const hasChallenges = watch("hasChallenges");
  const hasTips = watch("hasTips");

  // 각 토픽의 텍스트 위치를 추적하기 위한 ref
  const topicTextRanges = useRef<{
    [key in keyof typeof TOPIC_MESSAGES]?: { start: number; end: number };
  }>({});

  // description이 변경될 때마다 토픽 텍스트의 위치를 업데이트
  useEffect(() => {
    const updateTopicRanges = () => {
      const newRanges: Record<string, { start: number; end: number }> = {};
      const currentText = currentDescription;

      Object.entries(TOPIC_MESSAGES).forEach(([topic, message]) => {
        const index = currentText.indexOf(message);
        if (index !== -1) {
          newRanges[topic] = {
            start: index,
            end: index + message.length,
          };
        }
      });

      topicTextRanges.current = newRanges;
    };

    updateTopicRanges();
  }, [currentDescription]);

  const handleTopicClick = (topic: keyof typeof TOPIC_MESSAGES) => {
    const isActive = watch(topic);
    setValue(topic, !isActive);
  };

  return (
    <section className="p-2 sm:p-4 bg-white/95 dark:bg-gray-800/95 rounded-2xl">
      <div className="space-y-2 sm:space-y-3">
        <div>
          <h2 className="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
            프로젝트 상세 정보
          </h2>
          <p className="mt-0.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            당신이 생각하는 구체적인 프로젝트의 모습은 어떻나요? 자세히
            작성할수록 좋아요.
          </p>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <textarea
            {...register("description")}
            rows={3}
            className={`${INPUT_STYLES.base} ${INPUT_STYLES.textarea}`}
            placeholder="예) 프로젝트 테마, 기능 등"
          />

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleTopicClick("hasPrerequisites")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium transition-all rounded-full border-2 ${
                hasPrerequisites
                  ? "border-green-500 bg-green-50 text-green-600 dark:border-green-400 dark:bg-green-900/20 dark:text-green-400"
                  : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:bg-blue-900/10"
              }`}
            >
              {hasPrerequisites ? (
                <FaCheck className="w-3 h-3" />
              ) : (
                <FaPlus className="w-3 h-3" />
              )}
              <span>사전 지식</span>
            </button>

            <button
              type="button"
              onClick={() => handleTopicClick("hasChallenges")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium transition-all rounded-full border-2 ${
                hasChallenges
                  ? "border-green-500 bg-green-50 text-green-600 dark:border-green-400 dark:bg-green-900/20 dark:text-green-400"
                  : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:bg-blue-900/10"
              }`}
            >
              {hasChallenges ? (
                <FaCheck className="w-3 h-3" />
              ) : (
                <FaPlus className="w-3 h-3" />
              )}
              <span>도전 과제</span>
            </button>

            <button
              type="button"
              onClick={() => handleTopicClick("hasTips")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium transition-all rounded-full border-2 ${
                hasTips
                  ? "border-green-500 bg-green-50 text-green-600 dark:border-green-400 dark:bg-green-900/20 dark:text-green-400"
                  : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:bg-blue-900/10"
              }`}
            >
              {hasTips ? (
                <FaCheck className="w-3 h-3" />
              ) : (
                <FaPlus className="w-3 h-3" />
              )}
              <span>개발 팁</span>
            </button>
          </div>

          <div className="hidden">
            <input type="checkbox" {...register("hasPrerequisites")} />
            <input type="checkbox" {...register("hasChallenges")} />
            <input type="checkbox" {...register("hasTips")} />
          </div>
        </div>
      </div>
    </section>
  );
};
