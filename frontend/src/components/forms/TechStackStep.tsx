import { TechStackSelector } from "./TechStackSelector";
import { RECOMMENDED_TECHS } from "../../constants/formOptions";

interface TechStackStepProps {
  selectedDifficulty: string;
  selectedTechs: string[];
  onTechSelect: (techs: string[]) => void;
  error?: string;
}

export const TechStackStep = ({
  selectedDifficulty,
  selectedTechs,
  onTechSelect,
  error,
}: TechStackStepProps) => {
  return (
    <section className="p-2 sm:p-4 bg-white/95 dark:bg-gray-800/95 rounded-2xl">
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center space-x-2">
          <h2 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white">
            기술 스택
          </h2>
          <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-blue-600 rounded-full bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300">
            필수
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
          {selectedDifficulty
            ? `${selectedDifficulty} 난이도에 맞는 기술 스택을 선택해요`
            : "난이도를 먼저 선택해주세요"}
        </p>
        {selectedDifficulty ? (
          <div className="overflow-y-auto">
            <TechStackSelector
              selectedTechs={selectedTechs}
              onTechSelect={onTechSelect}
              recommendedTechs={
                RECOMMENDED_TECHS[
                  selectedDifficulty as keyof typeof RECOMMENDED_TECHS
                ]
              }
            />
          </div>
        ) : (
          <div className="p-3 text-xs sm:text-sm text-center text-gray-500 bg-gray-50 rounded-xl dark:bg-gray-700/50 dark:text-gray-400 whitespace-nowrap">
            난이도를 선택하면 추천 기술 스택이 표시돼요
          </div>
        )}
        {error && (
          <p className="mt-1.5 text-xs sm:text-sm font-medium text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    </section>
  );
};
