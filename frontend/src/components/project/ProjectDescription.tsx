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
        <div className="p-4 border border-indigo-100 dark:border-gray-700 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl">
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100 sm:text-xl md:text-2xl">
            {description.summary}
          </p>
        </div>

        {/* 핵심 포인트 */}
        <div className="p-4 border border-gray-100 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/50 rounded-xl">
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {description.keyPoints.map((point, index) => (
              <li
                key={index}
                className="flex items-start py-2.5 first:pt-0 last:pb-0"
              >
                <span className="mr-2.5 text-lg">
                  {point.startsWith("💡") ? point.slice(0, 2) : "💡"}
                </span>
                <span className="text-base text-gray-700 dark:text-gray-200">
                  {point.startsWith("💡") ? point.slice(2).trim() : point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
