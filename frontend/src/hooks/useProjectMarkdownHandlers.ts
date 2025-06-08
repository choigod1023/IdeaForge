import { type Project } from "../types";
import { useProjectStore } from "../stores/projectStore";
import { createMarkdownHandlers } from "../utils/projectMarkdownHandlers";

export const useProjectMarkdownHandlers = (project: Project) => {
  const { exportToMarkdown } = useProjectStore();
  return createMarkdownHandlers(project, exportToMarkdown);
};
