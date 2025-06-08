import {
  useForm,
  type UseFormRegister,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";
import { useState, useEffect } from "react";
import { type ProjectRequest } from "../schemas/projectFormSchema";
import type { Difficulty } from "../constants/formSteps";
import { useFormSteps } from "./useFormSteps";
import { createFormSubmitHandler } from "../utils/formSubmit";

// Types
export type FormProps = {
  register: UseFormRegister<ProjectRequest>;
  watch: UseFormWatch<ProjectRequest>;
  setValue: UseFormSetValue<ProjectRequest>;
  errors: ReturnType<typeof useForm<ProjectRequest>>["formState"]["errors"];
};

// Hook for managing form state
export const useProjectFormState = () => {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty | null>(null);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    getValues,
    watch,
  } = useForm<ProjectRequest>({
    defaultValues: {
      difficulty: "초급",
      preferredTech: [],
      theme: undefined,
      description: "",
      interests: [],
      hasPrerequisites: false,
      hasChallenges: false,
      hasTips: false,
    },
  });

  // 난이도가 변경될 때마다 기술 스택 필터링 및 초기화
  useEffect(() => {
    if (selectedDifficulty) {
      setSelectedTechs([]);
      setValue("preferredTech", []);
    }
  }, [selectedDifficulty, setValue]);

  // 선택된 기술 스택이 변경될 때마다 폼 값 업데이트
  useEffect(() => {
    setValue("preferredTech", selectedTechs, { shouldValidate: true });
  }, [selectedTechs, setValue]);

  // 난이도가 변경될 때마다 폼 값 업데이트
  useEffect(() => {
    if (selectedDifficulty) {
      setValue("difficulty", selectedDifficulty, { shouldValidate: true });
    }
  }, [selectedDifficulty, setValue]);

  return {
    selectedDifficulty,
    setSelectedDifficulty,
    selectedTechs,
    setSelectedTechs,
    register,
    handleSubmit,
    setValue,
    trigger,
    errors,
    getValues,
    watch,
  };
};

// Hook for managing form steps and navigation
export function useProjectForm(
  onSubmit: (data: ProjectRequest) => Promise<void>
) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    selectedDifficulty,
    setSelectedDifficulty,
    selectedTechs,
    setSelectedTechs,
    register,
    handleSubmit,
    setValue,
    trigger,
    errors,
    getValues,
    watch,
  } = useProjectFormState();

  const { handleFormSubmit } = createFormSubmitHandler(async (data) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setIsLoading(false);
    }
  });

  const { currentStep, handleNext, handlePrev } = useFormSteps({
    selectedDifficulty,
    selectedTechs,
    trigger,
    setValue,
    getValues,
    onSubmit: handleFormSubmit,
  });

  const isLastStep = currentStep === "details";

  return {
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
  };
}
