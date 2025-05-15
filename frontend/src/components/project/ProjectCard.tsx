import { type Project } from "../../types";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectDescription } from "./ProjectDescription";
import { ProjectTechStack } from "./ProjectTechStack";
import { ProjectFeatures } from "./ProjectFeatures";
import { ProjectPrerequisites } from "./ProjectPrerequisites";
import { ProjectChallenges } from "./ProjectChallenges";
import { ProjectTips } from "./ProjectTips";
import { ProjectResources } from "./ProjectResources";
import { ProjectNavigation } from "./ProjectNavigation";

interface ProjectCardProps {
  project: Project;
  source?: "create" | "list";
}

export function ProjectCard({ project, source = "list" }: ProjectCardProps) {
  return (
    <div className="max-w-4xl mx-auto text-gray-900 dark:text-gray-100">
      <div className="p-6 mx-4 mt-4 bg-white border border-gray-100 shadow-sm dark:bg-gray-800 dark:shadow-gray-900/20 rounded-2xl sm:mx-8 md:mx-12 lg:mx-16 dark:border-gray-700">
        <ProjectHeader project={project} />

        <div className="mt-8 space-y-8 divide-y divide-gray-100 dark:divide-gray-700 [&>*]:text-gray-900 [&>*]:dark:text-gray-100 [&_h3]:text-gray-900 [&_h3]:dark:text-gray-100 [&_p]:text-gray-700 [&_p]:dark:text-gray-200 [&_li]:text-gray-700 [&_li]:dark:text-gray-200">
          <ProjectDescription description={project.description} />

          {project.techStack && project.techStack.length > 0 && (
            <ProjectTechStack techStack={project.techStack} />
          )}

          {project.features && project.features.length > 0 && (
            <ProjectFeatures features={project.features} />
          )}

          {project.prerequisites && project.prerequisites.length > 0 && (
            <ProjectPrerequisites prerequisites={project.prerequisites} />
          )}

          {project.challenges && project.challenges.length > 0 && (
            <ProjectChallenges challenges={project.challenges} />
          )}

          {project.tips && project.tips.length > 0 && (
            <ProjectTips tips={project.tips} />
          )}

          {project.resources && project.resources.length > 0 && (
            <ProjectResources resources={project.resources} />
          )}
        </div>

        <ProjectNavigation source={source} />
      </div>
    </div>
  );
}
