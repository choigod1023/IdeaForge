import express from "express";
import { createProject } from "../controllers/project.controller";

const router = express.Router();

// 프로젝트 생성 엔드포인트
router.post("/", createProject);

export default router;
