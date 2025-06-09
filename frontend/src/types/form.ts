import type { z } from "zod";
import type { ProjectTheme, Difficulty, ProjectCategory } from "./index";

// ===== 폼 단계 타입 =====
export type FormStep = "difficulty" | "techStack" | "theme" | "details";

// ===== 폼 상태 타입 =====
export type FormStatus =
  | "idle"
  | "validating"
  | "submitting"
  | "success"
  | "error";

// ===== 폼 필드 타입 =====
export interface FormField<T = unknown> {
  value: T;
  error?: string;
  touched: boolean;
  isValid: boolean;
}

// ===== 폼 단계별 데이터 타입 =====
export interface DifficultyStepData {
  difficulty: Difficulty;
}

export interface TechStackStepData {
  preferredTech: string[];
}

export interface ThemeStepData {
  theme: ProjectTheme;
  category?: ProjectCategory;
}

export interface DetailsStepData {
  description?: string;
  hasPrerequisites: boolean;
  hasChallenges: boolean;
  hasTips: boolean;
  additionalInfo?: string;
}

// ===== 전체 폼 데이터 타입 =====
export interface FormData
  extends DifficultyStepData,
    TechStackStepData,
    ThemeStepData,
    DetailsStepData {
  interests: string[];
}

// ===== 폼 검증 결과 타입 =====
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings?: Record<string, string>;
}

// ===== 폼 제출 결과 타입 =====
export interface FormSubmitResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  validationErrors?: Record<string, string>;
}

// ===== 폼 훅 반환 타입 =====
export interface UseFormReturn<T = FormData> {
  // 상태
  data: T;
  status: FormStatus;
  errors: Record<string, string>;
  isValid: boolean;
  isSubmitting: boolean;

  // 액션
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setFieldError: (field: keyof T, error: string) => void;
  validateField: (field: keyof T) => boolean;
  validateForm: () => ValidationResult;
  resetForm: () => void;
  submitForm: () => Promise<FormSubmitResult<T>>;
}

// ===== 스키마 타입 =====
export type ZodSchema<T> = z.ZodSchema<T>;

// ===== 폼 옵션 타입 =====
export interface FormOption<T = string> {
  value: T;
  label: string;
  description?: string;
  disabled?: boolean;
}

// ===== 유틸리티 타입 =====
export type FormDataKeys = keyof FormData;

export type FormDataValues = FormData[FormDataKeys];

export type FormFieldKeys<T> = keyof T;

export type FormFieldValues<T> = T[FormFieldKeys<T>];

export type PartialFormData = Partial<FormData>;

export type RequiredFormFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// ===== 타입 가드 =====
export function isValidFormStep(step: string): step is FormStep {
  return ["difficulty", "techStack", "theme", "details"].includes(step);
}

export function isValidFormStatus(status: string): status is FormStatus {
  return ["idle", "validating", "submitting", "success", "error"].includes(
    status
  );
}

export function isFormField<T>(obj: unknown): obj is FormField<T> {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "value" in obj &&
    "touched" in obj &&
    "isValid" in obj &&
    typeof (obj as FormField<T>).touched === "boolean" &&
    typeof (obj as FormField<T>).isValid === "boolean"
  );
}

export function isValidationResult(obj: unknown): obj is ValidationResult {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "isValid" in obj &&
    "errors" in obj &&
    typeof (obj as ValidationResult).isValid === "boolean" &&
    typeof (obj as ValidationResult).errors === "object"
  );
}

export function isFormSubmitResult<T>(
  obj: unknown
): obj is FormSubmitResult<T> {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "success" in obj &&
    typeof (obj as FormSubmitResult<T>).success === "boolean"
  );
}
