import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ProjectRequest } from "../types";
import { useProjectStore } from "../stores/projectStore";
import { projectFormSchema } from "../schemas/projectFormSchema";
import { BasicInfoForm } from "./forms/BasicInfoForm";
import { AdditionalInfoForm } from "./forms/AdditionalInfoForm";

export const ProjectForm = () => {
  const [step, setStep] = useState(1);
  const generateProject = useProjectStore((state) => state.generateProject);
  const isLoading = useProjectStore((state) => state.isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProjectRequest>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      difficulty: "Beginner",
      preferredTech: [],
      timeAvailable: "",
      interests: [],
      hasPrerequisites: true,
      hasChallenges: true,
      hasTips: true,
    },
  });

  const onSubmit = (data: ProjectRequest) => {
    // 필수 필드 검증
    if (
      !data.difficulty ||
      data.preferredTech.length === 0 ||
      !data.timeAvailable ||
      data.interests.length === 0
    ) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }
    generateProject(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {step === 1 ? "기본 정보" : "추가 정보"}
          </h2>
          <span className="text-sm text-gray-500">Step {step}/2</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 ? (
        <BasicInfoForm register={register} errors={errors} watch={watch} />
      ) : (
        <AdditionalInfoForm register={register} />
      )}

      <div className="flex justify-between pt-6">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            이전
          </button>
        )}
        {step < 2 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="ml-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            다음
          </button>
        ) : (
          <button
            type="submit"
            disabled={isLoading}
            className="ml-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? "생성 중..." : "프로젝트 생성하기"}
          </button>
        )}
      </div>
    </form>
  );
};
