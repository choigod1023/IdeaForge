import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import GuidePage from "./pages/GuidePage";
import ProjectCreatePage from "./pages/ProjectCreatePage";
import ProjectPage from "./pages/ProjectPage";
import SharedProjectPage from "./pages/SharedProjectPage";
import ProjectListPage from "./pages/ProjectListPage";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { Header } from "./components/Header";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  // /projects/:projectId 형식의 URL을 /project/:projectId 형식으로 리다이렉트
  if (
    location.pathname.startsWith("/projects/") &&
    location.pathname !== "/projects"
  ) {
    const projectId = location.pathname.split("/projects/")[1];
    return <Navigate to={`/project/${projectId}`} replace />;
  }

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
      <Header />

      <main className="flex-1 w-full overflow-y-auto">
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
      </main>
    </div>
  );
}

export default App;
