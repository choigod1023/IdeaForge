import { motion, AnimatePresence } from "framer-motion";
import { FaLightbulb } from "react-icons/fa";
import { useDevTips } from "../../../hooks/useDevTips";

export const DevTip = () => {
  const currentTip = useDevTips();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentTip}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="p-6 rounded-3xl"
        role="complementary"
        aria-label="개발 팁"
      >
        <div className="flex items-center justify-center gap-2 mb-3 text-base text-indigo-600 sm:text-lg dark:text-indigo-400">
          <FaLightbulb className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="font-medium">개발 팁</span>
        </div>
        <div className="h-[120px] overflow-y-auto px-4">
          <p className="text-base text-gray-700 break-keep-all whitespace-pre-wrap sm:text-lg dark:text-gray-300 [word-break:keep-all]">
            {currentTip.split(/[.!?]+\s+/).map((sentence, index, array) => (
              <span key={index} className="block mb-2 last:mb-0">
                {sentence.split(/(\s+)/).map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block">
                    {word}
                  </span>
                ))}
                {index < array.length - 1 ? "." : ""}
              </span>
            ))}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
