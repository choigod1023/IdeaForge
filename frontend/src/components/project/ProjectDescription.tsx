import { FaCode } from "react-icons/fa";

interface ProjectDescription {
  summary: string;
  keyPoints: string[];
  details: string;
}

interface ProjectDescriptionProps {
  description: ProjectDescription;
}

export function ProjectDescription({ description }: ProjectDescriptionProps) {
  return (
    <div>
      <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        <FaCode className="mr-2.5 text-indigo-500 dark:text-indigo-400" />
        프로젝트 설명
      </h3>
      <div className="space-y-4">
        {/* 한 줄 요약 */}
        <div className="px-6 py-4 text-lg font-medium text-gray-900 border border-indigo-100 dark:text-gray-100 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl">
          {description.summary}
        </div>

        {/* 핵심 포인트 */}
        <div className="px-6 py-4 border border-gray-100 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/50 rounded-xl">
          <ul className="space-y-2">
            {description.keyPoints.map((point, index) => (
              <li
                key={index}
                className="flex items-start text-base text-gray-700 dark:text-gray-200"
              >
                <span className="flex items-center justify-center w-5 h-5 mt-0.5 mr-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 rounded-full shrink-0">
                  {index + 1}
                </span>
                <span className="break-all [word-break:break-all] [overflow-wrap:break-word]">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 상세 설명 */}
        <div className="px-6 py-5 text-base bg-white border border-gray-100 dark:bg-gray-800 dark:border-gray-700 rounded-xl">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {description.details
              .replace(/[.!?]+\s+/g, "$&\n")
              .split("\n")
              .filter((sentence) => sentence.trim())
              .map((sentence, index) => (
                <p
                  key={index}
                  className="mb-3 leading-7 text-gray-700 dark:text-gray-200 last:mb-0 break-all [word-break:break-all] [overflow-wrap:break-word]"
                >
                  {sentence.trim()}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
