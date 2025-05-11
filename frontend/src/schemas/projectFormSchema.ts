import { z } from "zod";
import { THEME_OPTIONS } from "../constants/formOptions";

export const projectFormSchema = z.object({
  preferredTech: z
    .array(z.string())
    .min(1, "최소 1개 이상의 기술 스택을 선택해주세요"),
  interests: z.array(z.string()).default([]),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"], {
    required_error: "난이도를 선택해주세요",
  }),
  category: z
    .enum([
      "웹 개발",
      "모바일 앱",
      "데스크톱 앱",
      "게임",
      "AI/ML",
      "데이터 분석",
      "보안",
      "임베디드",
      "기타",
    ] as const)
    .optional(),
  theme: z.enum(THEME_OPTIONS as unknown as [string, ...string[]], {
    required_error: "프로젝트 테마를 선택해주세요",
  }),
  description: z.string().optional(),
  hasPrerequisites: z.boolean().default(false),
  hasChallenges: z.boolean().default(false),
  hasTips: z.boolean().default(false),
  additionalInfo: z.string().optional(),
});

export type ProjectRequest = z.infer<typeof projectFormSchema>;
