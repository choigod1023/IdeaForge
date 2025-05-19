import { FaBook } from "react-icons/fa";

interface ProjectPrerequisitesProps {
  prerequisites: string[];
}

export function ProjectPrerequisites({
  prerequisites,
}: ProjectPrerequisitesProps) {
  return (
    <div>
      <h3 className="flex items-center mb-4 text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
        <FaBook className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-2.5 text-indigo-500 dark:text-indigo-400" />
        사전 지식
      </h3>
      <ul className="space-y-2 sm:space-y-3">
        {prerequisites.map((prerequisite, index) => (
          <li
            key={index}
            className="flex items-start text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-200"
          >
            <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 mt-0.5 mr-2 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 rounded-full shrink-0">
              {index + 1}
            </span>
            <span className="break-keep-all [word-break:keep-all]">
              {prerequisite}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
