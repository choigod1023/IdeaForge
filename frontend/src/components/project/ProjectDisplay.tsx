import type { Project } from "../../types";
import { ProjectDescription } from "./ProjectDescription";
import { ProjectFeatures } from "./ProjectFeatures";
import { ProjectLearningOutcomes } from "./ProjectLearningOutcomes";
import { ProjectResources } from "./ProjectResources";
import { ProjectType } from "./ProjectType";
import { ProjectTechStack } from "./ProjectTechStack";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectPrerequisites } from "./ProjectPrerequisites";
import { ProjectChallenges } from "./ProjectChallenges";
import { ProjectTips } from "./ProjectTips";
import { ProjectNavigation } from "./ProjectNavigation";

interface ProjectDisplayProps {
  project: Project;
}

export function ProjectDisplay({ project }: ProjectDisplayProps) {
  console.log("Project data:", project);
  console.log("Tech stack:", project.techStack);

  return (
    <div className="p-4 bg-white shadow-sm rounded-3xl md:rounded-[2rem] md:p-6 dark:bg-gray-800">
      <div className="mt-8 space-y-8">
        <ProjectHeader project={project} />
        <ProjectDescription description={project.description} />
        <ProjectType types={project.projectType} />
        {project.techStack && project.techStack.length > 0 && (
          <ProjectTechStack techStack={project.techStack} />
        )}
        <ProjectFeatures features={project.features} />
        <ProjectLearningOutcomes learningOutcomes={project.learningOutcomes} />
        <ProjectResources resources={project.resources} />
        {project.prerequisites?.length > 0 && (
          <ProjectPrerequisites prerequisites={project.prerequisites} />
        )}
        {project.challenges?.length > 0 && (
          <ProjectChallenges challenges={project.challenges} />
        )}
        {project.tips?.length > 0 && <ProjectTips tips={project.tips} />}
        <ProjectNavigation />
      </div>
    </div>
  );
}
