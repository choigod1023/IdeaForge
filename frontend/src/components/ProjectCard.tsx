import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h2>
      <p className="text-gray-600 mb-6">{project.description}</p>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Tech Stack</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">Features</h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
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
          <ul className="list-disc list-inside mt-2 space-y-1">
            {project.learningOutcomes.map((outcome) => (
              <li key={outcome} className="text-gray-600">
                {outcome}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">Resources</h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
            {project.resources.map((resource) => (
              <li key={resource} className="text-gray-600">
                {resource}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
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
