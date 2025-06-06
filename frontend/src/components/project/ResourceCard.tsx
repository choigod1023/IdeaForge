import { useState } from "react";
import { FaBook, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { cn } from "../../utils/cn";
import type { ProjectResource } from "../../types";

interface ResourceCardProps {
  resource: ProjectResource;
}

const getCategoryStyles = (category: string) => ({
  icon: cn(
    "flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full",
    category === "tech"
      ? "bg-blue-100 dark:bg-blue-900/50"
      : "bg-purple-100 dark:bg-purple-900/50"
  ),
  iconColor: cn(
    "h-4 w-4",
    category === "tech"
      ? "text-blue-600 dark:text-blue-400"
      : "text-purple-600 dark:text-purple-400"
  ),
  title: cn(
    "text-sm sm:text-base font-medium truncate",
    category === "tech"
      ? "text-blue-600 dark:text-blue-400"
      : "text-purple-600 dark:text-purple-400"
  ),
  badge: cn(
    "px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap",
    category === "tech"
      ? "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
      : "text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-300"
  ),
});

export function ResourceCard({ resource }: ResourceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const styles = getCategoryStyles(resource.category);

  return (
    <div className="overflow-hidden bg-white border border-gray-200 rounded-3xl dark:border-gray-700 dark:bg-gray-800">
      {/* 헤더 - 클릭 가능한 영역 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50"
      >
        <div className="flex items-center flex-1 min-w-0 gap-3">
          <div className={styles.icon}>
            <FaBook className={styles.iconColor} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={styles.title}>{resource.title.trim()}</h3>
            <p className="mt-1 text-xs text-gray-600 sm:text-sm dark:text-gray-300 line-clamp-2">
              {resource.description.trim()}
            </p>
          </div>
        </div>
        <div className="flex items-center flex-shrink-0 gap-3 ml-4">
          <div className="flex flex-col items-end gap-1">
            <span className={styles.badge}>
              {resource.category === "tech" ? "기술" : "기능"}
            </span>
            <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full whitespace-nowrap dark:bg-green-900 dark:text-green-300">
              {resource.relevance.score}/10
            </span>
          </div>
          {isExpanded ? (
            <FaChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <FaChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      {/* 상세 내용 */}
      {isExpanded && (
        <div className="bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-800">
          <div className="p-4 space-y-4">
            {/* 타이틀 */}
            <div className="p-3 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700/50">
              <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                제목
              </h4>
              <h3
                className={cn("text-base sm:text-lg font-medium", styles.title)}
              >
                {resource.title.trim()}
              </h3>
            </div>

            {/* 설명 */}
            <div className="p-3 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700/50">
              <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                설명
              </h4>
              <p className="text-sm text-gray-600 whitespace-pre-wrap dark:text-gray-300">
                {resource.description.trim()}
              </p>
            </div>

            {/* 학습 포인트 */}
            <div className="p-3 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700/50">
              <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                학습 포인트
              </h4>
              <ul className="space-y-2">
                {resource.learningPoints.map((point: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                  >
                    <span className="text-blue-500">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 코드 예시 */}
            {Array.isArray(resource.codeExamples) &&
              resource.codeExamples.length > 0 && (
                <div className="p-3 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700/50">
                  <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                    구현 사례
                  </h4>
                  <div className="space-y-2">
                    {resource.codeExamples.map(
                      (example: string, index: number) => (
                        <div key={index} className="overflow-x-auto">
                          <pre className="p-2 text-sm whitespace-pre-wrap bg-white rounded dark:bg-gray-800">
                            {example}
                          </pre>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

            {/* 실전 예시 */}
            {Array.isArray(resource.practicalExamples) &&
              resource.practicalExamples.length > 0 && (
                <div className="p-3 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700/50">
                  <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                    실전 예시
                  </h4>
                  <ul className="space-y-2">
                    {resource.practicalExamples.map(
                      (example: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                        >
                          <span className="text-green-500">•</span>
                          <span>{example}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

            {/* 관련성 분석 */}
            <div className="p-3 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700/50">
              <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                관련성 분석
              </h4>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
                {resource.relevance.reason}
              </p>
              <div className="flex flex-wrap gap-2">
                {resource.relevance.keyPoints.map(
                  (point: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium text-yellow-600 rounded-full bg-yellow-50 dark:bg-yellow-900/30 dark:text-yellow-300"
                    >
                      {point}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* 외부 링크 */}
            {resource.url && resource.url.startsWith("http") && (
              <div className="flex items-center justify-between pt-2">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  <FaBook className="w-4 h-4" />
                  자세히 보기
                </a>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="inline-flex items-center gap-1 px-3 py-1 text-sm text-gray-600 transition-colors rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <FaChevronUp className="w-4 h-4" />
                  접기
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
