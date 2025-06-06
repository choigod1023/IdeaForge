import { useState } from "react";
import type { FormStep, Difficulty } from "../constants/formSteps";
import type { ProjectRequest } from "../schemas/projectFormSchema";
import type { UseFormTrigger, UseFormSetValue } from "react-hook-form";

const STEPS: FormStep[] = ["difficulty", "techStack", "theme", "details"];

// Types
interface FormValidationProps {
  trigger: UseFormTrigger<ProjectRequest>;
  setValue: UseFormSetValue<ProjectRequest>;
  getValues: () => ProjectRequest;
}

interface DetailsValidationProps extends FormValidationProps {
  onSubmit: (data: ProjectRequest) => Promise<void>;
}

interface UseFormStepsProps extends FormValidationProps {
  selectedDifficulty: Difficulty | null;
  selectedTechs: string[];
  onSubmit: (data: ProjectRequest) => Promise<void>;
}

// Validation functions
const validateDifficultyStep = async (
  selectedDifficulty: Difficulty | null,
  { setValue, trigger }: FormValidationProps
): Promise<boolean> => {
  if (!selectedDifficulty) {
    setValue("difficulty", "초급");
    return false;
  }
  return await trigger("difficulty");
};

const validateTechStackStep = (
  selectedTechs: string[],
  { setValue }: FormValidationProps
): boolean => {
  const isValid = selectedTechs.length > 0;
  if (!isValid) {
    setValue("preferredTech", []);
  }
  return isValid;
};

const validateThemeStep = async ({
  trigger,
}: FormValidationProps): Promise<boolean> => {
  return await trigger("theme");
};

const validateDetailsStep = async ({
  trigger,
  getValues,
  onSubmit,
}: DetailsValidationProps): Promise<boolean> => {
  const isValid = await trigger([
    "description",
    "hasPrerequisites",
    "hasChallenges",
    "hasTips",
  ]);

  if (isValid) {
    const formData = getValues();
    await onSubmit(formData);
  }

  return isValid;
};

// Step navigation functions
const getNextStep = (currentStep: FormStep): FormStep | null => {
  switch (currentStep) {
    case "difficulty":
      return "techStack";
    case "techStack":
      return "theme";
    case "theme":
      return "details";
    default:
      return null;
  }
};

const getPrevStep = (currentStep: FormStep): FormStep | null => {
  switch (currentStep) {
    case "techStack":
      return "difficulty";
    case "theme":
      return "techStack";
    case "details":
      return "theme";
    default:
      return null;
  }
};

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
        } as DetailsValidationProps);
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
