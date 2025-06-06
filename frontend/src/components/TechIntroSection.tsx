import { useRef } from "react";
import { TECH_CATEGORIES } from "../constants/techCategories";

export const TechIntroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full py-8 sm:py-12">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl lg:text-4xl">
            다양한 기술을 활용해요
          </h2>
        </div>

        <div className="mt-12">
          {/* Horizontally Scrollable Container */}
          <div
            ref={containerRef}
            className="flex gap-4 pb-6 overflow-x-auto select-none snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              scrollSnapType: "x proximity",
              scrollBehavior: "smooth",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              marginLeft: "-1rem",
              marginRight: "-1rem",
              width: "calc(100% + 2rem)",
              userSelect: "none",
              touchAction: "pan-x",
            }}
            onMouseDown={(e) => {
              const container = containerRef.current;
              if (!container) return;

              const startX = e.pageX - container.offsetLeft;
              const scrollLeft = container.scrollLeft;

              const handleMouseMove = (e: MouseEvent) => {
                const x = e.pageX - container.offsetLeft;
                const walk = (x - startX) * 1.5;
                container.scrollTo({
                  left: scrollLeft - walk,
                  behavior: "auto",
                });
              };

              const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
                container.style.cursor = "grab";
              };

              document.addEventListener("mousemove", handleMouseMove);
              document.addEventListener("mouseup", handleMouseUp);
              container.style.cursor = "grabbing";
            }}
          >
            {TECH_CATEGORIES.map((category) => (
              <div
                key={category.title}
                className="flex-none w-[280px] sm:w-[320px] snap-center"
              >
                <div className="h-full p-4 transition-all duration-300 shadow-sm rounded-3xl sm:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-md hover:bg-white dark:hover:bg-gray-800">
                  <div className="flex items-center space-x-3">
                    <div
                      className="p-2 rounded-2xl"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <category.icon
                        className="w-5 h-5"
                        style={{ color: category.color }}
                      />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white whitespace-normal break-normal [word-break:keep-all]">
                      {category.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 whitespace-normal break-normal [word-break:keep-all]">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {category.techs.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-2 py-0.5 rounded-2xl text-xs font-medium bg-gray-50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 whitespace-normal break-normal [word-break:keep-all]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hide scrollbar for Webkit browsers */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};
