import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../../types";
import { ProjectDescription } from "./ProjectDescription";
import { ProjectFeatures } from "./ProjectFeatures";
import { ProjectResources } from "./ProjectResources";
import { ProjectType } from "./ProjectType";
import { ProjectTechStack } from "./ProjectTechStack";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectPrerequisites } from "./ProjectPrerequisites";
import { ProjectChallenges } from "./ProjectChallenges";
import { ProjectTips } from "./ProjectTips";
import { ProjectNavigation, type ProjectSection } from "./ProjectNavigation";
import { ProjectProgress } from "./ProjectProgress";

interface ProjectDisplayProps {
  project: Project;
  projects: Project[];
  onPrev?: () => void;
}

export function ProjectDisplay({
  project,
  projects,
  onPrev,
}: ProjectDisplayProps) {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] =
    useState<ProjectSection>("overview");
  const currentIndex = projects.findIndex((p) => p.id === project.id);

  // 프로젝트가 변경될 때마다 overview 섹션으로 초기화
  useEffect(() => {
    setCurrentSection("overview");
  }, [project.id]);

  const handlePrev = () => {
    if (onPrev) {
      onPrev();
    } else if (currentIndex > 0) {
      navigate(`/project/${projects[currentIndex - 1].id}`);
    }
  };

  const allSections = [
    "overview",
    "type",
    "techStack",
    "features",
    "resources",
    "prerequisites",
    "challenges",
    "tips",
  ] as const;

  type Section = (typeof allSections)[number];

  const sections = allSections.filter((section): section is Section => {
    switch (section) {
      case "techStack":
        return project.techStack && project.techStack.length > 0;
      case "prerequisites":
        return project.prerequisites?.length > 0;
      case "challenges":
        return project.challenges?.length > 0;
      case "tips":
        return project.tips?.length > 0;
      default:
        return true;
    }
  });

  console.log("Project data:", project);
  console.log("Tech stack:", project.techStack);

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
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {currentSection === "overview" && (
                <ProjectDescription description={project.description} />
              )}
              {currentSection === "type" && (
                <ProjectType types={project.projectType} />
              )}
              {currentSection === "techStack" &&
                project.techStack &&
                project.techStack.length > 0 && (
                  <ProjectTechStack techStack={project.techStack} />
                )}
              {currentSection === "features" && (
                <ProjectFeatures features={project.features} />
              )}
              {currentSection === "resources" && (
                <div className="relative">
                  <ProjectResources resources={project.resources} />
                </div>
              )}
              {currentSection === "prerequisites" &&
                project.prerequisites?.length > 0 && (
                  <ProjectPrerequisites prerequisites={project.prerequisites} />
                )}
              {currentSection === "challenges" &&
                project.challenges?.length > 0 && (
                  <ProjectChallenges challenges={project.challenges} />
                )}
              {currentSection === "tips" && project.tips?.length > 0 && (
                <ProjectTips tips={project.tips} />
              )}
            </motion.div>
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
