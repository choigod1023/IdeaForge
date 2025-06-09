import { Routes, Route } from "react-router-dom";
import GuidePage from "./pages/GuidePage";
import ProjectCreatePage from "./pages/ProjectCreatePage";
import ProjectPage from "./pages/ProjectPage";
import SharedProjectPage from "./pages/SharedProjectPage";
import ProjectListPage from "./pages/ProjectListPage";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { Header } from "./components/Header";
import { RouteGuard } from "./components/router/RouteGuard";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <RouteGuard>
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
              <Routes>
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
    </RouteGuard>
  );
}

export default App;
