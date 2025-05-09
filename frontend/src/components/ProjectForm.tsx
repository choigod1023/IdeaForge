import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ProjectRequest, ProjectCategory } from "../types";
import { useProjectStore } from "../stores/projectStore";
import { projectFormSchema } from "../schemas/projectFormSchema";
import { TechStackSelector } from "./forms/TechStackSelector";
import {
  INTEREST_OPTIONS,
  CATEGORY_OPTIONS,
  THEME_OPTIONS,
  DIFFICULTY_DESCRIPTIONS,
} from "../constants/formOptions";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

// 기술 스택과 관심 분야 매핑
const TECH_TO_INTEREST_MAP: Record<string, string[]> = {
  // 프론트엔드
  React: ["프론트엔드 개발"],
  Vue: ["프론트엔드 개발"],
  Angular: ["프론트엔드 개발"],
  TypeScript: ["프론트엔드 개발"],
  JavaScript: ["프론트엔드 개발"],
  "HTML/CSS": ["프론트엔드 개발", "UI/UX 디자인"],
  "Tailwind CSS": ["프론트엔드 개발", "UI/UX 디자인"],
  Redux: ["프론트엔드 개발"],
  "Next.js": ["프론트엔드 개발"],
  "Nuxt.js": ["프론트엔드 개발"],

  // 백엔드
  "Node.js": ["백엔드 개발"],
  Java: ["백엔드 개발"],
  Spring: ["백엔드 개발"],
  Python: ["백엔드 개발", "AI/ML", "데이터 분석"],
  Django: ["백엔드 개발"],
  FastAPI: ["백엔드 개발"],
  PostgreSQL: ["백엔드 개발"],
  MongoDB: ["백엔드 개발"],
  MySQL: ["백엔드 개발"],
  Redis: ["백엔드 개발"],

  // 모바일
  "React Native": ["모바일 앱 개발"],
  Flutter: ["모바일 앱 개발"],
  Swift: ["모바일 앱 개발"],
  Kotlin: ["모바일 앱 개발"],
  Dart: ["모바일 앱 개발"],
  Firebase: ["모바일 앱 개발"],

  // AI/ML/데이터
  TensorFlow: ["AI/ML"],
  PyTorch: ["AI/ML"],
  Pandas: ["데이터 분석"],
  "Scikit-learn": ["AI/ML", "데이터 분석"],
  OpenCV: ["AI/ML"],
  Jupyter: ["데이터 분석"],

  // 게임 개발
  Unity: ["게임 개발"],
  "Unreal Engine": ["게임 개발"],
  "C#": ["게임 개발"],
  "C++": ["게임 개발"],
  Blueprints: ["게임 개발"],
  Photon: ["게임 개발"],

  // 임베디드/IoT
  Arduino: ["임베디드/IoT"],
  "Raspberry Pi": ["임베디드/IoT"],
  C: ["임베디드/IoT"],
  MQTT: ["임베디드/IoT"],
  RTOS: ["임베디드/IoT"],

  // DevOps/클라우드
  AWS: ["클라우드", "DevOps"],
  Docker: ["DevOps"],
  Kubernetes: ["DevOps"],
  Terraform: ["DevOps"],
  Jenkins: ["DevOps"],
  "GitLab CI": ["DevOps"],

  // 보안
  Wireshark: ["보안"],
  Metasploit: ["보안"],
  "Burp Suite": ["보안"],
  OpenSSL: ["보안"],
  Cryptography: ["보안"],
  JWT: ["보안"],
};

// 기술 스택과 프로젝트 카테고리 매핑
const TECH_TO_CATEGORY_MAP: Record<string, ProjectCategory[]> = {
  // 웹 개발
  React: ["웹 개발"],
  Vue: ["웹 개발"],
  Angular: ["웹 개발"],
  TypeScript: ["웹 개발"],
  JavaScript: ["웹 개발"],
  "HTML/CSS": ["웹 개발"],
  "Tailwind CSS": ["웹 개발"],
  Redux: ["웹 개발"],
  "Next.js": ["웹 개발"],
  "Nuxt.js": ["웹 개발"],
  "Node.js": ["웹 개발"],
  Java: ["웹 개발"],
  Spring: ["웹 개발"],
  Python: ["웹 개발"],
  Django: ["웹 개발"],
  FastAPI: ["웹 개발"],
  PostgreSQL: ["웹 개발"],
  MongoDB: ["웹 개발"],
  MySQL: ["웹 개발"],
  Redis: ["웹 개발"],

  // 모바일 앱
  "React Native": ["모바일 앱"],
  Flutter: ["모바일 앱"],
  Swift: ["모바일 앱"],
  Kotlin: ["모바일 앱"],
  Dart: ["모바일 앱"],
  Firebase: ["모바일 앱"],

  // AI/ML
  TensorFlow: ["AI/ML"],
  PyTorch: ["AI/ML"],
  "Scikit-learn": ["AI/ML"],
  OpenCV: ["AI/ML"],

  // 데이터 분석
  Pandas: ["데이터 분석"],
  Jupyter: ["데이터 분석"],

  // 게임
  Unity: ["게임"],
  "Unreal Engine": ["게임"],
  "C#": ["게임"],
  "C++": ["게임", "임베디드"],
  Blueprints: ["게임"],
  Photon: ["게임"],

  // 보안
  Wireshark: ["보안"],
  Metasploit: ["보안"],
  "Burp Suite": ["보안"],
  OpenSSL: ["보안"],
  Cryptography: ["보안"],
  JWT: ["보안"],

  // 임베디드
  Arduino: ["임베디드"],
  "Raspberry Pi": ["임베디드"],
  C: ["임베디드"],
  MQTT: ["임베디드"],
  RTOS: ["임베디드"],
};

