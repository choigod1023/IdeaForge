export interface FeatureItem {
  title: string;
  description: string;
  keyPoints: string[];
}

export interface FeatureSection {
  mainTitle: string;
  description: string;
  items: FeatureItem[];
}

export const convertLegacyFeatures = (
  legacyFeatures: string[]
): FeatureSection[] => {
  return [
    {
      mainTitle: "주요 기능",
      description: "프로젝트의 핵심 기능들을 소개해요.",
      items: legacyFeatures.map((feature) => {
        const parts = feature.split(":");
        return {
          title: parts[0].trim(),
          description: parts.length > 1 ? parts[1].trim() : "",
          keyPoints: [],
        };
      }),
    },
  ];
};

export const processFeatures = (
  features: string[] | FeatureSection[]
): FeatureSection[] => {
  return Array.isArray(features) &&
    features.length > 0 &&
    typeof features[0] === "string"
    ? convertLegacyFeatures(features as string[])
    : (features as FeatureSection[]);
};
