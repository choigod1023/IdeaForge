import { Link } from "react-router-dom";

const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="flex items-center justify-center text-base font-bold text-white rounded-lg w-9 h-9 bg-gradient-to-r from-indigo-500 to-purple-600 sm:w-12 sm:h-12 sm:text-lg">
      IF
    </div>
    <h1 className="text-lg font-bold text-gray-900 transition cursor-pointer sm:text-2xl dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 whitespace-nowrap">
      IdeaForge
    </h1>
  </div>
);

export const Header = () => {
  return (
    <header className="flex-shrink-0 w-full bg-white shadow-sm dark:bg-gray-800">
      <div className="w-full px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>
          <nav className="flex space-x-1.5 sm:space-x-3">
            <Link
              to="/projects"
              className="px-2 py-1.5 text-xs font-medium text-gray-700 transition-colors rounded-md sm:px-3 sm:text-base hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 whitespace-nowrap"
            >
              내 프로젝트
            </Link>
            <Link
              to="/create"
              className="px-2 py-1.5 text-xs font-medium text-gray-700 transition-colors rounded-md sm:px-3 sm:text-base hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 whitespace-nowrap"
            >
              프로젝트 생성
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
