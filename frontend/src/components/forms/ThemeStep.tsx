import { THEME_OPTIONS } from "../../constants/formOptions";
import { type UseFormRegister } from "react-hook-form";
import { type ProjectRequest } from "../../schemas/projectFormSchema";

const INPUT_STYLES = {
  base: "w-full px-3 sm:px-5 py-2.5 sm:py-4 text-sm sm:text-base transition-all border-2 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/95 dark:bg-gray-800/95 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 hover:border-blue-300 dark:hover:border-blue-400",
  select: "appearance-none bg-no-repeat bg-right pr-8 sm:pr-10",
} as const;

interface ThemeStepProps {
  register: UseFormRegister<ProjectRequest>;
  error?: string;
}

export const ThemeStep = ({ register, error }: ThemeStepProps) => {
  return (
    <section className="p-8 border border-gray-100 shadow-sm bg-white/95 dark:bg-gray-800/95 rounded-2xl dark:border-gray-700">
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white">
            프로젝트 테마
          </h2>
          <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-blue-600 rounded-full bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300">
            필수
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
          프로젝트의 주제와 방향성을 선택해요
        </p>
        <div className="relative">
          <select
            {...register("theme")}
            className={`${INPUT_STYLES.base} ${
              INPUT_STYLES.select
            } h-12 sm:h-14 ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400"
                : ""
            }`}
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
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                error ? "text-red-500 dark:text-red-400" : "text-gray-400"
              }`}
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
        {error && (
          <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 mt-2 text-xs sm:text-sm font-medium text-red-600 rounded-lg bg-red-50 dark:bg-red-900/30 dark:text-red-400">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}
      </div>
    </section>
  );
};
