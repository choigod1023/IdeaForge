import { Link } from "react-router-dom";

const features = [
  {
    title: "맞춤형 프로젝트 추천",
    desc: "기술 스택, 관심사, 난이도에 따라 나만의 토이 프로젝트 아이디어를 추천받을 수 있어요.",
    icon: "💡",
  },
  {
    title: "쉬운 시작",
    desc: "초보자도 쉽게 따라할 수 있도록 단계별로 친절하게 안내해드려요.",
    icon: "🚀",
  },
  {
    title: "다양한 카테고리",
    desc: "프론트엔드, 백엔드, AI/데이터, 모바일, 게임, IoT 등 다양한 분야를 지원합니다.",
    icon: "🛠️",
  },
];

const GuidePage = () => (
  <div className="max-w-3xl py-12 mx-auto text-center animate-fade-in">
    <h2 className="mb-4 text-4xl font-extrabold text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text animate-slide-down">
      토이 프로젝트 생성기란?
    </h2>
    <p className="mb-8 text-lg text-gray-700 animate-fade-in-slow">
      원하는 기술 스택과 관심사, 난이도를 선택하면
      <br />
      당신에게 딱 맞는 토이 프로젝트 아이디어를 추천해주는 서비스입니다.
    </p>
    <div className="flex flex-col justify-center gap-6 mb-10 md:flex-row">
      {features.map((f, i) => (
        <div
          key={f.title}
          className="flex-1 p-6 transition duration-300 transform bg-white border border-gray-100 shadow-lg rounded-xl hover:-translate-y-2 hover:scale-105 animate-fade-in"
          style={{ animationDelay: `${0.2 + i * 0.1}s` }}
        >
          <div className="mb-2 text-4xl">{f.icon}</div>
          <h3 className="mb-1 text-xl font-bold">{f.title}</h3>
          <p className="text-gray-600">{f.desc}</p>
        </div>
      ))}
    </div>
    <Link to="/create">
      <button className="px-8 py-4 text-lg font-bold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl hover:scale-105 hover:shadow-2xl animate-bounce">
        프로젝트 생성하러 가기
      </button>
    </Link>
    <style>
      {`
        .animate-fade-in { animation: fadeIn 1s ease; }
        .animate-fade-in-slow { animation: fadeIn 2s ease; }
        .animate-slide-down { animation: slideDown 1s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-30px);} to { opacity: 1; transform: translateY(0);} }
      `}
    </style>
  </div>
);

export default GuidePage;
