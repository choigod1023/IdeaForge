import { FaLaptopCode, FaCode, FaGithub, FaTools } from "react-icons/fa";
import type { IconType } from "react-icons";

export type ProjectType =
  | "토이 프로젝트"
  | "포트폴리오 프로젝트"
  | "오픈소스 프로젝트"
  | "실용 프로젝트";

export const PROJECT_TYPE_DESCRIPTIONS: Record<ProjectType, string[]> = {
  "토이 프로젝트": [
    "작은 규모의 학습용 프로젝트예요.",
    "새로운 기술을 실험해볼 수 있어요.",
    "부담 없이 시작할 수 있어요.",
    "실패해도 괜찮아요.",
  ],
  "포트폴리오 프로젝트": [
    "개발 역량을 보여주는 프로젝트예요.",
    "실제 서비스처럼 구현해요.",
    "기술적 깊이를 보여줄 수 있어요.",
    "코드 품질이 중요해요.",
  ],
  "오픈소스 프로젝트": [
    "커뮤니티와 함께 만드는 프로젝트예요.",
    "코드 품질이 매우 중요해요.",
    "다른 개발자와 협업해요.",
    "기술적 성장의 기회예요.",
  ],
  "실용 프로젝트": [
    "실제 문제를 해결하는 프로젝트예요.",
    "사용자 경험이 중요해요.",
    "실제 활용성을 고려해요.",
    "사용자 피드백을 받아요.",
  ],
};

export const PROJECT_TYPE_ICONS: Record<ProjectType, IconType> = {
  "토이 프로젝트": FaCode,
  "포트폴리오 프로젝트": FaLaptopCode,
  "오픈소스 프로젝트": FaGithub,
  "실용 프로젝트": FaTools,
};
