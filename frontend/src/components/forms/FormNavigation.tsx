import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import type { FormStep } from "../../constants/formSteps";

interface FormNavigationProps {
  currentStep: FormStep;
  onPrev: () => void;
  onNext: () => void;
  isLastStep: boolean;
  onSubmit?: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export function FormNavigation({
  currentStep,
  onPrev,
  onNext,
  isLastStep,
  onSubmit,
  isLoading,
}: FormNavigationProps) {
  const isFirstStep = currentStep === "difficulty";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 border-t border-gray-100 bg-white/95 backdrop-blur-sm dark:bg-gray-800/95 dark:border-gray-700">
      <div className="flex justify-center max-w-4xl mx-auto">
        <div className={`flex w-full ${isFirstStep ? "" : "gap-4"}`}>
          {!isFirstStep && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onPrev}
              disabled={isFirstStep}
              className={`flex items-center justify-center flex-1 px-8 py-4 text-base font-medium text-white transition-colors shadow-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isFirstStep
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500"
              }`}
            >
              <FaArrowLeft className="mr-2" />
              이전
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type={isLastStep ? "submit" : "button"}
            onClick={isLastStep ? onSubmit : onNext}
            disabled={isLoading}
            className={`flex items-center justify-center px-8 py-4 text-base font-medium text-white transition-colors bg-indigo-600 shadow-lg rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isFirstStep ? "w-full" : "flex-1"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLastStep ? "생성하기" : "다음"}
            <FaArrowRight className="ml-2" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
