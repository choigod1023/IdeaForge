import { useRef } from "react";
import {
  FaReact,
  FaNodeJs,
  FaMobile,
  FaDatabase,
  FaCloud,
  FaShieldAlt,
} from "react-icons/fa";
import { SiTensorflow } from "react-icons/si";

const techCategories = [
  {
    title: "웹 개발",
    icon: FaReact,
    color: "#61DAFB",
    description: "React, Vue, Angular 등 현대적인 웹 프레임워크",
    techs: ["React", "Vue", "Angular", "TypeScript", "Next.js"],
  },
  {
    title: "백엔드",
    icon: FaNodeJs,
    color: "#339933",
    description: "Node.js, Spring, Django 등 서버 사이드 기술",
    techs: ["Node.js", "Spring", "Django", "FastAPI", "Express"],
  },
  {
    title: "데이터베이스",
    icon: FaDatabase,
    color: "#336791",
    description: "PostgreSQL, MongoDB, Redis 등 데이터 저장 기술",
    techs: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
  },
  {
    title: "모바일",
    icon: FaMobile,
    color: "#61DAFB",
    description: "React Native, Flutter 등 크로스 플랫폼 개발",
    techs: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
  {
    title: "AI/ML",
    icon: SiTensorflow,
    color: "#FF6F00",
    description: "TensorFlow, PyTorch 등 머신러닝 프레임워크",
    techs: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV"],
  },
  {
    title: "클라우드/DevOps",
    icon: FaCloud,
    color: "#2496ED",
    description: "AWS, Docker, Kubernetes 등 클라우드 기술",
    techs: ["AWS", "Docker", "Kubernetes", "Google Cloud"],
  },
  {
    title: "보안",
    icon: FaShieldAlt,
    color: "#000000",
    description: "보안 및 인증 관련 기술",
    techs: ["JWT", "OAuth", "SSL/TLS", "암호화"],
  },
];

export const TechIntroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full py-12 bg-white dark:bg-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            다양한 기술을 활용해요.
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            추천 기술을 활용해 프로젝트를 만들어요.
          </p>
        </div>

        <div className="mt-12">
          {/* Horizontally Scrollable Container */}
          <div
            ref={containerRef}
            className="flex gap-4 pb-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {techCategories.map((category) => (
              <div
                key={category.title}
                className="flex-none w-[280px] sm:w-[320px] snap-center"
              >
                <div className="h-full p-4 transition-shadow rounded-lg shadow-sm sm:p-6 bg-gray-50 dark:bg-gray-700 hover:shadow-md">
                  <div className="flex items-center space-x-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <category.icon
                        className="w-5 h-5"
                        style={{ color: category.color }}
                      />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {category.techs.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hide scrollbar for Webkit browsers */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};
