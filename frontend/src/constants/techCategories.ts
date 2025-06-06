import {
  FaReact,
  FaNodeJs,
  FaMobile,
  FaDatabase,
  FaCloud,
  FaShieldAlt,
} from "react-icons/fa";
import { SiTensorflow } from "react-icons/si";
import type { TechCategory } from "../types/tech";

export const TECH_CATEGORIES: TechCategory[] = [
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
