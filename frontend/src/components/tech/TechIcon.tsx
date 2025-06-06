import {
  FaReact,
  FaVuejs,
  FaAngular,
  FaNodeJs,
  FaJava,
  FaPython,
} from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiRedux,
  SiNextdotjs,
  SiNuxtdotjs,
  SiSpring,
  SiDjango,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiRedis,
} from "react-icons/si";
import { cn } from "../../utils/cn";

interface TechIconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

// 기술 스택 ID와 이름 매핑
const TECH_NAME_MAP: Record<string, string> = {
  react: "React",
  vue: "Vue",
  angular: "Angular",
  typescript: "TypeScript",
  javascript: "JavaScript",
  "html-css": "HTML/CSS",
  tailwindcss: "Tailwind CSS",
  redux: "Redux",
  nextjs: "Next.js",
  nuxtjs: "Nuxt.js",
  nodejs: "Node.js",
  java: "Java",
  spring: "Spring",
  python: "Python",
  django: "Django",
  fastapi: "FastAPI",
  postgresql: "PostgreSQL",
  mongodb: "MongoDB",
  mysql: "MySQL",
  redis: "Redis",
};

const TECH_ICONS: Record<string, React.ReactNode> = {
  React: <FaReact className="w-5 h-5 text-[#61DAFB]" />,
  Vue: <FaVuejs className="w-5 h-5 text-[#4FC08D]" />,
  Angular: <FaAngular className="w-5 h-5 text-[#DD0031]" />,
  TypeScript: <SiTypescript className="w-5 h-5 text-[#3178C6]" />,
  JavaScript: <SiJavascript className="w-5 h-5 text-[#F7DF1E]" />,
  "HTML/CSS": (
    <div className="flex gap-1">
      <SiHtml5 className="w-5 h-5 text-[#E34F26]" />
      <SiCss3 className="w-5 h-5 text-[#1572B6]" />
    </div>
  ),
  "Tailwind CSS": <SiTailwindcss className="w-5 h-5 text-[#06B6D4]" />,
  Redux: <SiRedux className="w-5 h-5 text-[#764ABC]" />,
  "Next.js": <SiNextdotjs className="w-5 h-5 text-[#000000]" />,
  "Nuxt.js": <SiNuxtdotjs className="w-5 h-5 text-[#00DC82]" />,
  "Node.js": <FaNodeJs className="w-5 h-5 text-[#339933]" />,
  Java: <FaJava className="w-5 h-5 text-[#007396]" />,
  Spring: <SiSpring className="w-5 h-5 text-[#6DB33F]" />,
  Python: <FaPython className="w-5 h-5 text-[#3776AB]" />,
  Django: <SiDjango className="w-5 h-5 text-[#092E20]" />,
  FastAPI: <SiFastapi className="w-5 h-5 text-[#009688]" />,
  PostgreSQL: <SiPostgresql className="w-5 h-5 text-[#336791]" />,
  MongoDB: <SiMongodb className="w-5 h-5 text-[#47A248]" />,
  MySQL: <SiMysql className="w-5 h-5 text-[#4479A1]" />,
  Redis: <SiRedis className="w-5 h-5 text-[#DC382D]" />,
};

export function TechIcon({ name, className, style }: TechIconProps) {
  // ID 형식이면 이름으로 변환
  const displayName = TECH_NAME_MAP[name.toLowerCase()] || name;
  const Icon = TECH_ICONS[displayName] || TECH_ICONS["Node.js"]; // 기본값으로 Node.js 아이콘 사용

  if (typeof Icon === "string") {
    return null;
  }

  return (
    <div
      className={cn("flex items-center justify-center", className)}
      style={style}
    >
      {Icon}
    </div>
  );
}
