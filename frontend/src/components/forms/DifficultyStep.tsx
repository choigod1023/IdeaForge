import { FaSeedling, FaStar, FaFire } from "react-icons/fa";
import { type Difficulty } from "../../constants/formSteps";
import { motion, AnimatePresence } from "framer-motion";

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

export const DifficultyStep = ({
  selectedDifficulty,
  onDifficultySelect,
}: DifficultyStepProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">
          프로젝트 난이도
        </h2>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm break-keep-all [word-break:keep-all] dark:text-gray-400">
          당신의 현재 실력에 맞는 난이도를 선택해주세요.
          <br />
          너무 어렵거나 쉬운 난이도는 학습 동기를 떨어뜨릴 수 있어요.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 h-[100px] items-center my-2 sm:my-4">
        {(["초급", "중급", "고급"] as const).map((difficulty) => {
          const Icon = DIFFICULTY_ICONS[difficulty];
          const isSelected = selectedDifficulty === difficulty;

          return (
            <button
              key={difficulty}
              type="button"
              onClick={() => onDifficultySelect(difficulty)}
              className={`flex flex-col items-center gap-2 rounded-3xl border p-3 transition-all ${
                isSelected
                  ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
                  : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              }`}
            >
              <Icon
                className={`w-6 h-6 sm:w-7 sm:h-7 ${DIFFICULTY_COLORS[difficulty]}`}
              />
              <span className="text-base font-semibold text-gray-900 dark:text-white">
                {difficulty}
              </span>
            </button>
          );
        })}
      </div>

      <div className="h-[60px] mt-4">
        <AnimatePresence mode="wait">
          {selectedDifficulty && (
            <motion.div
              key={selectedDifficulty}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-3 rounded-3xl bg-gray-50 dark:bg-gray-800/50"
            >
              <motion.p
                key={`${selectedDifficulty}-text`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-base text-gray-600 sm:text-lg dark:text-gray-300 break-keep-all [word-break:keep-all] whitespace-pre-line"
              >
                {selectedDifficulty === "초급" &&
                  "처음 시작하는 분들도 쉽게 따라할 수 있어요."}
                {selectedDifficulty === "중급" &&
                  "기본기를 바탕으로 실전적인 역량을 키워요."}
                {selectedDifficulty === "고급" &&
                  "전문적인 개발 역량을 키울 수 있어요."}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
