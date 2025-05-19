import { FaGraduationCap } from "react-icons/fa";

interface ProjectLearningOutcomesProps {
  learningOutcomes: string[];
}

export function ProjectLearningOutcomes({
  learningOutcomes,
}: ProjectLearningOutcomesProps) {
  return (
    <div>
      <h3 className="flex items-center mb-4 text-base font-semibold text-gray-900 sm:text-lg md:text-xl dark:text-gray-100">
        <FaGraduationCap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-2.5 text-indigo-500 dark:text-indigo-400" />
        학습 내용
      </h3>
      <ul className="space-y-2">
        {learningOutcomes.map((outcome, index) => (
          <li
            key={index}
            className="flex items-start text-sm text-gray-700 sm:text-base md:text-lg dark:text-gray-200"
          >
            <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 mt-0.5 mr-2 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 rounded-full shrink-0">
              {index + 1}
            </span>
            <span className="break-all [overflow-wrap:break-word]">
              {outcome}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
