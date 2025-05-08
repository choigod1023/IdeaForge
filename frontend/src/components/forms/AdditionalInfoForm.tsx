import type { UseFormRegister } from "react-hook-form";
import type { ProjectRequest } from "../../types";
import { CATEGORY_OPTIONS, THEME_OPTIONS } from "../../constants/formOptions";

interface AdditionalInfoFormProps {
  register: UseFormRegister<ProjectRequest>;
}

export const AdditionalInfoForm = ({ register }: AdditionalInfoFormProps) => (
  <div className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-700">
        프로젝트 카테고리
      </label>
      <select
        {...register("category")}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">선택해주세요</option>
        {CATEGORY_OPTIONS.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">
        프로젝트 테마
      </label>
      <select
        {...register("theme")}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">선택해주세요</option>
        {THEME_OPTIONS.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">
        프로젝트 설명 (선택사항)
      </label>
      <textarea
        {...register("description")}
        rows={4}
        placeholder="프로젝트에 대한 추가적인 설명이나 요구사항을 입력해주세요"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>

    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        추가 정보 포함
      </label>
      <div className="space-y-2">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            {...register("hasPrerequisites")}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="ml-2 text-sm text-gray-900">사전 지식/요구사항</span>
        </label>
        <br />
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            {...register("hasChallenges")}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="ml-2 text-sm text-gray-900">예상되는 도전 과제</span>
        </label>
        <br />
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            {...register("hasTips")}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="ml-2 text-sm text-gray-900">개발 팁</span>
        </label>
      </div>
    </div>
  </div>
);
