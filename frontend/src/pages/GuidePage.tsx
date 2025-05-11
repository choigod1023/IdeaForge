import { Link } from "react-router-dom";
import { TechIntroSection } from "../components/TechIntroSection";
import { motion } from "framer-motion";
import { FaRocket, FaLightbulb, FaCode, FaUsers } from "react-icons/fa";

const features = [
  {
    title: "맞춤형 프로젝트 추천",
    desc: "기술 스택, 관심사, 난이도에 따라 나만의 토이 프로젝트 아이디어를 추천받을 수 있어요.",
    icon: FaLightbulb,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
  },
  {
    title: "쉬운 시작",
    desc: "초보자도 쉽게 따라할 수 있도록 단계별로 친절하게 안내해드려요.",
    icon: FaRocket,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "다양한 카테고리",
    desc: "프론트엔드, 백엔드, AI/데이터, 모바일, 게임, IoT 등 다양한 분야를 지원합니다.",
    icon: FaCode,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    title: "커뮤니티",
    desc: "다른 개발자들과 프로젝트를 공유하고 피드백을 받으며 함께 성장해보세요.",
    icon: FaUsers,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
];

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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="relative px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block">토이 프로젝트로</span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                  실력을 키워보세요
                </span>
              </h1>
              <p className="max-w-2xl mx-auto mt-6 text-xl text-gray-600 dark:text-gray-300">
                다양한 기술 스택과 난이도의 프로젝트를 통해 실전 경험을
                쌓아보세요. 지금 바로 시작해보세요!
              </p>
            </motion.div>
          </div>
        </div>

        {/* About Section */}
        <div className="relative px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-24">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
            >
              IdeaForge란?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto mt-4 text-lg text-gray-600 dark:text-gray-300"
            >
              원하는 기술 스택과 관심사, 난이도를 선택하면
              <br className="hidden sm:block" />
              당신에게 딱 맞는 프로젝트 아이디어를 추천해주는 서비스입니다.
            </motion.p>
          </div>

          {/* Features Container */}
          <div className="mt-16">
            {/* Desktop Grid */}
            <div className="hidden grid-cols-1 gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="relative p-6 transition-all duration-300 rounded-2xl hover:shadow-lg"
                >
                  <div className={`p-3 rounded-xl ${feature.bgColor} w-fit`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Mobile Horizontal Scroll */}
            <div className="sm:hidden">
              <div className="flex gap-4 pb-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="relative flex-none w-[280px] p-6 transition-all duration-300 bg-white rounded-2xl shadow-sm hover:shadow-lg dark:bg-gray-800 snap-center"
                  >
                    <div className={`p-3 rounded-xl ${feature.bgColor} w-fit`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
              {/* Scroll Indicator */}
              <div className="flex justify-center gap-1 mt-4">
                {features.map((_, index) => (
                  <div
                    key={index}
                    className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tech Intro Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900" />
          <div className="relative">
            <TechIntroSection />
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative px-8 py-12 overflow-hidden bg-white shadow-xl rounded-2xl dark:bg-gray-800"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/5 dark:via-purple-500/5 dark:to-pink-500/5" />
            <div className="relative z-10 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
              >
                지금 바로 시작해보세요
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-2xl mx-auto mt-4 text-lg text-gray-600 dark:text-gray-300"
              >
                나만의 프로젝트를 찾아 실력을 키워보세요
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8"
              >
                <Link to="/create">
                  <button className="inline-flex items-center px-8 py-4 text-lg font-medium text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    프로젝트 생성하러 가기
                    <span className="ml-2" role="img" aria-label="rocket">
                      🚀
                    </span>
                  </button>
                </Link>
              </motion.div>
            </div>
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
