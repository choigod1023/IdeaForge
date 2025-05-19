import { FaCode } from "react-icons/fa";

interface ProjectDescription {
  summary: string;
  keyPoints: string[];
}

interface ProjectDescriptionProps {
  description: ProjectDescription;
}

export function ProjectDescription({ description }: ProjectDescriptionProps) {
  return (
    <div>
      <h3 className="flex items-center mb-4 text-base font-semibold text-gray-900 sm:text-lg md:text-xl dark:text-gray-100">
        <FaCode className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-2.5 text-indigo-500 dark:text-indigo-400" />
        프로젝트 설명
      </h3>
      <div className="space-y-4">
        {/* 한 줄 요약 */}
        <div className="px-4 py-3 border border-indigo-100 sm:px-6 sm:py-4 dark:border-gray-700 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl">
          <p className="font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap [font-size:clamp(1rem,2vw,1.25rem)] sm:[font-size:clamp(1.125rem,2.5vw,1.5rem)] md:[font-size:clamp(1.25rem,3vw,1.75rem)]">
            {description.summary}
          </p>
        </div>

        {/* 핵심 포인트 */}
        <div className="py-2.5 border border-gray-100 sm:px-4 sm:py-3 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/50 rounded-xl">
          <ul className="px-2 space-y-1.5">
            {description.keyPoints.map((point, index) => (
              <li
                key={index}
                className="flex items-start text-sm font-normal text-gray-700 sm:text-base md:text-lg dark:text-gray-200"
              >
                <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 mt-0.5 mr-1.5 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 rounded-full shrink-0">
                  {index + 1}
                </span>
                <span className="break-all [overflow-wrap:break-word]">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
