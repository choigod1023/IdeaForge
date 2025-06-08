import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./header/Logo";
import { Navigation } from "./header/Navigation";
import { useNavigation } from "../utils/navigation";
import { setFavicon } from "../utils/favicon";
import { headerStyles } from "../styles/headerStyles";

export const Header = () => {
  const { handleCreateProject, handleViewProjects } = useNavigation();

  useEffect(() => {
    setFavicon();
  }, []);

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
