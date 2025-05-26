import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectStore } from "../stores/projectStore";
import { ProjectLoading } from "../components/project/ProjectLoading";
import { ProjectDisplay } from "../components/project/ProjectDisplay";

export default function ProjectPage() {
  const navigate = useNavigate();
  const { project, projectList, isLoading } = useProjectStore();

  useEffect(() => {
    if (!project && !isLoading) {
      navigate("/projects", { replace: true });
    }
  }, [project, navigate, isLoading]);

  if (isLoading) {
    return <ProjectLoading />;
  }

  if (!project) {
    return null;
  }

  const currentIndex = projectList.findIndex((p) => p.id === project.id);

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevProject = projectList[currentIndex - 1];
      navigate(`/project?transition=prev`, { state: { project: prevProject } });
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="max-w-4xl p-4 mx-auto"
      >
        <ProjectDisplay
          project={project}
          projects={projectList}
          onPrev={handlePrev}
        />
      </motion.div>
    </AnimatePresence>
  );
}
