import { motion } from "framer-motion";
import { ProgressBar } from "../forms/ProgressBar";
import { FormNavigation } from "../forms/FormNavigation";
import { StepContent } from "../forms/StepContent";
import { LoadingSpinner } from "../common/LoadingSpinner";
import type { FormStep } from "../../constants/formSteps";
import type { ProjectRequest } from "../../schemas/projectFormSchema";
import { useProjectForm } from "../../hooks/useProjectForm";

const STEPS: FormStep[] = ["difficulty", "techStack", "theme", "details"];

interface ProjectFormProps {
  onSubmit: (data: ProjectRequest) => Promise<void>;
}

export function ProjectForm({ onSubmit }: ProjectFormProps) {
  const {
    // Form state
    selectedDifficulty,
    setSelectedDifficulty,
    selectedTechs,
    setSelectedTechs,
    register,
    watch,
    setValue,
    errors,
    // Form submission
    handleSubmit,
    handleFormSubmit,
    // Step navigation
    currentStep,
    handleNext,
    handlePrev,
    isLastStep,
    // Loading state
    isLoading,
  } = useProjectForm(onSubmit);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] py-4 sm:py-6">
        <LoadingSpinner
          size="lg"
          text="프로젝트를 생성하고 있어요..."
          className="min-h-[400px]"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-4 sm:py-6">
      <div className="w-full max-w-3xl px-4 text-xs sm:px-6 sm:text-sm">
        <ProgressBar currentStep={currentStep} steps={STEPS} />

        <div className="bg-white shadow-lg rounded-3xl dark:bg-gray-800 dark:shadow-gray-900/30 min-h-[400px] flex flex-col">
          {isLastStep ? (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit(handleFormSubmit)}
              className="flex flex-col flex-1"
            >
              <div className="flex-1 p-4 sm:p-6">
                <StepContent
                  currentStep={currentStep}
                  selectedDifficulty={selectedDifficulty}
                  selectedTechs={selectedTechs}
                  setSelectedDifficulty={setSelectedDifficulty}
                  setSelectedTechs={setSelectedTechs}
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                />
              </div>
              <FormNavigation
                currentStep={currentStep}
                onPrev={handlePrev}
                onNext={handleNext}
                isLastStep={isLastStep}
                onSubmit={handleSubmit(handleFormSubmit)}
              />
            </motion.form>
          ) : (
            <div className="flex flex-col flex-1">
              <div className="flex-1 p-4 sm:p-6">
                <StepContent
                  currentStep={currentStep}
                  selectedDifficulty={selectedDifficulty}
                  selectedTechs={selectedTechs}
                  setSelectedDifficulty={setSelectedDifficulty}
                  setSelectedTechs={setSelectedTechs}
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                />
              </div>
              <FormNavigation
                currentStep={currentStep}
                onPrev={handlePrev}
                onNext={handleNext}
                isLastStep={isLastStep}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
