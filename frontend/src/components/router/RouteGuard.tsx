import { useLocation, Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface RouteGuardProps {
  children: ReactNode;
}

export const RouteGuard = ({ children }: RouteGuardProps) => {
  const location = useLocation();

  // 레거시 URL 리다이렉트: /projects/:projectId -> /project/:projectId
  if (
    location.pathname.startsWith("/projects/") &&
    location.pathname !== "/projects"
  ) {
    const projectId = location.pathname.split("/projects/")[1];
    return <Navigate to={`/project/${projectId}`} replace />;
  }

  return <>{children}</>;
};
