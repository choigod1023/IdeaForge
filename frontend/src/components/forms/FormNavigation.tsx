import { type FormStep, FORM_STEPS } from "../../constants/formSteps";

interface FormNavigationProps {
  currentStep: FormStep;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const FormNavigation = ({
  currentStep,
  onPrev,
  onNext,
  onSubmit,
}: FormNavigationProps) => {
  return (
    <div className="flex items-center justify-between pt-4">
      <div className="flex items-center space-x-2">
        {FORM_STEPS.map((step) => (
          <div
            key={step}
            className={`h-2 w-2 rounded-full transition-colors ${
              currentStep === step
                ? "bg-blue-600 dark:bg-blue-400"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>

      <div className="flex items-center space-x-3">
        {currentStep !== "difficulty" && (
          <button
            type="button"
            onClick={onPrev}
            className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            이전
          </button>
        )}
        {currentStep === "details" ? (
          <form onSubmit={onSubmit}>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              프로젝트 생성하기
            </button>
          </form>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            다음
          </button>
        )}
      </div>
    </div>
  );
};
