import { FaSeedling, FaStar, FaFire } from "react-icons/fa";
import {
  type Difficulty,
  DIFFICULTY_DESCRIPTIONS,
} from "../../constants/formSteps";

interface DifficultyStepProps {
  selectedDifficulty: Difficulty | "";
  onDifficultySelect: (difficulty: Difficulty) => void;
  error?: string;
}

const DIFFICULTY_ICONS = {
  초급: FaSeedling,
  중급: FaStar,
  고급: FaFire,
} as const;

const DIFFICULTY_COLORS = {
  초급: "text-green-600 dark:text-green-400",
  중급: "text-yellow-600 dark:text-yellow-400",
  고급: "text-red-600 dark:text-red-400",
} as const;

const DIFFICULTY_BG_COLORS = {
  초급: "bg-green-50 dark:bg-green-900/20",
  중급: "bg-yellow-50 dark:bg-yellow-900/20",
  고급: "bg-red-50 dark:bg-red-900/20",
} as const;

const DIFFICULTY_BORDER_COLORS = {
  초급: "border-green-200 dark:border-green-800",
  중급: "border-yellow-200 dark:border-yellow-800",
  고급: "border-red-200 dark:border-red-800",
} as const;

const DIFFICULTY_HOVER_COLORS = {
  초급: "hover:bg-green-100 dark:hover:bg-green-900/30",
  중급: "hover:bg-yellow-100 dark:hover:bg-yellow-900/30",
  고급: "hover:bg-red-100 dark:hover:bg-red-900/30",
} as const;

export const DifficultyStep = ({
  selectedDifficulty,
  onDifficultySelect,
  error,
}: DifficultyStepProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          프로젝트 난이도
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          본인의 실력에 맞는 난이도를 선택해주세요.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:gap-3 sm:grid-cols-3">
        {(["초급", "중급", "고급"] as const).map((difficulty) => {
          const Icon = DIFFICULTY_ICONS[difficulty];
          const isSelected = selectedDifficulty === difficulty;

          return (
            <button
              key={difficulty}
              type="button"
              onClick={() => onDifficultySelect(difficulty)}
              className={`flex flex-col items-center justify-center rounded-lg border p-2 sm:p-3 text-center transition-all ${
                isSelected
                  ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
                  : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              }`}
            >
              <Icon
                className={`w-5 h-5 sm:w-6 sm:h-6 mb-1.5 sm:mb-2 ${DIFFICULTY_COLORS[difficulty]}`}
              />
              <span className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                {difficulty}
              </span>
              <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                {DIFFICULTY_DESCRIPTIONS[difficulty]}
              </p>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mt-2 text-xs sm:text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};
