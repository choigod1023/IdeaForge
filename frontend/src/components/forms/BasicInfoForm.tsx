import type {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";
import type { ProjectRequest } from "../../types";
import {
  TECH_OPTIONS,
  INTEREST_OPTIONS,
  DIFFICULTY_DESCRIPTIONS,
} from "../../constants/formOptions";

interface BasicInfoFormProps {
  register: UseFormRegister<ProjectRequest>;
  errors: FieldErrors<ProjectRequest>;
  watch: UseFormWatch<ProjectRequest>;
}

export const BasicInfoForm = ({
  register,
  errors,
  watch,
}: BasicInfoFormProps) => (
  <div className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-700">난이도</label>
      <select
        {...register("difficulty")}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="Beginner">초급</option>
        <option value="Intermediate">중급</option>
        <option value="Advanced">고급</option>
      </select>
      <p className="mt-2 text-sm text-gray-500">
        {DIFFICULTY_DESCRIPTIONS[watch("difficulty")]}
      </p>
      {errors.difficulty && (
        <p className="mt-1 text-sm text-red-600">{errors.difficulty.message}</p>
      )}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">
        선호하는 기술
      </label>
      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
        {TECH_OPTIONS.map((tech) => (
          <label key={tech} className="inline-flex items-center">
            <input
              type="checkbox"
              value={tech}
              {...register("preferredTech")}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-900">{tech}</span>
          </label>
        ))}
      </div>
      {errors.preferredTech && (
        <p className="mt-1 text-sm text-red-600">
          {errors.preferredTech.message}
        </p>
      )}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">
        가용 시간
      </label>
      <input
        type="text"
        {...register("timeAvailable")}
        placeholder="예: 2주, 1개월, 3개월"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
      {errors.timeAvailable && (
        <p className="mt-1 text-sm text-red-600">
          {errors.timeAvailable.message}
        </p>
      )}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">
        관심 분야
      </label>
      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
        {INTEREST_OPTIONS.map((interest) => (
          <label key={interest} className="inline-flex items-center">
            <input
              type="checkbox"
              value={interest}
              {...register("interests")}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-900">{interest}</span>
          </label>
        ))}
      </div>
      {errors.interests && (
        <p className="mt-1 text-sm text-red-600">{errors.interests.message}</p>
      )}
    </div>
  </div>
);
