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
  <div className="flex items-center space-x-1.5">
    <div className="flex items-center justify-center text-base font-bold text-white rounded-lg w-7 h-7 bg-gradient-to-r from-indigo-500 to-purple-600 sm:w-8 sm:h-8">
      IF
    </div>
    <h1 className="text-lg font-bold text-gray-900 transition cursor-pointer sm:text-xl dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
      IdeaForge
    </h1>
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
      <header className="flex-shrink-0 w-full bg-white shadow-sm dark:bg-gray-800">
        <div className="w-full px-3 py-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>
            <nav className="flex space-x-1 sm:space-x-2">
              <Link
                to="/projects"
                className="px-2 py-1 text-xs font-medium text-gray-700 transition-colors rounded-md sm:text-sm hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                내 프로젝트
              </Link>
              <Link
                to="/create"
                className="px-2 py-1 text-xs font-medium text-gray-700 transition-colors rounded-md sm:text-sm hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                프로젝트 생성
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full overflow-y-auto">
        <div className="px-4 py-4 sm:px-6 lg:px-8">
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
