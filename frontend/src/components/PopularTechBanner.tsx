import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
  SiVuedotjs,
  SiAngular,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiRedux,
  SiNextdotjs,
  SiNuxtdotjs,
  SiNodedotjs,
  SiSpring,
  SiPython,
  SiDjango,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiDart,
  SiFirebase,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiOpencv,
  SiPandas,
  SiJupyter,
  SiUnity,
  SiUnrealengine,
  SiSharp,
  SiCplusplus,
  SiWireshark,
  SiMetasploit,
  SiBurpsuite,
  SiOpenssl,
  SiArduino,
  SiRaspberrypi,
  SiC,
  SiMqtt,
  SiDocker,
  SiKubernetes,
  SiAmazon,
  SiGooglecloud,
  SiGit,
  SiGithub,
  SiGitlab,
  SiBitbucket,
  SiJira,
  SiConfluence,
  SiSlack,
  SiDiscord,
  SiFigma,
  SiAdobe,
  SiAdobexd,
  SiSketch,
  SiInvision,
  SiCodecrafters,
} from "react-icons/si";
import {
  FaJava,
  FaReact,
  FaShieldAlt,
  FaMobileAlt,
  FaMicrosoft,
  FaPlus,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import { POPULAR_TECH_STACKS } from "../constants/techStack";
import { useProjectStore } from "../stores/projectStore";

interface PopularTechBannerProps {
  selectedTechs?: string[];
  onTechSelect?: (techs: string[]) => void;
}

// 기술 이름에 따른 아이콘 매핑
const techIcons: { [key: string]: IconType } = {
  React: FaReact,
  Vue: SiVuedotjs,
  Angular: SiAngular,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "HTML/CSS": SiHtml5,
  "Tailwind CSS": SiTailwindcss,
  Redux: SiRedux,
  "Next.js": SiNextdotjs,
  "Nuxt.js": SiNuxtdotjs,
  "Node.js": SiNodedotjs,
  Java: FaJava,
  Spring: SiSpring,
  Python: SiPython,
  Django: SiDjango,
  FastAPI: SiFastapi,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  Redis: SiRedis,
  "React Native": FaMobileAlt,
  Flutter: SiFlutter,
  Swift: SiSwift,
  Kotlin: SiKotlin,
  Dart: SiDart,
  Firebase: SiFirebase,
  TensorFlow: SiTensorflow,
  PyTorch: SiPytorch,
  "Scikit-learn": SiScikitlearn,
  OpenCV: SiOpencv,
  Pandas: SiPandas,
  Jupyter: SiJupyter,
  Unity: SiUnity,
  "Unreal Engine": SiUnrealengine,
  "C#": SiSharp,
  "C++": SiCplusplus,
  Wireshark: SiWireshark,
  Metasploit: SiMetasploit,
  "Burp Suite": SiBurpsuite,
  OpenSSL: SiOpenssl,
  JWT: FaShieldAlt,
  Arduino: SiArduino,
  "Raspberry Pi": SiRaspberrypi,
  C: SiC,
  MQTT: SiMqtt,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  AWS: SiAmazon,
  "Google Cloud": SiGooglecloud,
  Azure: FaMicrosoft,
  Git: SiGit,
  GitHub: SiGithub,
  GitLab: SiGitlab,
  Bitbucket: SiBitbucket,
  Jira: SiJira,
  Confluence: SiConfluence,
  Slack: SiSlack,
  Discord: SiDiscord,
  Figma: SiFigma,
  Adobe: SiAdobe,
  "Adobe XD": SiAdobexd,
  Sketch: SiSketch,
  InVision: SiInvision,
  default: SiCodecrafters,
};

// 기술 이름에 따른 색상 매핑
const techColors: { [key: string]: string } = {
  React: "#61DAFB",
  Vue: "#4FC08D",
  Angular: "#DD0031",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  "HTML/CSS": "#E34F26",
  "Tailwind CSS": "#06B6D4",
  Redux: "#764ABC",
  "Next.js": "#000000",
  "Nuxt.js": "#00DC82",
  "Node.js": "#339933",
  Java: "#007396",
  Spring: "#6DB33F",
  Python: "#3776AB",
  Django: "#092E20",
  FastAPI: "#009688",
  PostgreSQL: "#336791",
  MongoDB: "#47A248",
  MySQL: "#4479A1",
  Redis: "#DC382D",
  "React Native": "#61DAFB",
  Flutter: "#02569B",
  Swift: "#F05138",
  Kotlin: "#7F52FF",
  Dart: "#0175C2",
  Firebase: "#FFCA28",
  TensorFlow: "#FF6F00",
  PyTorch: "#EE4C2C",
  "Scikit-learn": "#F7931E",
  OpenCV: "#5C3EE8",
  Pandas: "#150458",
  Jupyter: "#F37626",
  Unity: "#000000",
  "Unreal Engine": "#313131",
  "C#": "#239120",
  "C++": "#00599C",
  Wireshark: "#1679A7",
  Metasploit: "#000000",
  "Burp Suite": "#000000",
  OpenSSL: "#721412",
  JWT: "#000000",
  Arduino: "#00979D",
  "Raspberry Pi": "#A22846",
  C: "#A8B9CC",
  MQTT: "#660066",
  Docker: "#2496ED",
  Kubernetes: "#326CE5",
  AWS: "#232F3E",
  "Google Cloud": "#4285F4",
  Azure: "#0078D4",
  Git: "#F05032",
  GitHub: "#181717",
  GitLab: "#FC6D26",
  Bitbucket: "#0052CC",
  Jira: "#0052CC",
  Confluence: "#172B4D",
  Slack: "#4A154B",
  Discord: "#5865F2",
  Figma: "#F24E1E",
  Adobe: "#FF0000",
  "Adobe XD": "#FF61F6",
  Sketch: "#F7B500",
  InVision: "#FF3366",
  default: "#6B7280",
};

export function PopularTechBanner({
  selectedTechs = [],
  onTechSelect = () => {},
}: PopularTechBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const isCreatePage = location.pathname === "/create";
  const setPreferredTech = useProjectStore((state) => state.setPreferredTech);

  // Ensure selectedTechs is always an array
  const safeSelectedTechs = Array.isArray(selectedTechs) ? selectedTechs : [];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % POPULAR_TECH_STACKS.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % POPULAR_TECH_STACKS.length);
    }
  };

  const handlePrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(
        (prev) =>
          (prev - 1 + POPULAR_TECH_STACKS.length) % POPULAR_TECH_STACKS.length
      );
    }
  };

  const handleSelectTech = (tech: string) => {
    if (!isCreatePage) return;

    const newSelectedTechs = safeSelectedTechs.includes(tech)
      ? safeSelectedTechs.filter((t) => t !== tech)
      : [...safeSelectedTechs, tech];
    onTechSelect(newSelectedTechs);
    setPreferredTech(newSelectedTechs);
  };

  const handleSelectAll = () => {
    if (!isCreatePage) return;

    const newSelectedTechs = [
      ...safeSelectedTechs,
      ...POPULAR_TECH_STACKS[currentIndex].techs,
    ];
    const uniqueTechs = [...new Set(newSelectedTechs)];
    onTechSelect(uniqueTechs);
    setPreferredTech(uniqueTechs);
  };

  const currentStack = POPULAR_TECH_STACKS[currentIndex];

  return (
    <div
      className="relative h-[150px] bg-gradient-to-r from-indigo-500 to-purple-600 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-black/5" />
      <div className="relative h-full px-3 py-4 mx-auto max-w-7xl sm:px-4 lg:px-6">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-2">
            <div className="max-w-[70%]">
              <h2 className="text-base font-semibold text-white">
                {currentStack.category}
              </h2>
              <p className="text-xs text-white/90 line-clamp-1">
                {currentStack.description}
              </p>
            </div>
            {isCreatePage && (
              <button
                onClick={handleSelectAll}
                className="flex items-center px-2.5 py-1 text-xs font-medium text-white transition-colors rounded-full bg-white/25 hover:bg-white/35 shadow-sm"
              >
                <FaPlus className="w-3 h-3 mr-1" />
                선택하기
              </button>
            )}
          </div>
          <div className="flex items-center flex-1">
            <button
              onClick={handlePrev}
              className="items-center justify-center hidden w-8 h-8 transition-colors rounded-full sm:flex text-white/90 hover:text-white hover:bg-white/10"
            >
              ←
            </button>
            <div className="flex justify-center flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onAnimationComplete={() => setIsTransitioning(false)}
                  className="flex items-center justify-center space-x-3"
                >
                  {currentStack &&
                    currentStack.techs.map((tech) => {
                      const Icon = techIcons[tech] || techIcons.default;
                      const color = techColors[tech] || techColors.default;
                      const isSelected = safeSelectedTechs.includes(tech);
                      return (
                        <button
                          key={tech}
                          onClick={() => handleSelectTech(tech)}
                          className={`flex flex-col items-center px-3 py-2 rounded-lg transition-all ${
                            isSelected
                              ? "bg-white/40 shadow-md scale-105"
                              : "bg-white/25 hover:bg-white/35 hover:scale-105"
                          } backdrop-blur-sm shadow-sm`}
                        >
                          <Icon className="w-5 h-5 mb-1" style={{ color }} />
                          <span className="text-xs font-medium text-white">
                            {tech}
                          </span>
                        </button>
                      );
                    })}
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              onClick={handleNext}
              className="items-center justify-center hidden w-8 h-8 transition-colors rounded-full sm:flex text-white/90 hover:text-white hover:bg-white/10"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
