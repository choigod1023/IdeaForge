import { Link } from "react-router-dom";
import { Logo } from "./header/Logo";
import { Navigation } from "./header/Navigation";
import { useHeader } from "../hooks/useHeader";
import { headerStyles } from "../styles/headerStyles";

export const Header = () => {
  const { handleCreateProject, handleViewProjects } = useHeader();

  return (
    <header className={headerStyles.container}>
      <div className={headerStyles.inner}>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>
          <Navigation
            onViewProjects={handleViewProjects}
            onCreateProject={handleCreateProject}
          />
        </div>
      </div>
    </header>
  );
};
