import type { TechStackCategory } from "./types";

export const TECH_STACK_CATEGORIES: TechStackCategory[] = [
  {
    name: "웹 개발",
    stacks: [
      {
        category: "React + Node.js 풀스택",
        techs: ["React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
        description: "React와 Node.js를 활용한 현대적인 풀스택 웹 애플리케이션",
      },
      {
        category: "Next.js 풀스택",
        techs: [
          "Next.js",
          "TypeScript",
          "PostgreSQL",
          "Docker",
          "Tailwind CSS",
        ],
        description:
          "Next.js의 서버 컴포넌트와 API 라우트를 활용한 풀스택 개발",
      },
      {
        category: "Vue + Spring 풀스택",
        techs: ["Vue", "TypeScript", "Java", "Spring", "MySQL"],
        description: "Vue.js와 Spring Boot로 구현하는 엔터프라이즈급 웹 서비스",
      },
      {
        category: "Python 백엔드",
        techs: ["Python", "FastAPI", "PostgreSQL", "Docker", "Redis"],
        description: "Python과 FastAPI로 구현하는 고성능 백엔드 서비스",
      },
    ],
  },
  // ... rest of the categories
];
