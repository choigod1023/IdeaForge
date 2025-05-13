import { useState, useRef } from "react";
import {
  FaReact,
  FaNodeJs,
  FaMobile,
  FaDatabase,
  FaCloud,
  FaShieldAlt,
} from "react-icons/fa";
import { SiTensorflow } from "react-icons/si";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? techCategories.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === techCategories.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="w-full py-12 bg-white dark:bg-gray-800">
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            다양한 기술을 활용해요.
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            추천 기술을 활용해 프로젝트를 만들어요.
          </p>
        </div>

        <div className="relative mt-12">
          {/* Fixed Navigation Buttons */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
            <div className="relative z-10 px-4 pointer-events-auto">
              <button
                onClick={handlePrev}
                className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none"
                aria-label="이전 기술"
              >
                <FaChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <div className="relative z-10 px-4 pointer-events-auto">
              <button
                onClick={handleNext}
                className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none"
                aria-label="다음 기술"
              >
                <FaChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>

          {/* Cards Container */}
          <div ref={containerRef} className="px-12 overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {techCategories.map((category) => (
                <div
                  key={category.title}
                  className="flex-none w-full px-4 sm:px-8"
                >
                  <div className="relative max-w-sm p-4 mx-auto transition-shadow rounded-lg shadow-sm sm:p-6 bg-gray-50 dark:bg-gray-700 hover:shadow-md">
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

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {techCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentIndex === index
                    ? "bg-indigo-600 dark:bg-indigo-400"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`${index + 1}번째 기술로 이동`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
