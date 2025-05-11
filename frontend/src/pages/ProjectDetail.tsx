import { useLocation } from "react-router-dom";
import type { Project } from "../types";

export default function ProjectDetail() {
  const location = useLocation();
  const project = location.state?.project as Project;

  if (!project) {
    return (
      <div className="min-h-screen py-8 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="text-center text-gray-600">
            프로젝트 정보를 찾을 수 없습니다.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* 프로젝트 헤더 */}
          <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {project.title}
            </h1>
            <p className="mb-4 text-gray-600">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-sm text-blue-800 bg-blue-100 rounded-full">
                {project.difficulty}
              </span>
              <span className="px-3 py-1 text-sm text-green-800 bg-green-100 rounded-full">
                {project.category}
              </span>
              <span className="px-3 py-1 text-sm text-purple-800 bg-purple-100 rounded-full">
                {project.theme}
              </span>
            </div>
          </div>

          {/* 기술 스택 */}
          <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              기술 스택
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm text-gray-800 bg-gray-100 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 주요 기능 */}
          <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              주요 기능
            </h2>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* 학습 내용 */}
          <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              학습 내용
            </h2>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              {project.learningOutcomes.map((outcome, index) => (
                <li key={index}>{outcome}</li>
              ))}
            </ul>
          </div>

          {/* 참고 자료 */}
          <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              참고 자료
            </h2>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              {project.resources.map((resource, index) => (
                <li key={index}>{resource}</li>
              ))}
            </ul>
          </div>

          {/* 사전 지식 */}
          {project.prerequisites.length > 0 && (
            <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                사전 지식
              </h2>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                {project.prerequisites.map((prerequisite, index) => (
                  <li key={index}>{prerequisite}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 도전 과제 */}
          {project.challenges.length > 0 && (
            <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                도전 과제
              </h2>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                {project.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 개발 팁 */}
          {project.tips.length > 0 && (
            <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                개발 팁
              </h2>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                {project.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
