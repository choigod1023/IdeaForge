import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface FormNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  onSubmit?: (e: React.FormEvent) => void;
  isLoading?: boolean;
  isFirstStep?: boolean;
  isLastStep?: boolean;
}

export const FormNavigation = ({
  onPrev,
  onNext,
  onSubmit,
  isLoading = false,
  isFirstStep = false,
  isLastStep = false,
}: FormNavigationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 border-t border-gray-100 bg-white/95 backdrop-blur-sm dark:bg-gray-800/95 dark:border-gray-700"
    >
      <div className="flex justify-center max-w-3xl gap-4 mx-auto">
        <div className="flex w-full gap-4">
          {!isFirstStep && (
            <motion.button
              type="button"
              onClick={onPrev}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center flex-1 px-6 py-3 text-sm font-medium text-white transition-colors bg-gray-600 shadow-lg rounded-xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <FaArrowLeft className="w-4 h-4 mr-2" />
              이전
            </motion.button>
          )}

          {isLastStep ? (
            <motion.button
              type="submit"
              onClick={onSubmit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="flex items-center justify-center flex-1 px-4 py-3 text-xs font-medium text-white transition-colors bg-indigo-600 shadow-lg sm:px-8 sm:py-4 sm:text-sm rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isLoading ? "생성 중..." : "프로젝트 생성하기"}
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={onNext}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center flex-1 px-4 py-3 text-xs font-medium text-white transition-colors bg-indigo-600 shadow-lg sm:px-8 sm:py-4 sm:text-sm rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap"
            >
              다음
              <FaArrowRight className="w-3 h-3 ml-1 sm:w-4 sm:h-4 sm:ml-2" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
