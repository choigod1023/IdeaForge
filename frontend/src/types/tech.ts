import type { ComponentType } from "react";

export type TechCategory = {
  title: string;
  icon: ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  color: string;
  description: string;
  techs: string[];
};
