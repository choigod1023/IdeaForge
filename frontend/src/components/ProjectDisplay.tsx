import { useProjectStore } from "../stores/projectStore";

export const ProjectDisplay = () => {
  const { project, isLoading, error } = useProjectStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {project.difficulty}
            </span>
            {project.category && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {project.category}
              </span>
            )}
            {project.theme && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {project.theme}
              </span>
            )}
          </div>
        </div>

        <div className="px-6 py-4 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">프로젝트 설명</h3>
            <p className="mt-2 text-gray-600 whitespace-pre-line">
              {project.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900">기술 스택</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900">주요 기능</h3>
            <ul className="mt-2 list-disc list-inside space-y-2 text-gray-600">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {project.prerequisites && (
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                사전 지식/요구사항
              </h3>
              <ul className="mt-2 list-disc list-inside space-y-2 text-gray-600">
                {project.prerequisites.map((prerequisite, index) => (
                  <li key={index}>{prerequisite}</li>
                ))}
              </ul>
            </div>
          )}

          {project.challenges && (
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                예상되는 도전 과제
              </h3>
              <ul className="mt-2 list-disc list-inside space-y-2 text-gray-600">
                {project.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          )}

          {project.tips && (
            <div>
              <h3 className="text-lg font-medium text-gray-900">개발 팁</h3>
              <ul className="mt-2 list-disc list-inside space-y-2 text-gray-600">
                {project.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {project.resources && (
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                추천 학습 자료
              </h3>
              <ul className="mt-2 list-disc list-inside space-y-2 text-gray-600">
                {project.resources.map((resource, index) => (
                  <li key={index}>{resource}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
