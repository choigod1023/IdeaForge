import { FaLink, FaExternalLinkAlt } from "react-icons/fa";

interface ProjectResourcesProps {
  resources: string[];
}

export function ProjectResources({ resources }: ProjectResourcesProps) {
  // 설명 텍스트와 URL을 분리하는 함수
  const parseResource = (resource: string) => {
    // "설명 : URL" 형식으로 되어있는 경우
    const parts = resource.split(/:\s+/);
    if (parts.length === 2) {
      return {
        description: parts[0].trim().replace(/^-\s*['"]?|['"]?$/g, ""),
        url: parts[1].trim(),
      };
    }
    // URL만 있는 경우
    return {
      description: getDisplayText(resource),
      url: resource,
    };
  };

  // URL에서 도메인만 추출하는 함수
  const getDisplayText = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace(/^www\./, "");
    } catch {
      return url;
    }
  };

  return (
    <div>
      <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        <FaLink className="mr-2.5 text-indigo-500 dark:text-indigo-400" />
        참고 자료
      </h3>
      <ul className="space-y-3">
        {resources.map((resource, index) => {
          const { description, url } = parseResource(resource);
          return (
            <li
              key={index}
              className="flex items-start text-base text-gray-700 dark:text-gray-200"
            >
              <span className="flex items-center justify-center w-5 h-5 mt-0.5 mr-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 rounded-full shrink-0">
                {index + 1}
              </span>
              <div className="flex items-center gap-1.5">
                <span>{description}</span>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 text-sm text-indigo-600 transition-colors rounded-md dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                  title={url}
                >
                  <FaExternalLinkAlt className="w-3.5 h-3.5" />
                  {getDisplayText(url)}
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
