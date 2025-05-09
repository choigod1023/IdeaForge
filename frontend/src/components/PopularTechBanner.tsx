import { useState, useEffect } from "react";
import { POPULAR_TECH_STACKS } from "../constants/techStack";
import { useProjectStore } from "../stores/projectStore";

export const PopularTechBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { setPreferredTech } = useProjectStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === POPULAR_TECH_STACKS.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 300);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const currentStack = POPULAR_TECH_STACKS[currentIndex];

  const handleSelect = () => {
    setPreferredTech(currentStack.techs);
  };

  return (
    <div className="px-4 py-4 text-white bg-gradient-to-r from-indigo-500 to-purple-600 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex-1 min-w-0">
            <h3
              className={`text-lg font-semibold mb-1 truncate transition-all duration-300 ${
                isTransitioning
                  ? "opacity-0 translate-y-2"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {currentStack.category} 인기 기술 스택
            </h3>
            <p
              className={`text-sm opacity-90 line-clamp-2 transition-all duration-300 ${
                isTransitioning
                  ? "opacity-0 translate-y-2"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {currentStack.description}
            </p>
          </div>
          <div className="flex flex-col items-start min-w-0 gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-2">
              {currentStack.techs.map((tech) => (
                <span
                  key={tech}
                  className={`px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm whitespace-nowrap transition-all duration-300 ${
                    isTransitioning
                      ? "opacity-0 scale-95"
                      : "opacity-100 scale-100"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
            <button
              onClick={handleSelect}
              className={`px-3 py-1 bg-white text-indigo-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-all duration-300 whitespace-nowrap ${
                isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              선택하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
