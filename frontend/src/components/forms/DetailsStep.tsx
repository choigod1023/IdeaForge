import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import type { ProjectRequest } from "../../schemas/projectFormSchema";
import { useEffect } from "react";

const INPUT_STYLES = {
  base: "w-full px-3 sm:px-5 py-2.5 sm:py-4 text-sm sm:text-base transition-all border-2 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/95 dark:bg-gray-800/95 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 hover:border-blue-300 dark:hover:border-blue-400",
  textarea: "resize-none",
} as const;

interface DetailsStepProps {
  register: UseFormRegister<ProjectRequest>;
  setValue: UseFormSetValue<ProjectRequest>;
  watch?: UseFormWatch<ProjectRequest>;
}

export const DetailsStep = ({ register, setValue }: DetailsStepProps) => {
  // 컴포넌트 마운트 시 필수 항목들을 true로 설정
  useEffect(() => {
    setValue("hasPrerequisites", true);
    setValue("hasChallenges", true);
    setValue("hasTips", true);
  }, [setValue]);

  return (
    <section className="p-2 sm:p-4 bg-white/95 dark:bg-gray-800/95 rounded-2xl">
      <div className="space-y-2 sm:space-y-3">
        <div>
          <h2 className="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
            프로젝트 상세 정보
          </h2>
          <p className="mt-0.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            프로젝트의 핵심 내용을 자세히 설명해주세요. 주요 기능, 사용자 경험,
            기술적 특징 등을 포함하면 좋아요.
          </p>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <textarea
            {...register("description")}
            rows={5}
            className={`${INPUT_STYLES.base} ${INPUT_STYLES.textarea}`}
            placeholder="예) 
• 프로젝트의 주요 기능과 특징
• 사용자 경험과 인터페이스
• 기술적 구현 포인트
• 확장 가능성과 향후 개선 사항"
          />

          {/* 필수 항목들을 hidden input으로 유지 */}
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
