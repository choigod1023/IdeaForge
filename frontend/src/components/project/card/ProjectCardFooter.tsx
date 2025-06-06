import {
  FaBook,
  FaExclamationTriangle,
  FaLightbulb,
  FaGraduationCap,
} from "react-icons/fa";
import { projectCardStyles } from "../../../styles/projectCardStyles";
import type { Project } from "../../../types";

interface ProjectCardFooterProps {
  project: Project;
}

export const ProjectCardFooter = ({ project }: ProjectCardFooterProps) => (
  <div className={projectCardStyles.footer.container}>
    {project.prerequisites.length > 0 && (
      <div className={projectCardStyles.footer.item}>
        <FaBook className="w-3.5 h-3.5" />
        <span>사전지식 {project.prerequisites.length}개</span>
      </div>
    )}
    {project.challenges.length > 0 && (
      <div className={projectCardStyles.footer.item}>
        <FaExclamationTriangle className="w-3.5 h-3.5" />
        <span>도전과제 {project.challenges.length}개</span>
      </div>
    )}
    {project.tips.length > 0 && (
      <div className={projectCardStyles.footer.item}>
        <FaLightbulb className="w-3.5 h-3.5" />
        <span>팁 {project.tips.length}개</span>
      </div>
    )}
    {project.learningPoints && project.learningPoints.length > 0 && (
      <div className={projectCardStyles.footer.item}>
        <FaGraduationCap className="w-3.5 h-3.5" />
        <span>학습 포인트 {project.learningPoints.length}개</span>
      </div>
    )}
  </div>
);