export const ProjectForm = () => {
  const { generateProject, preferredTech } = useProjectStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProjectRequest>({
    resolver: zodResolver(projectFormSchema),
  });

  // preferredTech가 변경될 때 폼 값 업데이트
  useEffect(() => {
    if (preferredTech.length > 0) {
      setValue("preferredTech", preferredTech);

      // 선택된 기술 스택에 해당하는 관심 분야 자동 선택
      const relatedInterests = new Set<string>();
      preferredTech.forEach((tech) => {
        const interests = TECH_TO_INTEREST_MAP[tech] || [];
        interests.forEach((interest) => relatedInterests.add(interest));
      });
      setValue("interests", Array.from(relatedInterests));

      // 선택된 기술 스택에 해당하는 프로젝트 카테고리 자동 선택
      const relatedCategories = new Set<ProjectCategory>();
      preferredTech.forEach((tech) => {
        const categories = TECH_TO_CATEGORY_MAP[tech] || [];
        categories.forEach((category) => relatedCategories.add(category));
      });

      // 가장 많이 언급된 카테고리를 선택
      const categoryCounts = Array.from(relatedCategories).reduce(
        (acc, category) => {
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        },
        {} as Record<ProjectCategory, number>
      );

      const selectedCategory = Object.entries(categoryCounts).sort(
        ([, a], [, b]) => b - a
      )[0]?.[0] as ProjectCategory;

      if (selectedCategory) {
        setValue("category", selectedCategory);
      }
    }
  }, [preferredTech, setValue]);

  const {
    mutate: submitProject,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: ProjectRequest) => {
      console.log("Submitting project data:", data);
      await generateProject(data);
    },
    onSuccess: () => {
      console.log("Project created successfully");
    },
    onError: (error) => {
      console.error("Error creating project:", error);
    },
  });

  const onSubmit = async (data: ProjectRequest) => {
    console.log("Form submitted with data:", data);
    submitProject(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 난이도 선택 */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          난이도
        </label>
        <div className="space-y-2">
          {Object.entries(DIFFICULTY_DESCRIPTIONS).map(
            ([level, description]) => (
              <label
                key={level}
                className="flex items-start p-3 space-x-3 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="radio"
                  value={level}
                  {...register("difficulty", {
                    required: "난이도를 선택해주세요",
                  })}
                  className="w-4 h-4 mt-1 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <div>
                  <span className="block text-sm font-medium text-gray-900">
                    {level}
                  </span>
                  <span className="block text-sm text-gray-500">
                    {description}
                  </span>
                </div>
              </label>
            )
          )}
        </div>
        {errors.difficulty && (
          <p className="mt-1 text-sm text-red-600">
            {errors.difficulty.message as string}
          </p>
        )}
      </div>

      {/* 기술 스택 선택 */}
      <TechStackSelector register={register} watch={watch} />

      {/* 관심 분야 선택 */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          관심 있는 분야
        </label>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {INTEREST_OPTIONS.map((interest) => (
            <label
              key={interest}
              className="flex items-center space-x-2 text-sm"
            >
              <input
                type="checkbox"
                value={interest}
                {...register("interests")}
                className="text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-gray-700">{interest}</span>
            </label>
          ))}
        </div>
        {errors.interests && (
          <p className="mt-1 text-sm text-red-600">
            {errors.interests.message as string}
          </p>
        )}
      </div>

      {/* 프로젝트 카테고리 선택 */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          프로젝트 카테고리
        </label>
        <select
          {...register("category", { required: "카테고리를 선택해주세요" })}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">카테고리 선택</option>
          {CATEGORY_OPTIONS.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">
            {errors.category.message as string}
          </p>
        )}
      </div>

      {/* 프로젝트 테마 선택 */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          프로젝트 테마
        </label>
        <select
          {...register("theme", { required: "테마를 선택해주세요" })}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">테마 선택</option>
          {THEME_OPTIONS.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
        {errors.theme && (
          <p className="mt-1 text-sm text-red-600">
            {errors.theme.message as string}
          </p>
        )}
      </div>

      {/* 가용 시간 입력 */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          가용 시간
        </label>
        <input
          type="text"
          {...register("timeAvailable", {
            required: "가용 시간을 입력해주세요",
          })}
          placeholder="예: 2주, 1개월, 3개월"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.timeAvailable && (
          <p className="mt-1 text-sm text-red-600">
            {errors.timeAvailable.message as string}
          </p>
        )}
      </div>

      {/* 추가 정보 포함 */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          추가 정보 포함
        </label>
        <div className="space-y-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("hasPrerequisites")}
              className="text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-900">
              사전 지식/요구사항
            </span>
          </label>
          <br />
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("hasChallenges")}
              className="text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-900">
              예상되는 도전 과제
            </span>
          </label>
          <br />
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("hasTips")}
              className="text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-900">개발 팁</span>
          </label>
        </div>
      </div>

      {/* 제출 버튼 */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isPending ? "생성 중..." : "프로젝트 생성하기"}
        </button>
      </div>
      {error && (
        <div className="p-4 mt-4 text-sm text-red-700 bg-red-100 rounded-lg">
          프로젝트 생성 중 오류가 발생했습니다: {error.message}
        </div>
      )}
    </form>
  );
};
