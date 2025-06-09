import type { FormStep } from "../types/form";
import type { Difficulty } from "../constants/formSteps";
import type { ProjectRequest } from "../schemas/projectFormSchema";
import type { UseFormTrigger, UseFormSetValue } from "react-hook-form";

export const STEPS: FormStep[] = [
  "difficulty",
  "techStack",
  "theme",
  "details",
];

// Types
export interface FormValidationProps {
  trigger: UseFormTrigger<ProjectRequest>;
  setValue: UseFormSetValue<ProjectRequest>;
  getValues: () => ProjectRequest;
}

export interface DetailsValidationProps extends FormValidationProps {
  onSubmit: (data: ProjectRequest) => Promise<void>;
}

// Validation functions
export const validateDifficultyStep = async (
  selectedDifficulty: Difficulty | null,
  { setValue, trigger }: FormValidationProps
): Promise<boolean> => {
  if (!selectedDifficulty) {
    setValue("difficulty", "초급");
    return false;
  }
  return await trigger("difficulty");
};

export const validateTechStackStep = (
  selectedTechs: string[],
  { setValue }: FormValidationProps
): boolean => {
  const isValid = selectedTechs.length > 0;
  if (!isValid) {
    setValue("preferredTech", []);
  }
  return isValid;
};

export const validateThemeStep = async ({
  trigger,
}: FormValidationProps): Promise<boolean> => {
  return await trigger("theme");
};

export const validateDetailsStep = async ({
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
export const getNextStep = (currentStep: FormStep): FormStep | null => {
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

export const getPrevStep = (currentStep: FormStep): FormStep | null => {
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
