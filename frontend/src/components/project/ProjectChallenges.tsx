import { FaFlag } from "react-icons/fa";

interface ProjectChallengesProps {
  challenges: string[];
}

export function ProjectChallenges({ challenges }: ProjectChallengesProps) {
  return (
    <div>
      <h3 className="flex items-center mb-4 text-base font-semibold text-gray-900 sm:text-lg md:text-xl dark:text-gray-100">
        <FaFlag className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-2.5 text-indigo-500 dark:text-indigo-400" />
        예상되는 도전 과제
      </h3>
      <ul className="space-y-2 sm:space-y-3">
        {challenges.map((challenge, index) => (
          <li
            key={index}
            className="flex items-start text-sm text-gray-700 sm:text-base md:text-lg dark:text-gray-200"
          >
            <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 mt-0.5 mr-2 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 rounded-full shrink-0">
              {index + 1}
            </span>
            <span className="break-keep-all [word-break:keep-all]">
              {challenge}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
