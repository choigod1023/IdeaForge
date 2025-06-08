import { FaTools } from "react-icons/fa";
import type { TechStackItem } from "../../../styles/techStack/types";
import { TechStackCard } from "./TechStackCard";

interface ProjectTechStackProps {
  techStack: TechStackItem[];
}

export function ProjectTechStack({ techStack }: ProjectTechStackProps) {
  return (
    <div className="space-y-6">
      <h3 className="flex items-center text-lg font-semibold text-gray-900 sm:text-xl md:text-2xl dark:text-white">
        <FaTools className="w-5 h-5 mr-3 text-indigo-500 sm:w-6 sm:h-6 dark:text-indigo-300" />
        기술 스택
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        {techStack.map((tech) => (
          <TechStackCard
            key={typeof tech === "string" ? tech : tech.name}
            tech={tech}
          />
        ))}
      </div>
    </div>
  );
}
