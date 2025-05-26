import { FaLaptopCode, FaCode, FaGithub, FaTools } from "react-icons/fa";

interface ProjectTypeProps {
  types: string[];
}

const PROJECT_TYPE_DESCRIPTIONS: Record<string, string[]> = {
  토이: [
    "작은 규모의 학습용 프로젝트예요.",
    "새로운 기술을 실험해볼 수 있어요.",
    "부담 없이 시작할 수 있어요.",
    "실패해도 괜찮아요.",
  ],
  포트폴리오: [
    "개발 역량을 보여주는 프로젝트예요.",
    "실제 서비스처럼 구현해요.",
    "기술적 깊이를 보여줄 수 있어요.",
    "코드 품질이 중요해요.",
  ],
  오픈소스: [
    "커뮤니티와 함께 만드는 프로젝트예요.",
    "코드 품질이 매우 중요해요.",
    "다른 개발자와 협업해요.",
    "기술적 성장의 기회예요.",
  ],
  실용: [
    "실제 문제를 해결하는 프로젝트예요.",
    "사용자 경험이 중요해요.",
    "실제 활용성을 고려해요.",
    "사용자 피드백을 받아요.",
  ],
};

export function ProjectType({ types }: ProjectTypeProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "토이":
        return <FaCode className="w-6 h-6 sm:w-7 sm:h-7" />;
      case "포트폴리오":
        return <FaLaptopCode className="w-6 h-6 sm:w-7 sm:h-7" />;
      case "오픈소스":
        return <FaGithub className="w-6 h-6 sm:w-7 sm:h-7" />;
      case "실용":
        return <FaTools className="w-6 h-6 sm:w-7 sm:h-7" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "토이":
        return "토이 프로젝트";
      case "포트폴리오":
        return "포트폴리오 프로젝트";
      case "오픈소스":
        return "오픈소스 프로젝트";
      case "실용":
        return "실용 프로젝트";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="flex items-center text-lg font-semibold text-gray-900 sm:text-xl md:text-2xl dark:text-gray-100">
        <FaCode className="w-5 h-5 mr-3 text-indigo-500 sm:w-6 sm:h-6 dark:text-indigo-400" />
        프로젝트 유형
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        {types.map((type, index) => (
          <div
            key={index}
            className="relative overflow-hidden transition-colors bg-white border border-gray-100 rounded-2xl dark:bg-gray-800/50 dark:border-gray-700 group hover:border-indigo-200 dark:hover:border-indigo-800"
          >
            <div className="absolute top-0 right-0 p-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/50 dark:to-indigo-800/50 blur-sm" />
                <div className="relative p-2 text-indigo-600 dark:text-indigo-300">
                  {getTypeIcon(type)}
                </div>
              </div>
            </div>

            <div className="relative p-5">
              <h4 className="mb-3 text-lg font-medium text-gray-900 dark:text-gray-100">
                {getTypeLabel(type)}
              </h4>
              <ul className="space-y-2">
                {(
                  PROJECT_TYPE_DESCRIPTIONS[type] || [
                    "프로젝트 유형에 대한 설명이 없어요.",
                  ]
                ).map((sentence, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-sm text-gray-600 dark:text-gray-400"
                  >
                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 mr-2 rounded-full bg-indigo-200 dark:bg-indigo-600" />
                    {sentence}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
