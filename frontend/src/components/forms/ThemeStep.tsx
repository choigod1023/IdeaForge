import { THEME_OPTIONS } from "../../constants/formOptions";
import { type UseFormRegister, type UseFormWatch } from "react-hook-form";
import { type ProjectRequest } from "../../schemas/projectFormSchema";
import {
  FaTools,
  FaFilm,
  FaGraduationCap,
  FaUsers,
  FaWrench,
  FaGamepad,
  FaMoneyBillWave,
  FaHeartbeat,
  FaEllipsisH,
} from "react-icons/fa";

const THEME_ICONS = {
  생산성: FaTools,
  엔터테인먼트: FaFilm,
  교육: FaGraduationCap,
  소셜: FaUsers,
  유틸리티: FaWrench,
  게임: FaGamepad,
  금융: FaMoneyBillWave,
  건강: FaHeartbeat,
  기타: FaEllipsisH,
} as const;

interface ThemeStepProps {
  register: UseFormRegister<ProjectRequest>;
  watch: UseFormWatch<ProjectRequest>;
  error?: string;
}

export const ThemeStep = ({ register, watch, error }: ThemeStepProps) => {
  const selectedTheme = watch("theme") as string | undefined;

  return (
    <section className="p-3 sm:p-4 bg-white/95 dark:bg-gray-800/95 rounded-3xl">
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            프로젝트 테마
          </h2>
          <span className="px-1.5 py-0.5 text-[10px] font-medium text-blue-600 rounded-full bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300">
            필수
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          프로젝트의 주제와 방향성을 선택해요
        </p>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          {THEME_OPTIONS.map((theme) => {
            const Icon = THEME_ICONS[theme];
            const isSelected = selectedTheme === theme;

            return (
              <label
                key={theme}
                className={`relative flex flex-col items-center p-3 transition-all rounded-3xl cursor-pointer border-2 ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
                    : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 hover:border-blue-300 hover:bg-blue-50/50 dark:hover:border-blue-400 dark:hover:bg-blue-900/10"
                }`}
              >
                <input
                  type="radio"
                  {...register("theme")}
                  value={theme}
                  className="absolute opacity-0"
                />
                <Icon className="w-6 h-6 mb-2 text-gray-600 dark:text-gray-300" />
                <span className="text-sm font-medium text-center text-gray-900 dark:text-white">
                  {theme}
                </span>
              </label>
            );
          })}
        </div>

        {error && (
          <div className="flex items-center gap-1.5 p-2 text-xs font-medium text-red-600 rounded-3xl bg-red-50 dark:bg-red-900/30 dark:text-red-400">
            <svg
              className="w-4 h-4"
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
