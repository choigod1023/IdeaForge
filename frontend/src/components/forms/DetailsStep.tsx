import type { UseFormRegister } from "react-hook-form";
import type { ProjectRequest } from "../../schemas/projectFormSchema";

const INPUT_STYLES = {
  base: "w-full px-3 sm:px-5 py-2.5 sm:py-4 text-sm sm:text-base transition-all border-2 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/95 dark:bg-gray-800/95 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 hover:border-blue-300 dark:hover:border-blue-400",
  textarea: "resize-none",
  checkbox:
    "w-4 h-4 sm:w-5 sm:h-5 mt-1 text-blue-600 border-gray-300 rounded-xl focus:ring-blue-500",
} as const;

interface DetailsStepProps {
  register: UseFormRegister<ProjectRequest>;
}

export const DetailsStep = ({ register }: DetailsStepProps) => {
  return (
    <section className="p-2 sm:p-4 bg-white/95 dark:bg-gray-800/95 rounded-2xl">
      <div className="space-y-2 sm:space-y-3">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            프로젝트 상세 정보
          </h2>
          <p className="mt-0.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            프로젝트에 대한 추가 정보를 알려주세요
          </p>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <textarea
            {...register("description")}
            rows={3}
            className={`${INPUT_STYLES.base} ${INPUT_STYLES.textarea}`}
            placeholder="프로젝트 테마, 기능 등"
          />

          <div className="grid gap-2 sm:gap-3">
            <label className="flex items-start p-2 sm:p-3 space-x-2 sm:space-x-3 transition-all bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 dark:border-gray-600 dark:hover:border-blue-400 dark:bg-gray-800">
              <input
                type="checkbox"
                {...register("hasPrerequisites")}
                className={INPUT_STYLES.checkbox}
              />
              <div className="flex-1 min-w-0">
                <span className="block text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                  사전 지식
                </span>
                <p className="mt-0.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  사전 지식과 요구사항을 알려주세요
                </p>
              </div>
            </label>

            <label className="flex items-start p-2 sm:p-3 space-x-2 sm:space-x-3 transition-all bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 dark:border-gray-600 dark:hover:border-blue-400 dark:bg-gray-800">
              <input
                type="checkbox"
                {...register("hasChallenges")}
                className={INPUT_STYLES.checkbox}
              />
              <div className="flex-1 min-w-0">
                <span className="block text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                  도전 과제
                </span>
                <p className="mt-0.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  도전 과제와 해결 방법을 알려주세요
                </p>
              </div>
            </label>

            <label className="flex items-start p-2 sm:p-3 space-x-2 sm:space-x-3 transition-all bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 dark:border-gray-600 dark:hover:border-blue-400 dark:bg-gray-800">
              <input
                type="checkbox"
                {...register("hasTips")}
                className={INPUT_STYLES.checkbox}
              />
              <div className="flex-1 min-w-0">
                <span className="block text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                  개발 팁
                </span>
                <p className="mt-0.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  유용한 개발 팁과 트릭을 알려주세요
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};
