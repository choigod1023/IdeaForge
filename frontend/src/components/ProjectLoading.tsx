import { motion, AnimatePresence } from "framer-motion";
import { FaRocket, FaLightbulb } from "react-icons/fa";
import { useEffect, useState } from "react";

// 개발 팁 목록
const DEV_TIPS = [
  "코드를 작성하기 전에 먼저 설계를 해보세요. 설계는 시간을 절약해줍니다.",
  "주석은 '왜'를 설명해야 합니다. '무엇'을 하는지는 코드가 이미 보여줍니다.",
  "작은 단위로 테스트하고, 자주 커밋하세요. 이는 문제를 빠르게 발견하는 데 도움이 됩니다.",
  "코드 리뷰는 배움의 좋은 기회입니다. 다른 개발자의 관점을 받아들이세요.",
  "버그를 고치기 전에 먼저 재현 방법을 찾아보세요.",
  "깃 커밋 메시지는 명확하고 구체적으로 작성하세요.",
  "IDE의 단축키를 익히면 생산성이 크게 향상됩니다.",
  "정기적으로 코드를 리팩토링하세요. 깔끔한 코드는 유지보수가 쉽습니다.",
  "문서화는 코드만큼 중요합니다. 특히 API나 라이브러리를 만들 때는 더욱 그렇습니다.",
  "에러 메시지를 자세히 읽어보세요. 대부분의 경우 해결 방법을 알려줍니다.",
  "코드 스니펫을 만들어두면 반복 작업을 줄일 수 있습니다.",
  "디버깅은 과학적 방법을 따르세요: 가설을 세우고, 테스트하고, 결과를 분석하세요.",
  "버전 관리는 필수입니다. 깃을 사용하지 않는다면 지금 바로 시작하세요.",
  "코드 포맷팅 도구를 사용하면 일관된 코드 스타일을 유지할 수 있습니다.",
  "성능 최적화는 측정 후에 하세요. 직관은 종종 틀립니다.",
];

export const ProjectLoading = () => {
  const [currentTip, setCurrentTip] = useState("");

  // 랜덤 팁 선택
  useEffect(() => {
    setCurrentTip(DEV_TIPS[Math.floor(Math.random() * DEV_TIPS.length)]);
    const tipInterval = setInterval(() => {
      setCurrentTip(DEV_TIPS[Math.floor(Math.random() * DEV_TIPS.length)]);
    }, 6000);
    return () => clearInterval(tipInterval);
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      role="status"
      aria-label="프로젝트 생성 중"
    >
      <div className="w-full max-w-2xl p-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8"
          >
            {/* 로켓 애니메이션 */}
            <div className="relative w-64 h-64 mx-auto mb-8 overflow-hidden">
              {/* 배경 별들 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      x: Math.random() * 256,
                      y: Math.random() * 256,
                      scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                      y: [null, Math.random() * 256],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: Math.random() * 2 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    aria-hidden="true"
                  />
                ))}
              </motion.div>

              {/* 구름들 */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`cloud-${i}`}
                  initial={{ x: -100, y: 40 + i * 60 }}
                  animate={{ x: 300 }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: i * 2,
                    ease: "linear",
                  }}
                  className="absolute"
                  aria-hidden="true"
                >
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, j) => (
                      <div
                        key={`cloud-part-${j}`}
                        className="w-8 h-8 rounded-full bg-white/20 dark:bg-gray-700/20 blur-sm"
                      />
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* 로켓 */}
              <motion.div
                initial={{ x: -100, y: 100 }}
                animate={{
                  x: [null, 100, 200, 300],
                  y: [null, 80, 120, 80],
                  rotate: [null, -10, 10, -10],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute"
                aria-hidden="true"
              >
                <div className="relative">
                  {/* 로켓 본체 */}
                  <div className="w-12 h-16 rounded-t-full bg-gradient-to-b from-red-500 to-red-600">
                    {/* 창문 */}
                    <div className="absolute w-4 h-4 -translate-x-1/2 bg-blue-400 rounded-full top-4 left-1/2" />
                    {/* 날개 */}
                    <div className="absolute bottom-0 left-0 w-4 h-8 -skew-x-12 bg-red-600" />
                    <div className="absolute bottom-0 right-0 w-4 h-8 skew-x-12 bg-red-600" />
                  </div>
                  {/* 불꽃 */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -translate-x-1/2 -bottom-4 left-1/2"
                  >
                    <div className="flex gap-1">
                      <div className="w-2 h-6 bg-orange-500 rounded-b-full" />
                      <div className="w-3 h-8 bg-yellow-500 rounded-b-full" />
                      <div className="w-2 h-6 bg-orange-500 rounded-b-full" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

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

        {/* 개발 팁 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTip}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-900/30"
            role="complementary"
            aria-label="개발 팁"
          >
            <div className="flex items-center justify-center gap-2 mb-3 text-base text-indigo-600 sm:text-lg dark:text-indigo-400">
              <FaLightbulb className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-medium">개발 팁</span>
            </div>
            <p className="text-base text-gray-700 break-keep-all whitespace-pre-wrap sm:text-lg dark:text-gray-300 [word-break:keep-all]">
              {currentTip.split(/(\s+)/).map((word, index) => (
                <span key={index} className="inline-block">
                  {word}
                </span>
              ))}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
