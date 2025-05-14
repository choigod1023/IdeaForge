import { motion } from "framer-motion";
import { FaRocket, FaLightbulb, FaCode, FaUsers } from "react-icons/fa";

const features = [
  {
    title: "맞춤형 추천",
    desc: "나에게 딱 맞는 프로젝트를 추천해요",
    icon: FaLightbulb,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
  },
  {
    title: "쉬운 시작",
    desc: "단계별로 차근차근 시작해요",
    icon: FaRocket,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "다양한 분야",
    desc: "다양한 기술 분야를 경험해요",
    icon: FaCode,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    title: "커뮤니티",
    desc: "함께 성장하는 개발자 커뮤니티예요",
    icon: FaUsers,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
];

export const FeatureSection = () => {
  return (
    <div className="relative px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-24">
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
        >
          IdeaForges는?
        </motion.h2>
      </div>

      {/* Features Container */}
      <div className="mt-16">
        {/* Mobile Features Grid */}
        <div className="sm:hidden">
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-4 transition-all duration-300 bg-white border shadow-sm border-gray-200/80 rounded-3xl hover:shadow-md dark:bg-gray-800 dark:border-gray-600/50"
              >
                <div className={`p-2.5 rounded-2xl ${feature.bgColor} w-fit`}>
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white whitespace-normal break-normal [word-break:keep-all]">
                  {feature.title}
                </h3>
                <p className="mt-1 text-xs leading-tight text-gray-600 dark:text-gray-300 whitespace-normal break-normal [word-break:keep-all]">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden grid-cols-1 gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative p-6 transition-all duration-300 bg-white border shadow-sm border-gray-200/80 rounded-3xl hover:shadow-md dark:bg-gray-800 dark:border-gray-600/50"
            >
              <div className={`p-3 rounded-2xl ${feature.bgColor} w-fit`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white whitespace-normal break-normal [word-break:keep-all]">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 whitespace-normal break-normal [word-break:keep-all]">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
