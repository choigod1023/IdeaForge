import { FaList } from "react-icons/fa";

interface ProjectFeaturesProps {
  features: string[];
}

export function ProjectFeatures({ features }: ProjectFeaturesProps) {
  return (
    <div>
      <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        <FaList className="mr-2.5 text-indigo-500 dark:text-indigo-400" />
        주요 기능
      </h3>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start text-base text-gray-700 dark:text-gray-200"
          >
            <span className="flex items-center justify-center w-5 h-5 mt-0.5 mr-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 rounded-full shrink-0">
              {index + 1}
            </span>
            <span className="break-keep-all [word-break:keep-all]">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
