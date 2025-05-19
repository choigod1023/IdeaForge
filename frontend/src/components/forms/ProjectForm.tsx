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
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { DifficultyStep } from "./DifficultyStep";
import { motion, AnimatePresence } from "framer-motion";
import { ProgressBar } from "./ProgressBar";

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
      await onSubmit(data);
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
    const stepContent = (() => {
      switch (currentStep) {
        case "difficulty":
          return (
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
          );
        case "techStack":
          return (
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
          );
        case "theme":
          return (
            <ThemeStep
              register={register}
              watch={watch}
              error={
                errors.theme?.message
                  ? "프로젝트 테마를 선택해주세요"
                  : undefined
              }
            />
          );
        case "details":
          console.log("Rendering DetailsStep");
          return (
            <DetailsStep
              register={register}
              watch={watch}
              setValue={setValue}
            />
          );
        default:
          console.log("No step matched:", currentStep);
          return null;
      }
    })();

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full"
        >
          {stepContent}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="flex flex-col items-center py-4 pb-32 sm:py-6 sm:pb-6">
      <div className="w-full max-w-3xl px-4 text-xs sm:px-6 sm:text-sm">
        {/* 진행 상태 표시 */}
        <ProgressBar currentStep={currentStep} steps={STEPS} />

        {/* 폼 컨텐츠 */}
        <div className="bg-white shadow-lg rounded-3xl dark:bg-gray-800 dark:shadow-gray-900/30 min-h-[400px] flex flex-col">
          {currentStep === "details" ? (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit(handleFormSubmit)}
              className="flex flex-col flex-1"
            >
              <div className="flex-1 p-4 sm:p-6">{renderStep()}</div>
              {/* 네비게이션 버튼 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex justify-between p-4 border-t border-gray-100 sm:p-6 dark:border-gray-700"
              >
                <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 transition-colors rounded-3xl bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50 dark:focus:ring-offset-gray-800 min-w-[100px]"
                >
                  <FaArrowLeft className="w-4 h-4" />
                  <span>이전</span>
                </button>
                <div className="flex-1" />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-3xl bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800 min-w-[140px]"
                >
                  {isLoading ? "생성 중..." : "프로젝트 생성하기"}
                </button>
              </motion.div>
            </motion.form>
          ) : (
            <div className="flex flex-col flex-1">
              <div className="flex-1 p-4 sm:p-6">{renderStep()}</div>
              {/* 네비게이션 버튼 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex justify-between p-4 border-t border-gray-100 sm:p-6 dark:border-gray-700"
              >
                {currentStep !== "difficulty" && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 transition-colors rounded-3xl bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50 dark:focus:ring-offset-gray-800 min-w-[100px]"
                  >
                    <FaArrowLeft className="w-4 h-4" />
                    <span>이전</span>
                  </button>
                )}
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-3xl bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800 min-w-[140px]"
                >
                  <span>다음</span>
                  <FaArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
