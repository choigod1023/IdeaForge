import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  projectFormSchema,
  type ProjectRequest,
} from "../../schemas/projectFormSchema";
import { useEffect, useState } from "react";
import { TechStackStep } from "./TechStackStep";
import { ThemeStep } from "./ThemeStep";
import { DetailsStep } from "./DetailsStep";
import { type FormStep, type Difficulty } from "../../constants/formSteps";
import { DifficultyStep } from "./DifficultyStep";
import { motion, AnimatePresence } from "framer-motion";
import { ProgressBar } from "./ProgressBar";
import { FormNavigation } from "./FormNavigation";

const STEPS: FormStep[] = ["difficulty", "techStack", "theme", "details"];

export interface ProjectFormProps {
  onSubmit: (data: ProjectRequest) => Promise<void>;
  isLoading?: boolean;
}

export function ProjectForm({ onSubmit, isLoading = false }: ProjectFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>("difficulty");
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
    resolver: zodResolver(projectFormSchema),
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
      setSelectedTechs([]); // 기술 스택 초기화
      setValue("preferredTech", []); // 폼 값 초기화
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

  const handleFormSubmit = async (data: ProjectRequest) => {
    try {
      // 필수 항목들을 true로 설정
      const formData = {
        ...data,
        hasPrerequisites: true,
        hasChallenges: true,
        hasTips: true,
      };
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleNext = async () => {
    let isValid = false;
    console.log("handleNext called, current step:", currentStep);

    switch (currentStep) {
      case "difficulty":
        // 난이도가 선택되지 않았으면 진행하지 않음
        if (!selectedDifficulty) {
          setValue("difficulty", "초급", { shouldValidate: true });
          return;
        }
        isValid = await trigger("difficulty");
        break;
      case "techStack":
        isValid = selectedTechs.length > 0;
        if (!isValid) {
          setValue("preferredTech", [], { shouldValidate: true });
        }
        break;
      case "theme":
        isValid = await trigger("theme");
        if (isValid) {
          setCurrentStep("details");
          return;
        }
        break;
      case "details":
        isValid = await trigger([
          "description",
          "hasPrerequisites",
          "hasChallenges",
          "hasTips",
        ]);
        if (isValid) {
          const formData = getValues();
          await handleFormSubmit(formData);
          return;
        }
        break;
    }

    if (!isValid) return;

    switch (currentStep) {
      case "difficulty":
        setCurrentStep("techStack");
        break;
      case "techStack":
        setCurrentStep("theme");
        break;
      case "theme":
        setCurrentStep("details");
        break;
    }
  };

  const handlePrev = () => {
    switch (currentStep) {
      case "techStack":
        setCurrentStep("difficulty");
        break;
      case "theme":
        setCurrentStep("techStack");
        break;
      case "details":
        setCurrentStep("theme");
        break;
    }
  };

  const renderStep = () => {
    console.log("Rendering step:", currentStep);
    return (
      <AnimatePresence mode="wait">
        {currentStep === "difficulty" && (
          <motion.div
            key="difficulty"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            <DifficultyStep
              selectedDifficulty={selectedDifficulty || ""}
              onDifficultySelect={(difficulty: Difficulty) => {
                setSelectedDifficulty(difficulty);
                setValue("difficulty", difficulty, { shouldValidate: true });
              }}
              error={
                !selectedDifficulty
                  ? "난이도를 선택해주세요."
                  : errors.difficulty?.message
              }
            />
          </motion.div>
        )}
        {currentStep === "techStack" && (
          <motion.div
            key="techStack"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            <TechStackStep
              selectedDifficulty={selectedDifficulty || ""}
              selectedTechs={selectedTechs}
              onTechSelect={setSelectedTechs}
              error={
                selectedTechs.length === 0
                  ? "하나 이상의 기술 스택을 선택해주세요."
                  : undefined
              }
            />
          </motion.div>
        )}
        {currentStep === "theme" && (
          <motion.div
            key="theme"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            <ThemeStep
              register={register}
              watch={watch}
              error={
                errors.theme?.message
                  ? "프로젝트 테마를 선택해주세요"
                  : undefined
              }
            />
          </motion.div>
        )}
        {currentStep === "details" && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            <DetailsStep
              register={register}
              setValue={setValue}
              watch={watch}
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="flex flex-col items-center py-4 pb-32 sm:py-6 sm:pb-32">
      <div className="w-full max-w-3xl px-4 text-xs sm:px-6 sm:text-sm">
        {/* 진행 상태 표시 */}
        <ProgressBar currentStep={currentStep} steps={STEPS} />

        {/* 폼 컨텐츠 */}
        <div className="bg-white shadow-lg rounded-3xl dark:bg-gray-800 dark:shadow-gray-900/30 min-h-[400px] flex flex-col">
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col flex-1"
          >
            <div className="flex-1 p-4 sm:p-6">{renderStep()}</div>
          </motion.form>
        </div>
      </div>

      {/* 네비게이션 */}
      <FormNavigation
        currentStep={currentStep}
        onPrev={handlePrev}
        onNext={handleNext}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(handleFormSubmit)(e);
        }}
        isLoading={isLoading}
        isLastStep={currentStep === "details"}
      />
    </div>
  );
}
