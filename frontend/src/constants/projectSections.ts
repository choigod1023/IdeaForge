export type ProjectSection =
  | "overview"
  | "type"
  | "techStack"
  | "features"
  | "resources"
  | "prerequisites"
  | "challenges"
  | "tips";

export const sectionNames: Record<ProjectSection, string> = {
  overview: "개요",
  type: "유형",
  techStack: "기술 스택",
  features: "주요 기능",
  resources: "학습 자료",
  prerequisites: "사전 지식",
  challenges: "도전 과제",
  tips: "팁 & 트릭",
};
