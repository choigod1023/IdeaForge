import { Link } from "react-router-dom";
import { TechIntroSection } from "../components/TechIntroSection";
import { FeatureSection } from "../components/FeatureSection";
import { motion } from "framer-motion";

const gridPatternStyle = `
  .bg-grid-pattern {
    background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px),
      linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
    background-size: 24px 24px;
  }
  @media (prefers-color-scheme: dark) {
    .bg-grid-pattern {
      background-image: linear-gradient(to right, #374151 1px, transparent 1px),
        linear-gradient(to bottom, #374151 1px, transparent 1px);
    }
  }
`;

const GuidePage = () => {
  return (
    <>
      <style>{gridPatternStyle}</style>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900/50">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative px-4 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32"
          >
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block">IdeaForge로</span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-500">
                  실력을 키워보세요
                </span>
              </h1>
            </div>
          </motion.div>
        </div>

        {/* Feature Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <FeatureSection />
        </motion.div>

        {/* Tech Intro Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent dark:via-gray-800/50" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <TechIntroSection />
          </motion.div>
        </div>

        {/* CTA Section */}
        <div className="relative px-4 py-16 pb-32 mx-auto text-center max-w-7xl sm:px-6 lg:px-8 sm:pb-16">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/30 dark:to-gray-900/30" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Link to="/create">
              <button className="inline-flex items-center px-8 py-4 text-lg font-medium text-white transition-all duration-300 shadow-lg rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                프로젝트 생성하러 가기
                <span className="ml-2" role="img" aria-label="rocket">
                  🚀
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      <style>{`
        ${gridPatternStyle}
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default GuidePage;
