import { useMemo } from "react";
import type { IconType } from "react-icons";
import type { ProjectType } from "../../constants/projectTypes";
import {
  PROJECT_TYPE_DESCRIPTIONS,
  PROJECT_TYPE_ICONS,
} from "../../constants/projectTypes";

interface ProjectTypeInfoProps {
  type: string;
  children?: (info: {
    type: ProjectType;
    icon: IconType;
    descriptions: string[];
  }) => React.ReactNode;
}

export function ProjectTypeInfo({ type, children }: ProjectTypeInfoProps) {
  const cleanType = useMemo(() => {
    // 이모지와 특수문자 제거, 순수 타입 텍스트만 추출
    const cleaned = type
      .replace(/[\p{Emoji}]/gu, "") // 이모지 제거
      .replace(/[^\p{L}\p{N}\s]/gu, "") // 특수문자 제거
      .trim();

    // 전체 타입 문자열과 매칭
    const availableTypes = Object.keys(PROJECT_TYPE_DESCRIPTIONS);
    const fullType = availableTypes.find(
      (key) => key.includes(cleaned) || cleaned.includes(key)
    ) as ProjectType | undefined;

    return fullType || "실용 프로젝트"; // 기본값 설정
  }, [type]);

  const icon = useMemo(() => PROJECT_TYPE_ICONS[cleanType], [cleanType]);
  const descriptions = useMemo(
    () => PROJECT_TYPE_DESCRIPTIONS[cleanType],
    [cleanType]
  );

  const info = {
    type: cleanType,
    icon,
    descriptions,
  };

  if (children) {
    return <>{children(info)}</>;
  }

  const Icon = icon;
  return (
    <div className="flex items-center gap-2">
      <div className="text-gray-600">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{cleanType}</h3>
        {descriptions && descriptions.length > 0 && (
          <p className="text-sm text-gray-600">{descriptions[0]}</p>
        )}
      </div>
    </div>
  );
}
