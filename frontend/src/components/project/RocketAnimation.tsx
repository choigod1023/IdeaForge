import { motion } from "framer-motion";

export const RocketAnimation = () => (
  <div className="relative w-64 h-64 mx-auto mb-8 overflow-hidden">
    {/* 배경 별들 */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0"
    >
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 256,
            y: -Math.random() * 256,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, 256],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 2 + 1.5,
            repeat: Infinity,
            delay: Math.random() * 1.5,
            ease: "linear",
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
        initial={{ x: -100, y: -40 - i * 60 }}
        animate={{
          x: 300,
          opacity: [0.2, 0.4, 0.2],
        }}
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
              className="w-16 h-16 rounded-full bg-white/20 dark:bg-gray-700/20 blur-sm"
            />
          ))}
        </div>
      </motion.div>
    ))}

    {/* 로켓 */}
    <div className="absolute -translate-x-1/2 left-1/2 top-1/3">
      <div className="relative">
        {/* 로켓 본체 */}
        <div className="relative w-16 h-24 rounded-t-full bg-gradient-to-b from-red-500 to-red-600">
          {/* 창문 */}
          <div className="absolute w-6 h-6 -translate-x-1/2 bg-blue-400 rounded-full top-6 left-1/2" />
          {/* 날개 */}
          <div className="absolute bottom-0 left-0 w-6 h-12 -skew-x-12 bg-red-600" />
          <div className="absolute bottom-0 right-0 w-6 h-12 skew-x-12 bg-red-600" />
        </div>

        {/* 불꽃 */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 0.15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-0 right-0 mx-auto origin-bottom -bottom-4 -z-10"
        >
          <div className="flex justify-center gap-0.5">
            <motion.div
              animate={{
                height: ["16px", "20px", "16px"],
                rotate: [-8, 8, -8],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-3 rounded-b-full origin-bottom bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 shadow-[0_0_8px_rgba(251,146,60,0.5)]"
            />
            <motion.div
              animate={{
                height: ["24px", "28px", "24px"],
                rotate: [-5, 5, -5],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-4 rounded-b-full origin-bottom bg-gradient-to-b from-yellow-300 via-yellow-400 to-orange-500 shadow-[0_0_12px_rgba(251,191,36,0.6)]"
            />
            <motion.div
              animate={{
                height: ["16px", "20px", "16px"],
                rotate: [-8, 8, -8],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-3 rounded-b-full origin-bottom bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 shadow-[0_0_8px_rgba(251,146,60,0.5)]"
            />
          </div>
          {/* 불꽃 이펙트 */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-12 h-4 -translate-x-1/2 rounded-full -bottom-1 left-1/2 bg-gradient-to-t from-orange-500/20 to-transparent blur-sm"
          />
        </motion.div>
      </div>
    </div>
  </div>
);
