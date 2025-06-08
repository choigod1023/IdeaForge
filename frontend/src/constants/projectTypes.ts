import { FaLaptopCode, FaCode, FaGithub, FaTools } from "react-icons/fa";
import type { IconType } from "react-icons";

export type ProjectType =
  | "토이 프로젝트"
  | "포트폴리오 프로젝트"
  | "오픈소스 프로젝트"
  | "실용 프로젝트";

export const PROJECT_TYPE_ICONS: Record<ProjectType, IconType> = {
  "토이 프로젝트": FaCode,
  "포트폴리오 프로젝트": FaLaptopCode,
  "오픈소스 프로젝트": FaGithub,
  "실용 프로젝트": FaTools,
};

export const PROJECT_TYPE_DESCRIPTIONS: Record<ProjectType, string[]> = {
  "토이 프로젝트": [
    "작은 규모의 실험적 프로젝트",
    "새로운 기술이나 개념을 학습하고 테스트하기에 적합",
    "빠른 프로토타이핑과 아이디어 검증에 용이",
  ],
  "포트폴리오 프로젝트": [
    "개발자의 역량을 보여주는 대표 프로젝트",
    "실무에서 활용 가능한 기술 스택 사용",
    "완성도 높은 UI/UX와 코드 품질 중시",
  ],
  "오픈소스 프로젝트": [
    "커뮤니티에 기여하는 오픈소스 프로젝트",
    "코드 리뷰와 협업 경험 제공",
    "GitHub을 통한 버전 관리와 이슈 트래킹",
  ],
  "실용 프로젝트": [
    "실제 문제 해결을 위한 프로젝트",
    "사용자 중심의 기능 구현",
    "실무에서 바로 활용 가능한 결과물",
  ],
};

export const getTypeLabel = (type: string) => {
  switch (type) {
    case "토이":
      return "토이 프로젝트";
    case "포트폴리오":
      return "포트폴리오 프로젝트";
    case "오픈소스":
      return "오픈소스 프로젝트";
    case "실용":
      return "실용 프로젝트";
    default:
      return type;
  }
};
