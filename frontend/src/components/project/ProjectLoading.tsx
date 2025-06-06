import { motion, AnimatePresence } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import { RocketAnimation } from "./RocketAnimation";
import { DevTip } from "./DevTip";

export const ProjectLoading = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      role="status"
      aria-label="프로젝트 생성 중"
    >
      <div className="w-full max-w-4xl text-center">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8"
          >
            <RocketAnimation />

            <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl dark:text-gray-100">
              프로젝트를 생성하는 중...
            </h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 text-base text-gray-600 sm:text-lg dark:text-gray-300"
            >
              <FaRocket className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>AI가 열심히 프로젝트를 구상하고 있어요!</span>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <DevTip />
      </div>
    </div>
  );
};
