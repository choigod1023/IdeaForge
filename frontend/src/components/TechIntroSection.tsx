import { useState, useEffect, useRef } from "react";
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

const scrollbarHideStyle = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
    overscroll-behavior-x: contain;
    touch-action: pan-x;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .carousel-container {
    overflow: hidden;
    position: relative;
    width: 100%;
  }
  .carousel-track {
    display: flex;
    will-change: transform;
    position: relative;
  }
  .carousel-slide {
    flex: 0 0 100%;
    width: 100%;
    padding: 0 0.75rem;
    height: 100%;
  }
  .carousel-card {
    height: 100%;
    min-height: 150px;
    display: flex;
    flex-direction: column;
  }
  .carousel-card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
  .carousel-card-techs {
    margin-top: 0.75rem;
  }
  @media (min-width: 640px) {
    .carousel-slide {
      flex: 0 0 50%;
      width: 50%;
    }
  }
  @media (min-width: 1024px) {
    .carousel-slide {
      flex: 0 0 33.333333%;
      width: 33.333333%;
    }
  }
`;

export const TechIntroSection = () => {
  const [position, setPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [isPaused, setIsPaused] = useState(false);
  const totalWidthRef = useRef(0);

  const getSlideWidth = (): number => {
    if (!containerRef.current) return 0;
    const width = containerRef.current.offsetWidth;
    if (width >= 1024) return width / 3;
    if (width >= 640) return width / 2;
    return width;
  };

  // Initialize total width and starting position
  useEffect(() => {
    const slideWidth = getSlideWidth();
    const totalSlides = techCategories.length;
    totalWidthRef.current = slideWidth * totalSlides;
    // Start from the second set of slides
    setPosition(-totalWidthRef.current);
  }, []);

  const animate = () => {
    if (isPaused) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    setPosition((prev) => {
      const newPosition = prev - 2;

      // When we've moved one total width, reset to start
      if (Math.abs(newPosition) >= totalWidthRef.current * 2) {
        return -totalWidthRef.current;
      }
      return newPosition;
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  // Create four sets of slides for seamless transition
  const quadruplicatedSlides = [
    ...techCategories,
    ...techCategories,
    ...techCategories,
    ...techCategories,
  ];

  return (
    <>
      <style>{scrollbarHideStyle}</style>
      <div className="w-full py-12 bg-white dark:bg-gray-800">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              다양한 기술 스택으로 시작하세요
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              웹, 모바일, AI 등 다양한 분야의 기술을 활용한 프로젝트를
              만나보세요
            </p>
          </div>

          {/* Infinite Scroll Carousel */}
          <div
            ref={containerRef}
            className="relative mt-12"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="carousel-container">
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(${position}px)`,
                }}
              >
                {quadruplicatedSlides.map((category, index) => (
                  <div
                    key={`${category.title}-${index}`}
                    className="carousel-slide"
                  >
                    <div className="relative transition-shadow rounded-lg shadow-sm carousel-card bg-gray-50 dark:bg-gray-700 hover:shadow-md">
                      <div className="carousel-card-content">
                        <div className="flex items-center space-x-3">
                          <div
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: `${category.color}20` }}
                          >
                            <category.icon
                              className="w-4 h-4"
                              style={{ color: category.color }}
                            />
                          </div>
                          <h3 className="font-medium text-gray-900 text-m dark:text-white">
                            {category.title}
                          </h3>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                          {category.description}
                        </p>
                        <div className="carousel-card-techs flex flex-wrap gap-1.5">
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
