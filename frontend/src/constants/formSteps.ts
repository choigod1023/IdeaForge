import type { FormStep } from "../types/form";

// ===== 폼 단계 상수 =====
export const FORM_STEPS: FormStep[] = [
  "difficulty",
  "techStack",
  "theme",
  "details",
];

// ===== 난이도 관련 상수 =====
export const DIFFICULTY_OPTIONS = ["초급", "중급", "고급"] as const;
export type Difficulty = (typeof DIFFICULTY_OPTIONS)[number];

export const DIFFICULTY_MAP = {
  초급: "beginner",
  중급: "intermediate",
  고급: "advanced",
} as const;

export const DIFFICULTY_DESCRIPTIONS = {
  초급: "프로그래밍이 처음이에요.",
  중급: "기본기를 갖췄지만 더 배워볼래요.",
  고급: "전문적인 시스템을 만들어볼래요.",
} as const;

// ===== 폼 단계별 설정 =====
export const FORM_STEP_CONFIG = {
  difficulty: {
    title: "난이도 선택",
    description: "프로젝트의 난이도를 선택해주세요",
    isRequired: true,
  },
  techStack: {
    title: "기술 스택",
    description: "사용하고 싶은 기술을 선택해주세요",
    isRequired: true,
  },
  theme: {
    title: "프로젝트 테마",
    description: "프로젝트의 테마를 선택해주세요",
    isRequired: true,
  },
  details: {
    title: "추가 정보",
    description: "프로젝트에 대한 추가 정보를 입력해주세요",
    isRequired: false,
  },
} as const;

// ===== 타입 가드 =====
export function isValidDifficulty(
  difficulty: string
): difficulty is Difficulty {
  return DIFFICULTY_OPTIONS.includes(difficulty as Difficulty);
}

export function getDifficultyDescription(difficulty: Difficulty): string {
  return DIFFICULTY_DESCRIPTIONS[difficulty];
}

export function getDifficultyKey(difficulty: Difficulty): string {
  return DIFFICULTY_MAP[difficulty];
}
