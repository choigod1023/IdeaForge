export interface TechColors {
  bg: string;
  text: string;
  darkBg: string;
  darkText: string;
  border: string;
  darkBorder: string;
}

export type TechStackItem =
  | string
  | {
      name: string;
      descriptions: string[];
    };
