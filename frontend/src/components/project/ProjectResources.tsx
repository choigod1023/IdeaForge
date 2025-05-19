import {
  FaLink,
  FaExternalLinkAlt,
  FaYoutube,
  FaFileAlt,
  FaBlog,
  FaGithub,
  FaStackOverflow,
  FaSearch,
} from "react-icons/fa";

// 내부적으로 사용할 Resource 타입
interface Resource {
  title: string;
  url: string;
  type:
    | "video"
    | "document"
    | "search"
    | "blog"
    | "github"
    | "stackoverflow"
    | "techblog";
  searchKeyword?: string;
}

interface ProjectResourcesProps {
  resources: string[];
}

export function ProjectResources({ resources }: ProjectResourcesProps) {
  // HTML 엔티티와 특수문자를 정리하는 함수
  const cleanText = (text: string) => {
    return text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ")
      .trim();
  };

  // 기존 리소스 파싱
  const parseResource = (resource: string): Resource => {
    // "[카테고리] 제목 : URL : 검색키워드" 형식으로 되어있는 경우
    const parts = resource.split(/:\s+/);
    if (parts.length >= 2) {
      const originalTitle = cleanText(parts[0]);
      const url = cleanText(parts[1]);
      const searchKeyword = parts[2] ? cleanText(parts[2]) : undefined;

      try {
        const urlObj = new URL(url);
        const domain = urlObj.hostname.replace(/^www\./, "");

        // 기술 블로그 URL인 경우 검색 링크로 변환
        const techBlogDomains = {
          "d2.naver.com": {
            name: "NAVER D2",
            searchUrl: "https://d2.naver.com/search?keyword=",
          },
          "techblog.woowahan.com": {
            name: "우아한형제들 기술블로그",
            searchUrl: "https://techblog.woowahan.com/?s=",
          },
          "engineering.linecorp.com": {
            name: "LINE Engineering",
            searchUrl: "https://engineering.linecorp.com/ko/search?q=",
          },
          "tech.kakao.com": {
            name: "Kakao 기술블로그",
            searchUrl: "https://tech.kakao.com/search/?query=",
          },
        };

        const techBlog =
          techBlogDomains[domain as keyof typeof techBlogDomains];
        if (techBlog && searchKeyword) {
          return {
            title: `${techBlog.name} - ${searchKeyword} 검색`,
            url: `${techBlog.searchUrl}${encodeURIComponent(searchKeyword)}`,
            type: "techblog",
            searchKeyword,
          };
        }

        // 일반 URL 타입 결정
        let type: Resource["type"] = "document";
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
          type = "video";
        } else if (url.includes("github.com")) {
          type = "github";
        } else if (url.includes("stackoverflow.com")) {
          type = "stackoverflow";
        } else if (
          url.includes("blog") ||
          url.includes("techblog") ||
          url.includes("engineering")
        ) {
          type = "blog";
        }

        return { title: originalTitle, url, type, searchKeyword };
      } catch {
        // URL 파싱 실패 시 기본 문서 타입으로 처리
        return {
          title: originalTitle,
          url,
          type: "document",
          searchKeyword,
        };
      }
    }

    // URL만 있는 경우
    const cleanUrl = cleanText(resource);
    let type: Resource["type"] = "document";
    if (cleanUrl.includes("youtube.com") || cleanUrl.includes("youtu.be")) {
      type = "video";
    } else if (cleanUrl.includes("github.com")) {
      type = "github";
    } else if (cleanUrl.includes("stackoverflow.com")) {
      type = "stackoverflow";
    } else if (
      cleanUrl.includes("blog") ||
      cleanUrl.includes("techblog") ||
      cleanUrl.includes("engineering")
    ) {
      type = "blog";
    }

    return {
      title: getDisplayText(cleanUrl),
      url: cleanUrl,
      type,
    };
  };

  // URL에서 도메인만 추출하는 함수
  const getDisplayText = (url: string): string => {
    try {
      const urlObj = new URL(url);
      return cleanText(urlObj.hostname.replace(/^www\./, ""));
    } catch {
      return cleanText(url);
    }
  };

  // 리소스 타입에 따른 아이콘 컴포넌트
  const ResourceIcon = ({ type }: { type: Resource["type"] }) => {
    const iconClass = "w-4 h-4 sm:w-5 sm:h-5";
    switch (type) {
      case "video":
        return (
          <FaYoutube
            className={`${iconClass} text-red-600 dark:text-red-400`}
          />
        );
      case "blog":
        return (
          <FaBlog
            className={`${iconClass} text-indigo-600 dark:text-indigo-400`}
          />
        );
      case "github":
        return (
          <FaGithub
            className={`${iconClass} text-indigo-600 dark:text-indigo-400`}
          />
        );
      case "stackoverflow":
        return (
          <FaStackOverflow
            className={`${iconClass} text-indigo-600 dark:text-indigo-400`}
          />
        );
      case "techblog":
        return (
          <FaSearch
            className={`${iconClass} text-green-600 dark:text-green-400`}
          />
        );
      default:
        return (
          <FaFileAlt
            className={`${iconClass} text-indigo-600 dark:text-indigo-400`}
          />
        );
    }
  };

  // 기존 리소스 파싱만 사용
  const allResources = resources.map(parseResource);

  return (
    <div>
      <h3 className="flex items-center mb-4 text-base font-semibold text-gray-900 sm:text-lg md:text-xl dark:text-gray-100">
        <FaLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-2.5 text-indigo-500 dark:text-indigo-400" />
        참고 자료
      </h3>
      <ul className="space-y-3 sm:space-y-4">
        {allResources.map((resource, index) => {
          const { title, url, type } = resource;
          return (
            <li
              key={index}
              className="flex items-start text-sm text-gray-700 sm:text-base md:text-lg dark:text-gray-200"
            >
              <div className="flex flex-col gap-1 sm:gap-1.5">
                <div className="flex items-center gap-2">
                  <ResourceIcon type={type} />
                  <span className="font-medium break-keep-all [word-break:keep-all]">
                    {title}
                  </span>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs text-indigo-600 transition-colors rounded-md sm:text-sm dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 w-fit"
                  title={url}
                >
                  <FaExternalLinkAlt className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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
