import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import projectRoutes from "./routes/project.routes";
import { openAIService } from "./services/openai";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://idea-forge-omega.vercel.app"
      : ["http://localhost:5173", "http://125.128.187.5:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/projects", projectRoutes);

// 프로젝트 추천 API 엔드포인트
app.post("/api/projects/recommend", async (req, res) => {
  try {
    const project = await openAIService.generateProjectRecommendation(req.body);
    res.json(project);
  } catch (error) {
    console.error("Error generating project recommendation:", error);
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "프로젝트 추천 생성에 실패했습니다",
    });
  }
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
);

export default app;
