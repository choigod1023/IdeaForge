import { type FormStep } from "../../constants/formSteps";

interface ProgressBarProps {
  currentStep: FormStep;
  steps: FormStep[];
}

export const ProgressBar = ({ currentStep, steps }: ProgressBarProps) => {
  const getStepLabel = (step: FormStep) => {
    switch (step) {
      case "difficulty":
        return "난이도";
      case "techStack":
        return "기술 스택";
      case "theme":
        return "테마";
      case "details":
        return "상세 정보";
      default:
        return step;
    }
  };

  return (
    <div className="mb-12 sm:mb-16">
      {/* 스텝 레이블 */}
      <div className="flex justify-between mb-5">
        {steps.map((step, index) => {
          const isCurrentStep = currentStep === step;
          const isCompleted = steps.indexOf(currentStep) > index;

          return (
            <div key={step} className="flex-1 text-center">
              <span
                className={`text-sm sm:text-base font-semibold transition-colors ${
                  isCurrentStep
                    ? "text-indigo-600 dark:text-indigo-400"
                    : isCompleted
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {getStepLabel(step)}
              </span>
            </div>
          );
        })}
      </div>

      {/* 프로그레스 바 */}
      <div className="relative">
        <div className="absolute top-0 w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div
            className="h-full transition-all duration-300 bg-indigo-600 rounded-full dark:bg-indigo-500"
            style={{
              width: `${
                ((steps.indexOf(currentStep) + 1) / steps.length) * 100
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
