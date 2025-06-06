import { headerStyles } from "../../styles/headerStyles";

interface NavigationProps {
  onViewProjects: () => void;
  onCreateProject: () => void;
}

export const Navigation = ({
  onViewProjects,
  onCreateProject,
}: NavigationProps) => (
  <nav className={headerStyles.nav}>
    <button onClick={onViewProjects} className={headerStyles.button.view}>
      내 프로젝트
    </button>
    <button onClick={onCreateProject} className={headerStyles.button.create}>
      프로젝트 생성
    </button>
  </nav>
);
