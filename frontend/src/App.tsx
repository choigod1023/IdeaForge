import { ProjectForm } from "./components/ProjectForm";
import { ProjectDisplay } from "./components/ProjectDisplay";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow w-screen">
        <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            토이 프로젝트 생성기
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            당신의 기술 스택과 관심사에 맞는 토이 프로젝트를 추천해드립니다.
          </p>
        </div>
      </header>

      <main className="w-full py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="space-y-8">
            <ProjectForm />
            <ProjectDisplay />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
