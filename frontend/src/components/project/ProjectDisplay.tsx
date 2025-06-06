import { AnimatePresence } from "framer-motion";
import type { Project } from "../../types";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectNavigation } from "./ProjectNavigation";
import { ProjectProgress } from "./ProjectProgress";
import { ProjectSectionContent } from "./display/ProjectSectionContent";
import { useProjectSections } from "../../hooks/useProjectSections";
import { useProjectNavigation } from "../../hooks/useProjectNavigation";

interface ProjectDisplayProps {
  project: Project;
  onPrev?: () => void;
}

export function ProjectDisplay({ project, onPrev }: ProjectDisplayProps) {
  const { currentSection, setCurrentSection, sections } =
    useProjectSections(project);
  const { handlePrev } = useProjectNavigation({
    currentSection,
    onSectionChange: setCurrentSection,
    onPrev,
    sections,
  });

  return (
    <div className="pb-32 space-y-6">
      {/* 프로그레스 바 섹션 */}
      <ProjectProgress
        sections={sections}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />

      {/* 프로젝트 컨텐츠 */}
      <div className="overflow-hidden p-4 pb-6 bg-white shadow-sm rounded-3xl md:rounded-[2rem] md:p-6 md:pb-8 dark:bg-gray-800">
        <div className="relative space-y-8">
          <ProjectHeader project={project} />
          <AnimatePresence mode="wait">
            <ProjectSectionContent
              project={project}
              currentSection={currentSection}
            />
          </AnimatePresence>
          <ProjectNavigation
            onPrev={handlePrev}
            currentSection={currentSection}
            onSectionChange={setCurrentSection}
            sections={sections}
          />
        </div>
      </div>
    </div>
  );
}
