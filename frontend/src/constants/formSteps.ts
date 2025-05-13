// Form step types
export type FormStep = "difficulty" | "techStack" | "theme" | "details";
export type Difficulty = "초급" | "중급" | "고급";

// Form step constants
export const FORM_STEPS: FormStep[] = [
  "difficulty",
  "techStack",
  "theme",
  "details",
];

// Difficulty related constants
export const DIFFICULTY_OPTIONS: Difficulty[] = ["초급", "중급", "고급"];

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
