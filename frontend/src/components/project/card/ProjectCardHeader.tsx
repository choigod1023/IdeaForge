import { FaDownload, FaTrash } from "react-icons/fa";
import { projectCardStyles } from "../../../styles/projectCardStyles";
import type { Project } from "../../../types";

interface ProjectCardHeaderProps {
  project: Project;
  onDownload: (e: React.MouseEvent) => void;
  onRemove: (e: React.MouseEvent) => void;
}

export const ProjectCardHeader = ({
  project,
  onDownload,
  onRemove,
}: ProjectCardHeaderProps) => (
  <div className={projectCardStyles.header.container}>
    <div className="space-y-1">
      <h2 className={projectCardStyles.header.title}>{project.title}</h2>
      <p className={projectCardStyles.header.description}>
        {project.description.summary}
      </p>
    </div>
    <div
      className={projectCardStyles.header.actions}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onDownload}
        className={projectCardStyles.header.button.download}
        title="마크다운으로 저장"
      >
        <FaDownload className="w-4 h-4" />
      </button>
      <button
        onClick={onRemove}
        className={projectCardStyles.header.button.remove}
        title="프로젝트 삭제"
      >
        <FaTrash className="w-4 h-4" />
      </button>
    </div>
  </div>
);
