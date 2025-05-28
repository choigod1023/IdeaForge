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
  origin: [
    "https://idea-forge-omega.vercel.app",
    "http://localhost:5173",
    "http://125.128.187.5:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/projects", projectRoutes);

// 임시 저장소 (실제로는 Redis나 DB를 사용하는 것이 좋습니다)
const jobStore = new Map<
  string,
  {
    status: "processing" | "completed" | "failed";
    result?: any;
    error?: string;
  }
>();

// 프로젝트 추천 API 엔드포인트
app.post("/api/projects/recommend", async (req, res) => {
  try {
    const jobId = `job-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    console.log("API: 프로젝트 추천 요청 시작", { jobId, body: req.body });

    // 초기 상태 저장
    jobStore.set(jobId, { status: "processing" });

    // 비동기로 프로젝트 생성 시작
    (async () => {
      try {
        console.log("API: 프로젝트 생성 시작", jobId);
        const project = await openAIService.generateProjectRecommendation(
          req.body
        );
        console.log("API: 프로젝트 생성 완료", { jobId, project });
        jobStore.set(jobId, { status: "completed", result: project });
      } catch (error) {
        console.error("API: 프로젝트 생성 실패", { jobId, error });
        jobStore.set(jobId, {
          status: "failed",
          error:
            error instanceof Error
              ? error.message
              : "프로젝트 추천 생성에 실패했습니다",
        });
      }
    })();

    // 즉시 jobId 반환
    console.log("API: jobId 반환", jobId);
    res.json({ jobId, status: "processing" });
  } catch (error) {
    console.error("API: 프로젝트 추천 요청 처리 실패:", error);
    res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "프로젝트 추천 요청 처리에 실패했습니다",
    });
  }
});

// 작업 상태 확인 엔드포인트
app.get("/api/projects/recommend/:jobId", (req, res) => {
  const { jobId } = req.params;
  console.log("API: 작업 상태 확인", jobId);

  const job = jobStore.get(jobId);
  if (!job) {
    console.log("API: 작업을 찾을 수 없음", jobId);
    return res.status(404).json({ error: "Job not found" });
  }

  console.log("API: 현재 작업 상태", { jobId, status: job.status });

  if (job.status === "completed") {
    // 작업이 완료되면 결과 반환하고 저장소에서 삭제
    console.log("API: 작업 완료, 결과 반환", jobId);
    jobStore.delete(jobId);
    return res.json({ status: "completed", result: job.result });
  }

  if (job.status === "failed") {
    // 실패한 경우 에러 반환하고 저장소에서 삭제
    console.log("API: 작업 실패, 에러 반환", { jobId, error: job.error });
    jobStore.delete(jobId);
    return res.status(500).json({ status: "failed", error: job.error });
  }

  // 아직 처리 중인 경우
  console.log("API: 작업 처리 중", jobId);
  res.json({ status: "processing" });
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
