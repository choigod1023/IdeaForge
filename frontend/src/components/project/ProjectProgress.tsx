import { type ProjectSection } from "../../constants/projectSections";
import { cn } from "../../utils/cn";

const SECTION_LABELS: Record<ProjectSection, string> = {
  overview: "프로젝트 개요",
  type: "프로젝트 유형",
  techStack: "기술 스택",
  features: "주요 기능",
  resources: "학습 자료",
  prerequisites: "사전 지식",
  challenges: "도전 과제",
  tips: "개발 팁",
};

const getSectionLabelClass = (isCurrent: boolean, isCompleted: boolean) =>
  cn(
    "text-sm font-medium transition-colors",
    isCurrent && "text-indigo-600 dark:text-indigo-400",
    isCompleted && "text-indigo-600/70 dark:text-indigo-400/70",
    !isCurrent && !isCompleted && "text-gray-400 dark:text-gray-500"
  );

interface ProjectProgressProps {
  sections: ProjectSection[];
  currentSection: ProjectSection;
  onSectionChange?: (section: ProjectSection) => void;
}

export function ProjectProgress({
  sections,
  currentSection,
  onSectionChange,
}: ProjectProgressProps) {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      {/* 섹션 레이블 - 데스크톱에서만 전체 표시 */}
      <div className="justify-between hidden mb-4 md:flex">
        {sections.map((section, index) => {
          const isCurrentSection = currentSection === section;
          const isCompleted = sections.indexOf(currentSection) > index;

          return (
            <div
              key={section}
              className="flex-1 text-center cursor-pointer"
              onClick={() => onSectionChange?.(section)}
            >
              <span
                className={getSectionLabelClass(isCurrentSection, isCompleted)}
              >
                {SECTION_LABELS[section]}
              </span>
            </div>
          );
        })}
      </div>

      {/* 현재 섹션 레이블 - 모바일에서만 표시 */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            {SECTION_LABELS[currentSection]}
          </span>
          <span className="px-2 py-0.5 text-xs font-medium text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-900/30 rounded-full">
            {sections.indexOf(currentSection) + 1} / {sections.length}
          </span>
        </div>
      </div>

      {/* 프로그레스 바 */}
      <div className="relative">
        <div className="absolute top-0 w-full h-2 bg-gray-100 rounded-full dark:bg-gray-700">
          <div
            className="h-full transition-all duration-300 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500"
            style={{
              width: `${
                ((sections.indexOf(currentSection) + 1) / sections.length) * 100
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
