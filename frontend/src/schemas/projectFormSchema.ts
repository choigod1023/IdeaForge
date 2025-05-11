import { z } from "zod";
import { THEME_OPTIONS } from "../constants/formOptions";

export const projectFormSchema = z.object({
  preferredTech: z
    .array(z.string())
    .min(1, "최소 1개 이상의 기술 스택을 선택해주세요"),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"], {
    required_error: "난이도를 선택해주세요",
  }),
  theme: z.enum(THEME_OPTIONS as unknown as [string, ...string[]], {
    required_error: "프로젝트 테마를 선택해주세요",
  }),
  description: z.string().optional(),
  hasPrerequisites: z.boolean().optional(),
  hasChallenges: z.boolean().optional(),
  hasTips: z.boolean().optional(),
});

export type ProjectRequest = z.infer<typeof projectFormSchema>;
