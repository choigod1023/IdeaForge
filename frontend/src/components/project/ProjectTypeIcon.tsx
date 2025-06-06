import { FaCode, FaLaptopCode, FaGithub, FaTools } from "react-icons/fa";

interface ProjectTypeIconProps {
  type: string;
}

export const ProjectTypeIcon = ({ type }: ProjectTypeIconProps) => {
  switch (type) {
    case "토이":
      return <FaCode className="w-3.5 h-3.5" />;
    case "포트폴리오":
      return <FaLaptopCode className="w-3.5 h-3.5" />;
    case "오픈소스":
      return <FaGithub className="w-3.5 h-3.5" />;
    case "실용":
      return <FaTools className="w-3.5 h-3.5" />;
    default:
      return null;
  }
};
