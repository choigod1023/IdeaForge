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

export const TECH_ICONS: Record<string, React.ReactNode> = {
  React: <FaReact className="w-6 h-6" />,
  Vue: <FaVuejs className="w-6 h-6" />,
  Angular: <FaAngular className="w-6 h-6" />,
  TypeScript: <SiTypescript className="w-6 h-6" />,
  JavaScript: <SiJavascript className="w-6 h-6" />,
  "HTML/CSS": (
    <div className="flex gap-1">
      <SiHtml5 className="w-6 h-6" />
      <SiCss3 className="w-6 h-6" />
    </div>
  ),
  "Tailwind CSS": <SiTailwindcss className="w-6 h-6" />,
  Redux: <SiRedux className="w-6 h-6" />,
  "Next.js": <SiNextdotjs className="w-6 h-6" />,
  "Nuxt.js": <SiNuxtdotjs className="w-6 h-6" />,
  "Node.js": <FaNodeJs className="w-6 h-6" />,
  Java: <FaJava className="w-6 h-6" />,
  Spring: <SiSpring className="w-6 h-6" />,
  Python: <FaPython className="w-6 h-6" />,
  Django: <SiDjango className="w-6 h-6" />,
  FastAPI: <SiFastapi className="w-6 h-6" />,
  PostgreSQL: <SiPostgresql className="w-6 h-6" />,
  MongoDB: <SiMongodb className="w-6 h-6" />,
  MySQL: <SiMysql className="w-6 h-6" />,
  Redis: <SiRedis className="w-6 h-6" />,
};
