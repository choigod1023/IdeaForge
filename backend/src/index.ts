import express from "express";
import cors from "cors";
import { openAIService } from "./services/openai";

const app = express();
const port = process.env.PORT || 3000;

// CORS 설정
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://your-frontend-domain.vercel.app"]
        : ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// ... existing code ...
