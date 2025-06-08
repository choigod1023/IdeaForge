import { FaLightbulb } from "react-icons/fa";

interface TipItem {
  name: string;
  description: string;
}

interface TipCategory {
  category: string;
  items: TipItem[];
}

interface ProjectTipsProps {
  tips: TipCategory[];
}

export function ProjectTips({ tips }: ProjectTipsProps) {
  return (
    <div>
      <h3 className="flex items-center mb-6 text-xl font-semibold text-gray-900 dark:text-gray-100">
        <FaLightbulb className="w-5 h-5 mr-3 text-indigo-500 dark:text-indigo-400" />
        개발 팁
      </h3>
      <div className="space-y-8">
        {tips.map((category, categoryIndex) => (
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
