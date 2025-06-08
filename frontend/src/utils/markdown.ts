import type { Project } from "../types";

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

export const generateMarkdown = (project: Project): string => {
  try {
    return `# ${project.title}

## 프로젝트 정보
- **난이도**: ${project.difficulty}
${project.category ? `- **카테고리**: ${project.category}\n` : ""}${
      project.theme ? `- **테마**: ${project.theme}\n` : ""
    }

## 프로젝트 설명
${project.description.summary}

## 핵심 포인트
${project.description.keyPoints.map((point) => `- ${point}`).join("\n")}

## 기술 스택
${project.techStack
  .map((tech) => `- ${tech.name}\n  ${tech.descriptions.join("\n  ")}`)
  .join("\n")}

## 주요 기능
${project.features
  .map((feature: string | FeatureSection) => {
    if (typeof feature === "string") {
      return `- ${feature}`;
    }
    return `### ${feature.mainTitle}
${feature.description}

${feature.items
  .map(
    (item: FeatureItem) =>
      `#### ${item.title}
${item.description}

${item.keyPoints.map((point: string) => `- ${point}`).join("\n")}`
  )
  .join("\n\n")}`;
  })
  .join("\n\n")}

${
  project.prerequisites && project.prerequisites.length > 0
    ? `## 사전 지식
${project.prerequisites
  .map(
    (category) =>
      `### ${category.category}\n${category.items
        .map((item) => `- **${item.name}**: ${item.description}`)
        .join("\n")}`
  )
  .join("\n\n")}\n`
    : ""
}

${
  project.challenges && project.challenges.length > 0
    ? `## 도전 과제
${project.challenges
  .map(
    (category) =>
      `### ${category.category}\n${category.items
        .map((item) => `- **${item.name}**: ${item.description}`)
        .join("\n")}`
  )
  .join("\n\n")}\n`
    : ""
}

${
  project.tips && project.tips.length > 0
    ? `## 개발 팁
${project.tips
  .map(
    (category) =>
      `### ${category.category}\n${category.items
        .map((item) => `- **${item.name}**: ${item.description}`)
        .join("\n")}`
  )
  .join("\n\n")}\n`
    : ""
}

${
  project.resources && project.resources.length > 0
    ? `## 참고 자료
${project.resources
  .map(
    (resource) =>
      `### ${resource.title}
- **설명**: ${resource.description}
- **URL**: ${resource.url}
- **학습 포인트**:
${resource.learningPoints.map((point) => `  - ${point}`).join("\n")}
${
  resource.codeExamples.length > 0
    ? `- **코드 예시**:\n${resource.codeExamples
        .map((example) => `  - ${example}`)
        .join("\n")}`
    : ""
}
${
  resource.practicalExamples.length > 0
    ? `- **실전 예시**:\n${resource.practicalExamples
        .map((example) => `  - ${example}`)
        .join("\n")}`
    : ""
}`
  )
  .join("\n\n")}\n`
    : ""
}

---
생성일: ${project.createdAt || new Date().toLocaleDateString()}`;
  } catch (error) {
    console.error("마크다운 생성 중 오류:", error);
    throw new Error("마크다운 생성에 실패했습니다.");
  }
};

export const exportProjectToMarkdown = (project: Project): void => {
  const markdown = generateMarkdown(project);

  // 파일명 생성 (특수문자 제거 및 공백을 언더스코어로 변환)
  const safeFileName = project.title
    .replace(/[^a-zA-Z0-9가-힣]/g, "_")
    .replace(/_+/g, "_")
    .toLowerCase();

  const blob = new Blob([markdown], {
    type: "text/markdown;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${safeFileName}.md`;
  document.body.appendChild(a);
  a.click();

  // 클린업
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
};
