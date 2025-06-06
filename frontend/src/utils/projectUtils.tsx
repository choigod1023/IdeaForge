import { FaCode, FaLaptopCode, FaGithub, FaTools } from "react-icons/fa";
import type { IconType } from "react-icons";

export const getTypeIcon = (type: string): IconType | null => {
  switch (type) {
    case "토이":
      return FaCode;
    case "포트폴리오":
      return FaLaptopCode;
    case "오픈소스":
      return FaGithub;
    case "실용":
      return FaTools;
    default:
      return null;
  }
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
