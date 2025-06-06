import type { ReactElement } from "react";

export type ProjectType = "토이" | "포트폴리오" | "오픈소스" | "실용";

export interface ProjectTypeInfo {
  Icon: ReactElement;
  descriptions: string[];
  emoji: string;
}

export type ProjectSection =
  | "overview"
  | "type"
  | "techStack"
  | "features"
  | "resources"
  | "prerequisites"
  | "challenges"
  | "tips";
