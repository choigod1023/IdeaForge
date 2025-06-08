import { useMemo } from "react";
import type { IconType } from "react-icons";
import type { ProjectType } from "../../../constants/projectTypes";
import { getProjectTypeInfo } from "../../../utils/projectTypeUtils";

interface ProjectTypeInfoProps {
  type: string;
  children?: (info: {
    type: ProjectType;
    icon: IconType;
    descriptions: string[];
  }) => React.ReactNode;
}

export function ProjectTypeInfo({ type, children }: ProjectTypeInfoProps) {
  const { icon, descriptions } = useMemo(
    () => getProjectTypeInfo(type),
    [type]
  );

  if (!children) {
    return null;
  }

  return (
    <>
      {children({
        type: type as ProjectType,
        icon,
        descriptions,
      })}
    </>
  );
}
