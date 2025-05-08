import { Router } from "express";
import { projectController } from "../controllers/project.controller";

const router = Router();

// Route to generate project recommendation
router.post(
  "/recommend",
  projectController.generateRecommendation.bind(projectController)
);

export default router;
