import { useState } from "react";
import type { FormStep } from "../types/form";
import type { Difficulty } from "../constants/formSteps";
import type { ProjectRequest } from "../schemas/projectFormSchema";
import {
  STEPS,
  type FormValidationProps,
  validateDifficultyStep,
  validateTechStackStep,
  validateThemeStep,
  validateDetailsStep,
  getNextStep,
  getPrevStep,
} from "../utils/formSteps";

interface UseFormStepsProps extends FormValidationProps {
  selectedDifficulty: Difficulty | null;
  selectedTechs: string[];
  onSubmit: (data: ProjectRequest) => Promise<void>;
}

export const useFormSteps = ({
  selectedDifficulty,
  selectedTechs,
  trigger,
  setValue,
  getValues,
  onSubmit,
}: UseFormStepsProps) => {
  const [currentStep, setCurrentStep] = useState<FormStep>("difficulty");
  const validationProps = { trigger, setValue, getValues };

  const handleNext = async () => {
    let isValid = false;

    switch (currentStep) {
      case "difficulty":
        isValid = await validateDifficultyStep(
          selectedDifficulty,
          validationProps
        );
        break;
      case "techStack":
        isValid = validateTechStackStep(selectedTechs, validationProps);
        break;
      case "theme":
        isValid = await validateThemeStep(validationProps);
        break;
      case "details":
        isValid = await validateDetailsStep({
          ...validationProps,
          onSubmit,
        });
        break;
    }

    if (!isValid) return;

    const nextStep = getNextStep(currentStep);
    if (nextStep) {
      setCurrentStep(nextStep);
    }
  };

  const handlePrev = () => {
    if (currentStep === "difficulty") return;
    const prevStep = getPrevStep(currentStep);
    if (prevStep) {
      setCurrentStep(prevStep);
    }
  };

  return {
    currentStep,
    steps: STEPS,
    handleNext,
    handlePrev,
  };
};
