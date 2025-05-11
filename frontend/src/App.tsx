import { Routes, Route, Link } from "react-router-dom";
import GuidePage from "./pages/GuidePage";
import ProjectCreatePage from "./pages/ProjectCreatePage";
import ProjectPage from "./pages/ProjectPage";
import SharedProjectPage from "./pages/SharedProjectPage";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="flex items-center justify-center w-10 h-10 text-xl font-bold text-white rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600">
      IF
    </div>
    <div>
      <h1 className="text-3xl font-bold text-gray-900 transition cursor-pointer dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
        IdeaForge
      </h1>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
        당신의 기술 스택과 관심사에 맞는 프로젝트를 추천해드립니다.
      </p>
    </div>
  </div>
);

function App() {
  const location = useLocation();
  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <header className="w-full bg-white shadow dark:bg-gray-800">
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
          <Link to="/">
            <Logo />
          </Link>
        </div>
      </header>

      <main className="w-full h-[calc(100vh-12rem)] overflow-y-auto">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
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
