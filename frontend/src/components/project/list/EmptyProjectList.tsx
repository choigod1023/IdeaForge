import { FaPlus } from "react-icons/fa";
import { projectPageStyles } from "../../../styles/projectStyles";

interface EmptyProjectListProps {
  onCreateClick: () => void;
}

export const EmptyProjectList = ({ onCreateClick }: EmptyProjectListProps) => {
  return (
    <div className={projectPageStyles.list.empty.container}>
      <p className={projectPageStyles.list.empty.text}>
        아직 생성된 프로젝트가 없습니다.
      </p>
      <button
        onClick={onCreateClick}
        className={projectPageStyles.list.empty.button}
      >
        <FaPlus className="mr-2" />첫 프로젝트 만들기
      </button>
    </div>
  );
};
