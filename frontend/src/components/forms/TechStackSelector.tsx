import { useState } from "react";
import type { IconType } from "react-icons";
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
} from "react-icons/si";
import {
  FaJava,
  FaReact,
  FaShieldAlt,
  FaMobileAlt,
  FaMicrosoft,
} from "react-icons/fa";

type TechCategory = {
  label: string;
  icon: IconType;
  color: string;
  techs: string[];
};

const TECH_CATEGORIES: Record<string, TechCategory> = {
  frontend: {
    label: "프론트엔드",
    icon: FaReact,
    color: "#61DAFB",
    techs: [
      "React",
      "Vue",
      "Angular",
      "TypeScript",
      "JavaScript",
      "HTML/CSS",
      "Tailwind CSS",
      "Redux",
      "Next.js",
      "Nuxt.js",
    ],
  },
  backend: {
    label: "백엔드",
    icon: SiNodedotjs,
    color: "#339933",
    techs: ["Node.js", "Java", "Spring", "Python", "Django", "FastAPI"],
  },
  database: {
    label: "데이터베이스",
    icon: SiPostgresql,
    color: "#336791",
    techs: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
  },
  mobile: {
    label: "모바일",
    icon: FaMobileAlt,
    color: "#61DAFB",
    techs: ["React Native", "Flutter", "Swift", "Kotlin", "Dart", "Firebase"],
  },
  "ai-ml": {
    label: "AI/ML",
    icon: SiTensorflow,
    color: "#FF6F00",
    techs: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV"],
  },
  data: {
    label: "데이터 분석",
    icon: SiPandas,
    color: "#150458",
    techs: ["Pandas", "Jupyter"],
  },
  game: {
    label: "게임",
    icon: SiUnity,
    color: "#000000",
    techs: ["Unity", "Unreal Engine", "C#", "C++"],
  },
  security: {
    label: "보안",
    icon: FaShieldAlt,
    color: "#000000",
    techs: ["Wireshark", "Metasploit", "Burp Suite", "OpenSSL", "JWT"],
  },
  embedded: {
    label: "임베디드",
    icon: SiArduino,
    color: "#00979D",
    techs: ["Arduino", "Raspberry Pi", "C", "MQTT"],
  },
  devops: {
    label: "DevOps & 클라우드",
    icon: SiDocker,
    color: "#2496ED",
    techs: ["Docker", "Kubernetes", "AWS", "Google Cloud", "Azure"],
  },
  tools: {
    label: "개발 도구",
    icon: SiGit,
    color: "#F05032",
    techs: ["Git", "GitHub", "GitLab", "Bitbucket", "Jira", "Confluence"],
  },
  communication: {
    label: "커뮤니케이션",
    icon: SiSlack,
    color: "#4A154B",
    techs: ["Slack", "Discord"],
  },
  design: {
    label: "디자인",
    icon: SiFigma,
    color: "#F24E1E",
    techs: ["Figma", "Adobe", "Adobe XD", "Sketch", "InVision"],
  },
} as const;

