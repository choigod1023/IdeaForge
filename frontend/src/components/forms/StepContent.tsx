import { motion, AnimatePresence } from "framer-motion";
import type { FormStep } from "../../types/form";
import type { Difficulty } from "../../types";
import { DifficultyStep } from "./DifficultyStep";
import { TechStackStep } from "./TechStackStep";
import { ThemeStep } from "./ThemeStep";
import { DetailsStep } from "./DetailsStep";
import type { FormProps } from "../../hooks/useProjectForm";

interface StepContentProps extends FormProps {
  currentStep: FormStep;
  selectedDifficulty: Difficulty | null;
  selectedTechs: string[];
  setSelectedDifficulty: (difficulty: Difficulty) => void;
  setSelectedTechs: (techs: string[]) => void;
}

export function StepContent({
  currentStep,
  selectedDifficulty,
  selectedTechs,
  setSelectedDifficulty,
  setSelectedTechs,
  register,
  watch,
  setValue,
  errors,
}: StepContentProps) {
  const stepContent = (() => {
    switch (currentStep) {
      case "difficulty":
        return (
          <DifficultyStep
            selectedDifficulty={selectedDifficulty || ""}
            onDifficultySelect={(difficulty: Difficulty) => {
              setSelectedDifficulty(difficulty);
            }}
            error={
              !selectedDifficulty
                ? "난이도를 선택해주세요."
                : errors.difficulty?.message?.toString()
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
              errors.theme?.message?.toString()
                ? "프로젝트 테마를 선택해주세요"
                : undefined
            }
          />
        );
      case "details":
        return (
          <DetailsStep register={register} watch={watch} setValue={setValue} />
        );
      default:
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
}
