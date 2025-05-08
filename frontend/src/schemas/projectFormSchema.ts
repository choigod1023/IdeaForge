import { z } from "zod";
import { CATEGORY_OPTIONS, THEME_OPTIONS } from "../constants/formOptions";

export const projectFormSchema = z.object({
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  preferredTech: z
    .array(z.string())
    .min(1, "최소 하나 이상의 기술을 선택해주세요"),
  timeAvailable: z.string().min(1, "가용 시간을 입력해주세요"),
  interests: z
    .array(z.string())
    .min(1, "최소 하나 이상의 관심사를 선택해주세요"),
  category: z.enum(CATEGORY_OPTIONS).optional(),
  theme: z.enum(THEME_OPTIONS).optional(),
  description: z.string().optional(),
  hasPrerequisites: z.boolean(),
  hasChallenges: z.boolean(),
  hasTips: z.boolean(),
});
