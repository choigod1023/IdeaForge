import { useState, useEffect, useRef } from "react";
import type { UseFormRegister, UseFormWatch } from "react-hook-form";
import type { ProjectRequest } from "../../types";

// 기술 스택 카테고리 정의
const TECH_CATEGORIES = {
  프론트엔드: [
    "React",
    "Vue",
    "Angular",
    "TypeScript",
    "JavaScript",
    "HTML/CSS",
    "Tailwind CSS",
    "Redux",
    "Next.js",
    "Nuxt.js",
  ],
  백엔드: [
    "Node.js",
    "Java",
    "Spring",
    "Python",
    "Django",
    "FastAPI",
    "PostgreSQL",
    "MongoDB",
    "MySQL",
    "Redis",
  ],
  모바일: ["React Native", "Flutter", "Swift", "Kotlin", "Dart", "Firebase"],
  "AI/ML/데이터": [
    "TensorFlow",
    "PyTorch",
    "Pandas",
    "Scikit-learn",
    "OpenCV",
    "Jupyter",
  ],
  "게임 개발": ["Unity", "Unreal Engine", "C#", "C++", "Blueprints", "Photon"],
  "임베디드/IoT": ["Arduino", "Raspberry Pi", "C", "C++", "MQTT", "RTOS"],
  "DevOps/클라우드": [
    "AWS",
    "Docker",
    "Kubernetes",
    "Terraform",
    "Jenkins",
    "GitLab CI",
  ],
  보안: [
    "Wireshark",
    "Metasploit",
    "Burp Suite",
    "OpenSSL",
    "Cryptography",
    "JWT",
  ],
} as const;

interface TechStackSelectorProps {
  register: UseFormRegister<ProjectRequest>;
  watch: UseFormWatch<ProjectRequest>;
}

export const TechStackSelector = ({
  register,
  watch,
}: TechStackSelectorProps) => {
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const selectedTechs = watch("preferredTech") || [];
  const prevSelectedTechsRef = useRef<string[]>([]);

  useEffect(() => {
    // 이전 선택과 현재 선택이 다를 때만 카테고리 업데이트
    if (
      JSON.stringify(prevSelectedTechsRef.current) !==
      JSON.stringify(selectedTechs)
    ) {
      // 선택된 기술 스택이 있는 카테고리만 열기
      const categoriesWithSelectedTechs = Object.entries(TECH_CATEGORIES)
        .filter(([, techs]) =>
          techs.some((tech) => selectedTechs.includes(tech))
        )
        .map(([category]) => category);

      // 모든 카테고리를 닫고 선택된 카테고리만 열기
      setOpenCategories(categoriesWithSelectedTechs);

      prevSelectedTechsRef.current = selectedTechs;
    }
  }, [selectedTechs]);

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        선호하는 기술 스택
      </label>
      <div className="space-y-1">
        {Object.entries(TECH_CATEGORIES).map(([category, techs]) => (
          <div key={category} className="rounded-lg bg-gray-50/50">
            <div
              onClick={() => toggleCategory(category)}
              className="flex items-center justify-between w-full px-4 py-3 transition-colors bg-white border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100/50"
            >
              <span className="font-medium text-gray-900">{category}</span>
              <span className="text-gray-500">
                {openCategories.includes(category) ? "▼" : "▶"}
              </span>
            </div>
            {openCategories.includes(category) && (
              <div className="grid grid-cols-2 gap-2 px-4 pb-3 md:grid-cols-3">
                {techs.map((tech) => (
                  <label
                    key={tech}
                    className="flex items-center p-1 space-x-2 text-sm rounded hover:bg-gray-100/50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      value={tech}
                      {...register("preferredTech")}
                      className="text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="text-gray-700">{tech}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
