import { z } from "zod";
import { THEME_OPTIONS } from "../constants/formOptions";
import type { ProjectTheme } from "../types";
import type { FormData, ZodSchema } from "../types/form";

// ===== 개별 단계 스키마 =====
export const difficultySchema: ZodSchema<{ difficulty: string }> = z.object({
  difficulty: z.enum(["초급", "중급", "고급"], {
    required_error: "난이도를 선택해주세요",
  }),
});

export const techStackSchema: ZodSchema<{ preferredTech: string[] }> = z.object(
  {
    preferredTech: z
      .array(z.string())
      .min(1, "최소 1개 이상의 기술 스택을 선택해주세요"),
  }
);

export const themeSchema: ZodSchema<{ theme: string; category?: string }> =
  z.object({
    theme: z.enum(
      THEME_OPTIONS as unknown as [ProjectTheme, ...ProjectTheme[]],
      {
        required_error: "프로젝트 테마를 선택해주세요",
      }
    ),
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
  });

export const detailsSchema: ZodSchema<{
  description?: string;
  hasPrerequisites: boolean;
  hasChallenges: boolean;
  hasTips: boolean;
  additionalInfo?: string;
}> = z.object({
  description: z.string().optional(),
  hasPrerequisites: z.boolean(),
  hasChallenges: z.boolean(),
  hasTips: z.boolean(),
  additionalInfo: z.string().optional(),
});

// ===== 전체 폼 스키마 =====
export const projectFormSchema: ZodSchema<FormData> = z.object({
  // 난이도
  difficulty: z.enum(["초급", "중급", "고급"], {
    required_error: "난이도를 선택해주세요",
  }),

  // 기술 스택
  preferredTech: z
    .array(z.string())
    .min(1, "최소 1개 이상의 기술 스택을 선택해주세요"),

  // 관심사
  interests: z.array(z.string()),

  // 테마
  theme: z.enum(THEME_OPTIONS as unknown as [ProjectTheme, ...ProjectTheme[]], {
    required_error: "프로젝트 테마를 선택해주세요",
  }),

  // 카테고리
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

  // 상세 정보
  description: z.string().optional(),
  hasPrerequisites: z.boolean(),
  hasChallenges: z.boolean(),
  hasTips: z.boolean(),
  additionalInfo: z.string().optional(),
});

// ===== 타입 추론 =====
export type ProjectRequest = z.infer<typeof projectFormSchema>;

// ===== 스키마 검증 함수 =====
export function validateFormStep<T>(
  schema: ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map((e) => e.message).join(", "),
      };
    }
    return { success: false, error: "유효성 검사에 실패했습니다" };
  }
}
