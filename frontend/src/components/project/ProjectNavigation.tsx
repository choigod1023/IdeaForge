import { FaArrowLeft, FaArrowRight, FaList } from "react-icons/fa";
import { motion } from "framer-motion";
import type { ProjectSection } from "../../constants/projectSections";
import { sectionNames } from "../../constants/projectSections";
import { useProjectNavigation } from "../../hooks/useProjectNavigation";

interface ProjectNavigationProps {
  onPrev: () => void;
  currentSection: ProjectSection;
  onSectionChange: (section: ProjectSection) => void;
  sections: ProjectSection[];
}

export function ProjectNavigation({
  onPrev,
  currentSection,
  onSectionChange,
  sections,
}: ProjectNavigationProps) {
  const {
    isFirstSection,
    isLastSection,
    prevSection,
    nextSection,
    handlePrev,
    handleNext,
  } = useProjectNavigation({
    currentSection,
    onSectionChange,
    onPrev,
    sections,
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 border-t border-gray-100 bg-white/95 backdrop-blur-sm dark:bg-gray-800/95 dark:border-gray-700">
      <div className="flex justify-center max-w-4xl mx-auto">
        <div className="flex w-full gap-4">
          {!isFirstSection && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePrev}
              className="flex items-center justify-center flex-1 px-8 py-4 text-base font-medium text-white transition-colors bg-gray-600 shadow-lg rounded-xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <FaArrowLeft className="mr-2" />
              {prevSection && sectionNames[prevSection]}
            </motion.button>
          )}

          {!isLastSection && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="flex items-center justify-center flex-1 px-8 py-4 text-base font-medium text-white transition-colors bg-indigo-600 shadow-lg rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {nextSection && sectionNames[nextSection]}
              <FaArrowRight className="ml-2" />
            </motion.button>
          )}

          {isLastSection && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="flex items-center justify-center flex-1 px-8 py-4 text-base font-medium text-white transition-colors bg-indigo-600 shadow-lg rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              목록
              <FaList className="ml-2" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
