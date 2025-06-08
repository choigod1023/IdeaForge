import { projectPageStyles } from "../../../styles/projectStyles";

interface ProjectListErrorProps {
  message: string;
  onRetry: () => void;
}

export const ProjectListError = ({
  message,
  onRetry,
}: ProjectListErrorProps) => {
  return (
    <div className={projectPageStyles.list.error.container}>
      <p className={projectPageStyles.list.error.text}>{message}</p>
      <button
        onClick={onRetry}
        className={projectPageStyles.list.error.retryButton}
      >
        다시 시도
      </button>
    </div>
  );
};
