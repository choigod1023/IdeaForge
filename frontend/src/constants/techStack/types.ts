export interface PopularTechStack {
  category: string;
  techs: string[];
  description: string;
}

export interface TechStackCategory {
  name: string;
  stacks: PopularTechStack[];
}

export type TechStackItem = string | { name: string; descriptions: string[] };

export interface TechColors {
  bg: string;
  text: string;
  darkBg: string;
  darkText: string;
  border: string;
  darkBorder: string;
}
