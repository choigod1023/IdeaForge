import { PopularTechBanner } from "./components/PopularTechBanner";
import { Routes, Route, Link } from "react-router-dom";
import GuidePage from "./pages/GuidePage";
import ProjectCreatePage from "./pages/ProjectCreatePage";
import ProjectPage from "./pages/ProjectPage";
import SharedProjectPage from "./pages/SharedProjectPage";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen min-w-screen bg-gray-50">
      <header className="w-screen bg-white shadow">
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
          <Link to="/">
            <h1 className="text-3xl font-bold text-gray-900 transition cursor-pointer hover:text-indigo-600">
              토이 프로젝트 생성기
            </h1>
          </Link>
          <p className="mt-2 text-sm text-gray-600">
            당신의 기술 스택과 관심사에 맞는 토이 프로젝트를 추천해드립니다.
          </p>
        </div>
      </header>

      <PopularTechBanner />

      <main className="w-full py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<GuidePage />} />
                <Route path="/create" element={<ProjectCreatePage />} />
                <Route path="/project" element={<ProjectPage />} />
                <Route path="/shared" element={<SharedProjectPage />} />
              </Routes>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
