import { AnimatePresence } from "framer-motion";
import { ProjectDisplay } from "../components/project/layout/ProjectDisplay";
import { useProjectPage } from "../hooks/useProject";
import { projectPageStyles } from "../styles/projectStyles";
import { pageVariants, pageTransition } from "../constants/animations";
import { motion } from "framer-motion";

export default function ProjectPage() {
  const { project, handlePrev } = useProjectPage();

  if (!project) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        className={projectPageStyles.detail.container}
      >
        <ProjectDisplay project={project} onPrev={handlePrev} />
      </motion.div>
    </AnimatePresence>
  );
}
