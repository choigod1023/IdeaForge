import { useState } from "react";
import { TECH_STACK_CATEGORIES } from "../constants/techStack";
import { useProjectStore } from "../stores/projectStore";

export const TechStackList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { setPreferredTech } = useProjectStore();

  const handleTechSelect = (techs: string[]) => {
    setPreferredTech(techs);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          기술 스택 카테고리
        </h2>

        {/* 카테고리 탭 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {TECH_STACK_CATEGORIES.map((category) => (
            <button
              key={category.name}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.name ? null : category.name
                )
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.name
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* 기술 스택 목록 */}
        <div className="space-y-6">
          {TECH_STACK_CATEGORIES.map((category) => (
            <div
              key={category.name}
              className={`${
                selectedCategory && selectedCategory !== category.name
                  ? "hidden"
                  : ""
              }`}
            >
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                {category.name}
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.stacks.map((stack) => (
                  <div
                    key={stack.category}
                    className="p-4 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100"
                  >
                    <h4 className="mb-2 font-medium text-gray-900">
                      {stack.category}
                    </h4>
                    <p className="mb-3 text-sm text-gray-600">
                      {stack.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {stack.techs.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => handleTechSelect(stack.techs)}
                      className="w-full px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      선택하기
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
