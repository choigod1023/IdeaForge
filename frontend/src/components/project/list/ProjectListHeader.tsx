import { FaPlus } from "react-icons/fa";
import { projectListStyles } from "../../../styles/projectStyles";

interface ProjectListHeaderProps {
  onCreateClick: () => void;
}

export const ProjectListHeader = ({
  onCreateClick,
}: ProjectListHeaderProps) => {
  return (
    <div className={projectListStyles.list.header.container}>
      <h1 className={projectListStyles.list.header.title}>내 프로젝트</h1>
      <button
        onClick={onCreateClick}
        className={projectListStyles.list.header.createButton}
      >
        <FaPlus className="mr-2" />새 프로젝트
      </button>
    </div>
  );
};
