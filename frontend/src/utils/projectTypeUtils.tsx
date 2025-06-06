import React from "react";
import { FaCode, FaLaptopCode, FaGithub, FaTools } from "react-icons/fa";
import type { ProjectType } from "../types/project";
import type { ReactElement } from "react";

interface ProjectTypeInfo {
  Icon: ReactElement;
  descriptions: string[];
  emoji: string;
}

const PROJECT_TYPES: Record<ProjectType, ProjectTypeInfo> = {
  토이: {
    Icon: <FaCode className="w-5 h-5" />,
    descriptions: [
      "작은 규모의 실험적 프로젝트",
      "새로운 기술이나 개념을 학습하고 테스트하기에 적합",
      "빠른 프로토타이핑과 아이디어 검증에 용이",
    ],
    emoji: "🎮",
  },
  포트폴리오: {
    Icon: <FaLaptopCode className="w-5 h-5" />,
    descriptions: [
      "개발자의 역량을 보여주는 대표 프로젝트",
      "실무에서 활용 가능한 기술 스택 사용",
      "완성도 높은 UI/UX와 코드 품질 중시",
    ],
    emoji: "🎨",
  },
  오픈소스: {
    Icon: <FaGithub className="w-5 h-5" />,
    descriptions: [
      "커뮤니티에 기여하는 오픈소스 프로젝트",
      "코드 리뷰와 협업 경험 제공",
      "GitHub을 통한 버전 관리와 이슈 트래킹",
    ],
    emoji: "🌟",
  },
  실용: {
    Icon: <FaTools className="w-5 h-5" />,
    descriptions: [
      "실제 문제 해결을 위한 프로젝트",
      "사용자 중심의 기능 구현",
      "실무에서 바로 활용 가능한 결과물",
    ],
    emoji: "🛠️",
  },
};

export function getProjectType(type: string): ProjectTypeInfo {
  return (
    PROJECT_TYPES[type as ProjectType] || {
      Icon: <FaCode className="w-5 h-5" />,
      descriptions: ["프로젝트 유형에 대한 설명이 준비 중이에요."],
      emoji: "📝",
    }
  );
}
