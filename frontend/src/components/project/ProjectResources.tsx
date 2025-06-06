import { useProjectResources } from "../../hooks/useProjectResources";
import { ResourceCard } from "./ResourceCard";
import type { ProjectResource } from "../../types";

interface ProjectResourcesProps {
  resources: ProjectResource[];
}

export function ProjectResources({ resources }: ProjectResourcesProps) {
  const { techResources, featureResources } = useProjectResources(resources);

  return (
    <div className="space-y-8">
      {/* 기술 리소스 섹션 */}
      {techResources.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            기술 리소스
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {techResources.map((resource) => (
              <ResourceCard key={resource.title} resource={resource} />
            ))}
          </div>
        </section>
      )}

      {/* 기능 리소스 섹션 */}
      {featureResources.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            기능 리소스
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {featureResources.map((resource) => (
              <ResourceCard key={resource.title} resource={resource} />
            ))}
          </div>
        </section>
      )}

      {/* 리소스가 없는 경우 */}
      {techResources.length === 0 && featureResources.length === 0 && (
        <div className="p-8 text-center bg-gray-50 rounded-3xl dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-300">
            아직 등록된 리소스가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
}
