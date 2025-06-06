import { TechIcon } from "../tech/TechIcon";
import { TECH_COLORS } from "../../constants/techStack/colors";
import type { TechStackItem } from "../../constants/techStack/types";

interface TechStackCardProps {
  tech: TechStackItem;
}

export function TechStackCard({ tech }: TechStackCardProps) {
  const techName = typeof tech === "string" ? tech : tech.name;
  const descriptions =
    typeof tech === "string"
      ? ["이 기술에 대한 설명이 준비 중이에요."]
      : tech.descriptions;

  const colors = TECH_COLORS[techName] || TECH_COLORS.default;

  return (
    <div className="relative overflow-hidden bg-white border border-gray-200 rounded-2xl dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className={colors.text}>
            <TechIcon name={techName} />
          </div>
          <h4
            className={`text-lg font-medium ${colors.text} ${colors.darkText}`}
          >
            {techName}
          </h4>
        </div>
        <ul className="space-y-2">
          {descriptions.map((desc: string, idx: number) => (
            <li key={idx} className="text-sm text-gray-600 dark:text-gray-200">
              {desc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
