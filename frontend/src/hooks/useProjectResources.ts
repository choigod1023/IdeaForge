import type { ProjectResource } from "../types";

export const useProjectResources = (resources: ProjectResource[]) => {
  // 적절성 점수에 따라 정렬
  const sortedResources = [...resources].sort(
    (a, b) => b.relevance.score - a.relevance.score
  );

  const techResources = sortedResources.filter((r) => r.category === "tech");
  const featureResources = sortedResources.filter(
    (r) => r.category === "feature"
  );

  return {
    techResources,
    featureResources,
  };
};
