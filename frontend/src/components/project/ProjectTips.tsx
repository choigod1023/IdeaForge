import { FaLightbulb } from "react-icons/fa";

interface ProjectTipsProps {
  tips: string[];
}

export function ProjectTips({ tips }: ProjectTipsProps) {
  return (
    <div>
      <h3 className="flex items-center mb-4 text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
        <FaLightbulb className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-2.5 text-indigo-500 dark:text-indigo-400" />
        개발 팁
      </h3>
      <ul className="space-y-2 sm:space-y-3">
        {tips.map((tip, index) => (
          <li
            key={index}
            className="flex items-start text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-200"
          >
            <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 mt-0.5 mr-2 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 rounded-full shrink-0">
              {index + 1}
            </span>
            <span className="break-keep-all [word-break:keep-all]">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
