import { FaList, FaChevronRight } from "react-icons/fa";

interface FeatureItem {
  title: string;
  description: string;
  keyPoints: string[];
}

interface FeatureSection {
  mainTitle: string;
  description: string;
  items: FeatureItem[];
}

interface ProjectFeaturesProps {
  features: string[] | FeatureSection[];
}

export function ProjectFeatures({ features }: ProjectFeaturesProps) {
  // 기존 형식(문자열 배열)을 새로운 형식으로 변환하는 함수
  const convertLegacyFeatures = (
    legacyFeatures: string[]
  ): FeatureSection[] => {
    return [
      {
        mainTitle: "주요 기능",
        description: "프로젝트의 핵심 기능들을 소개해요.",
        items: legacyFeatures.map((feature) => {
          const parts = feature.split(":");
          return {
            title: parts[0].trim(),
            description: parts.length > 1 ? parts[1].trim() : "",
            keyPoints: [],
          };
        }),
      },
    ];
  };

  // features가 문자열 배열인지 확인하고 적절한 형식으로 변환
  const processedFeatures =
    Array.isArray(features) &&
    features.length > 0 &&
    typeof features[0] === "string"
      ? convertLegacyFeatures(features as string[])
      : (features as FeatureSection[]);

  return (
    <div className="space-y-6">
      <h3 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white">
        <FaList className="w-5 h-5 mr-3 text-indigo-500 dark:text-indigo-400" />
        주요 기능
      </h3>

      <div className="grid gap-6">
        {processedFeatures.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="overflow-hidden bg-white border border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700"
          >
            {/* 섹션 헤더 */}
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center w-6 h-6 text-sm font-medium text-white bg-indigo-500 rounded-full">
                  {sectionIndex + 1}
                </span>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {section.mainTitle}
                </h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {section.description}
              </p>
            </div>

            {/* 섹션 내용 */}
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
                      <FaChevronRight className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-base font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </h5>
                      {item.description && (
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      )}
                      {item.keyPoints && item.keyPoints.length > 0 && (
                        <ul className="mt-3 space-y-2">
                          {item.keyPoints.map((point, pointIndex) => (
                            <li
                              key={pointIndex}
                              className="flex items-start text-sm text-gray-600 dark:text-gray-300"
                            >
                              <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 mr-2 rounded-full bg-indigo-200 dark:bg-indigo-700" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
