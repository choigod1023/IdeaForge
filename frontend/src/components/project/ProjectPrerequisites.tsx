import { FaBook } from "react-icons/fa";

interface PrerequisiteItem {
  name: string;
  description: string;
}

interface PrerequisiteCategory {
  category: string;
  items: PrerequisiteItem[];
}

interface ProjectPrerequisitesProps {
  prerequisites: PrerequisiteCategory[];
}

export function ProjectPrerequisites({
  prerequisites,
}: ProjectPrerequisitesProps) {
  return (
    <div>
      <h3 className="flex items-center mb-6 text-xl font-semibold text-gray-900 dark:text-gray-100">
        <FaBook className="w-5 h-5 mr-3 text-indigo-500 dark:text-indigo-400" />
        사전 지식
      </h3>
      <div className="space-y-8">
        {prerequisites.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
              {category.category}
            </h4>
            <ul className="space-y-3 pl-4">
              {category.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="flex items-start text-base text-gray-700 dark:text-gray-300"
                >
                  <span className="flex items-center justify-center w-6 h-6 mt-0.5 mr-2 text-lg shrink-0">
                    {item.name.split(" ")[0]}
                  </span>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-200">
                      {item.name.split(" ").slice(1).join(" ")}
                    </div>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {item.description}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