const TECH_STACK_OPTIONS = [
  // 웹 프론트엔드
  { id: "React", label: "React", icon: FaReact, color: "#61DAFB" },
  { id: "Vue", label: "Vue", icon: SiVuedotjs, color: "#4FC08D" },
  { id: "Angular", label: "Angular", icon: SiAngular, color: "#DD0031" },
  {
    id: "TypeScript",
    label: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
  },
  {
    id: "JavaScript",
    label: "JavaScript",
    icon: SiJavascript,
    color: "#F7DF1E",
  },
  { id: "HTML/CSS", label: "HTML/CSS", icon: SiHtml5, color: "#E34F26" },
  {
    id: "Tailwind CSS",
    label: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#06B6D4",
  },
  { id: "Redux", label: "Redux", icon: SiRedux, color: "#764ABC" },
  { id: "Next.js", label: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { id: "Nuxt.js", label: "Nuxt.js", icon: SiNuxtdotjs, color: "#00DC82" },

  // 백엔드
  { id: "Node.js", label: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { id: "Java", label: "Java", icon: FaJava, color: "#007396" },
  { id: "Spring", label: "Spring", icon: SiSpring, color: "#6DB33F" },
  { id: "Python", label: "Python", icon: SiPython, color: "#3776AB" },
  { id: "Django", label: "Django", icon: SiDjango, color: "#092E20" },
  { id: "FastAPI", label: "FastAPI", icon: SiFastapi, color: "#009688" },

  // 데이터베이스
  {
    id: "PostgreSQL",
    label: "PostgreSQL",
    icon: SiPostgresql,
    color: "#336791",
  },
  { id: "MongoDB", label: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { id: "MySQL", label: "MySQL", icon: SiMysql, color: "#4479A1" },
  { id: "Redis", label: "Redis", icon: SiRedis, color: "#DC382D" },

  // 모바일
  {
    id: "React Native",
    label: "React Native",
    icon: FaMobileAlt,
    color: "#61DAFB",
  },
  { id: "Flutter", label: "Flutter", icon: SiFlutter, color: "#02569B" },
  { id: "Swift", label: "Swift", icon: SiSwift, color: "#F05138" },
  { id: "Kotlin", label: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
  { id: "Dart", label: "Dart", icon: SiDart, color: "#0175C2" },
  { id: "Firebase", label: "Firebase", icon: SiFirebase, color: "#FFCA28" },

  // AI/ML
  {
    id: "TensorFlow",
    label: "TensorFlow",
    icon: SiTensorflow,
    color: "#FF6F00",
  },
  { id: "PyTorch", label: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
  {
    id: "Scikit-learn",
    label: "Scikit-learn",
    icon: SiScikitlearn,
    color: "#F7931E",
  },
  { id: "OpenCV", label: "OpenCV", icon: SiOpencv, color: "#5C3EE8" },

  // 데이터 분석
  { id: "Pandas", label: "Pandas", icon: SiPandas, color: "#150458" },
  { id: "Jupyter", label: "Jupyter", icon: SiJupyter, color: "#F37626" },

  // 게임
  { id: "Unity", label: "Unity", icon: SiUnity, color: "#000000" },
  {
    id: "Unreal Engine",
    label: "Unreal Engine",
    icon: SiUnrealengine,
    color: "#313131",
  },
  { id: "C#", label: "C#", icon: SiSharp, color: "#239120" },
  { id: "C++", label: "C++", icon: SiCplusplus, color: "#00599C" },

  // 보안
  { id: "Wireshark", label: "Wireshark", icon: SiWireshark, color: "#1679A7" },
  {
    id: "Metasploit",
    label: "Metasploit",
    icon: SiMetasploit,
    color: "#000000",
  },
  {
    id: "Burp Suite",
    label: "Burp Suite",
    icon: SiBurpsuite,
    color: "#000000",
  },
  { id: "OpenSSL", label: "OpenSSL", icon: SiOpenssl, color: "#721412" },
  { id: "JWT", label: "JWT", icon: FaShieldAlt, color: "#000000" },

  // 임베디드
  { id: "Arduino", label: "Arduino", icon: SiArduino, color: "#00979D" },
  {
    id: "Raspberry Pi",
    label: "Raspberry Pi",
    icon: SiRaspberrypi,
    color: "#A22846",
  },
  { id: "C", label: "C", icon: SiC, color: "#A8B9CC" },
  { id: "MQTT", label: "MQTT", icon: SiMqtt, color: "#660066" },

  // DevOps & 클라우드
  { id: "Docker", label: "Docker", icon: SiDocker, color: "#2496ED" },
  {
    id: "Kubernetes",
    label: "Kubernetes",
    icon: SiKubernetes,
    color: "#326CE5",
  },
  { id: "AWS", label: "AWS", icon: SiAmazon, color: "#232F3E" },
  {
    id: "Google Cloud",
    label: "Google Cloud",
    icon: SiGooglecloud,
    color: "#4285F4",
  },
  { id: "Azure", label: "Azure", icon: FaMicrosoft, color: "#0078D4" },

  // 개발 도구
  { id: "Git", label: "Git", icon: SiGit, color: "#F05032" },
  { id: "GitHub", label: "GitHub", icon: SiGithub, color: "#181717" },
  { id: "GitLab", label: "GitLab", icon: SiGitlab, color: "#FC6D26" },
  { id: "Bitbucket", label: "Bitbucket", icon: SiBitbucket, color: "#0052CC" },
  { id: "Jira", label: "Jira", icon: SiJira, color: "#0052CC" },
  {
    id: "Confluence",
    label: "Confluence",
    icon: SiConfluence,
    color: "#172B4D",
  },

  // 커뮤니케이션
  { id: "Slack", label: "Slack", icon: SiSlack, color: "#4A154B" },
  { id: "Discord", label: "Discord", icon: SiDiscord, color: "#5865F2" },

  // 디자인
  { id: "Figma", label: "Figma", icon: SiFigma, color: "#F24E1E" },
  { id: "Adobe", label: "Adobe", icon: SiAdobe, color: "#FF0000" },
  { id: "Adobe XD", label: "Adobe XD", icon: SiAdobexd, color: "#FF61F6" },
  { id: "Sketch", label: "Sketch", icon: SiSketch, color: "#F7B500" },
  { id: "InVision", label: "InVision", icon: SiInvision, color: "#FF3366" },
];

interface TechStackSelectorProps {
  selectedTechs: string[];
  onTechSelect: (techs: string[]) => void;
}

export const TechStackSelector = ({
  selectedTechs,
  onTechSelect,
}: TechStackSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = Object.entries(TECH_CATEGORIES).map(([id, category]) => ({
    id,
    label: category.label,
    icon: category.icon,
    color: category.color,
  }));

  const getCategoryForTech = (techId: string) => {
    for (const [categoryId, category] of Object.entries(TECH_CATEGORIES)) {
      if (category.techs.includes(techId)) {
        return categoryId;
      }
    }
    return "all";
  };

  const filteredTechs = TECH_STACK_OPTIONS.filter((tech) => {
    const matchesSearch = tech.label
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      getCategoryForTech(tech.id) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedTechs = filteredTechs.reduce((acc, tech) => {
    const category = getCategoryForTech(tech.id);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tech);
    return acc;
  }, {} as Record<string, typeof TECH_STACK_OPTIONS>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="기술 스택 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2.5 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[200px] bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        >
          <option value="all" className="dark:bg-gray-800">
            전체
          </option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
              className="dark:bg-gray-800"
            >
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory === "all" ? (
        // Show all categories with headers
        Object.entries(groupedTechs).map(([categoryId, techs]) => {
          const category =
            TECH_CATEGORIES[categoryId as keyof typeof TECH_CATEGORIES];
          const CategoryIcon = category.icon;
          return (
            <div key={categoryId} className="space-y-3">
              <div className="flex items-center pb-2 space-x-2 border-b border-gray-200">
                <CategoryIcon
                  className="w-6 h-6"
                  style={{ color: category.color }}
                />
                <h3 className="text-lg font-semibold text-gray-900">
                  {category.label}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {techs.map((tech) => {
                  const Icon = tech.icon;
                  const isSelected = selectedTechs.includes(tech.id);
                  return (
                    <button
                      key={tech.id}
                      type="button"
                      onClick={() => {
                        const newTechs = isSelected
                          ? selectedTechs.filter((t) => t !== tech.id)
                          : [...selectedTechs, tech.id];
                        onTechSelect(newTechs);
                      }}
                      className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                        isSelected
                          ? "border-blue-500 bg-blue-50/80 dark:bg-blue-900/30 dark:border-blue-400 shadow-sm"
                          : "border-gray-200 hover:border-blue-300 dark:border-gray-600 dark:hover:border-blue-400 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-700/80"
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-md ${
                          isSelected
                            ? "bg-white/90 dark:bg-gray-800/90"
                            : "bg-gray-50/90 dark:bg-gray-700/90"
                        }`}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: tech.color }}
                        />
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          isSelected
                            ? "text-blue-900 dark:text-blue-100"
                            : "text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {tech.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })
      ) : (
        // Show only selected category
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredTechs.map((tech) => {
            const Icon = tech.icon;
            const isSelected = selectedTechs.includes(tech.id);
            return (
              <button
                key={tech.id}
                type="button"
                onClick={() => {
                  const newTechs = isSelected
                    ? selectedTechs.filter((t) => t !== tech.id)
                    : [...selectedTechs, tech.id];
                  onTechSelect(newTechs);
                }}
                className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                  isSelected
                    ? "border-blue-500 bg-blue-50/80 dark:bg-blue-900/30 dark:border-blue-400 shadow-sm"
                    : "border-gray-200 hover:border-blue-300 dark:border-gray-600 dark:hover:border-blue-400 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-700/80"
                }`}
              >
                <div
                  className={`p-1.5 rounded-md ${
                    isSelected
                      ? "bg-white/90 dark:bg-gray-800/90"
                      : "bg-gray-50/90 dark:bg-gray-700/90"
                  }`}
                >
                  <Icon className="w-5 h-5" style={{ color: tech.color }} />
                </div>
                <span
                  className={`text-sm font-medium ${
                    isSelected
                      ? "text-blue-900 dark:text-blue-100"
                      : "text-gray-900 dark:text-gray-100"
                  }`}
                >
                  {tech.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
