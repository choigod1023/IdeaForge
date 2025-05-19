import express from "express";
import {
  projectController,
  createProject,
} from "../controllers/project.controller";

const router = express.Router();

// Route to generate project recommendation
router.post(
  "/recommend",
  projectController.generateRecommendation.bind(projectController)
);

// 프로젝트 생성 엔드포인트
router.post("/", createProject);

export default router;
