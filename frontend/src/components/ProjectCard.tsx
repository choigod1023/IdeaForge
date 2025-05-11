import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">{project.title}</h2>
      <p className="mb-6 text-gray-600">{project.description}</p>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Tech Stack</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-3 py-1 text-sm font-medium text-indigo-800 bg-indigo-100 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">Features</h3>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            {project.features.map((feature) => (
              <li key={feature} className="text-gray-600">
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Learning Outcomes
          </h3>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            {project.learningOutcomes.map((outcome) => (
              <li key={outcome} className="text-gray-600">
                {outcome}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">Resources</h3>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            {project.resources.map((resource) => (
              <li key={resource} className="text-gray-600">
                {resource}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
            {project.difficulty}
          </span>
          <span className="text-gray-600">
            Estimated Time: {project.estimatedTime}
          </span>
        </div>
      </div>
    </div>
  );
};
