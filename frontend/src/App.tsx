import { Routes, Route, Link } from "react-router-dom";
import GuidePage from "./pages/GuidePage";
import ProjectCreatePage from "./pages/ProjectCreatePage";
import ProjectPage from "./pages/ProjectPage";
import SharedProjectPage from "./pages/SharedProjectPage";
import ProjectListPage from "./pages/ProjectListPage";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="flex items-center justify-center w-8 h-8 text-lg font-bold text-white rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 sm:w-10 sm:h-10 sm:text-xl">
      IF
    </div>
    <div>
      <h1 className="text-xl font-bold text-gray-900 transition cursor-pointer sm:text-2xl md:text-3xl dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
        IdeaForge
      </h1>
      <p className="mt-0.5 text-xs text-gray-600 sm:text-sm dark:text-gray-300">
        당신의 기술 스택과 관심사에 맞는 프로젝트를 추천해드립니다.
      </p>
    </div>
  </div>
);

function App() {
  const location = useLocation();
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <header className="flex-shrink-0 w-full bg-white shadow dark:bg-gray-800">
        <div className="w-full px-3 py-4 sm:px-6 lg:px-8 sm:py-6">
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>
            <nav className="flex justify-center space-x-2 sm:space-x-4">
              <Link
                to="/projects"
                className="px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-colors rounded-md sm:text-sm hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                내 프로젝트
              </Link>
              <Link
                to="/create"
                className="px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-colors rounded-md sm:text-sm hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                프로젝트 생성
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full overflow-y-auto">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<GuidePage />} />
                <Route path="/create" element={<ProjectCreatePage />} />
                <Route path="/project" element={<ProjectPage />} />
                <Route path="/shared" element={<SharedProjectPage />} />
                <Route path="/projects" element={<ProjectListPage />} />
              </Routes>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
