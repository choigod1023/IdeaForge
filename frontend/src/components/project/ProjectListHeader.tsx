import { FaPlus } from "react-icons/fa";
import { projectPageStyles } from "../../styles/projectStyles";

interface ProjectListHeaderProps {
  onCreateClick: () => void;
}

export const ProjectListHeader = ({
  onCreateClick,
}: ProjectListHeaderProps) => {
  return (
    <div className={projectPageStyles.list.header.container}>
      <h1 className={projectPageStyles.list.header.title}>내 프로젝트</h1>
      <button
        onClick={onCreateClick}
        className={projectPageStyles.list.header.createButton}
      >
        <FaPlus className="mr-2" />새 프로젝트
      </button>
    </div>
  );
};
