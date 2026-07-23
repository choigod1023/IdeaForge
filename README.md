# IdeaForge 🚀

> 토이프로젝트를 생성해주는 토이프로젝트 — AI 기반 프로젝트 아이디어 생성 플랫폼

## 📋 프로젝트 개요

IdeaForge는 사용자가 선택한 난이도·기술 스택·테마 등을 바탕으로 AI가 맞춤형 토이프로젝트 아이디어를 생성해주는 풀스택 웹 애플리케이션입니다. 다단계 폼으로 조건을 입력하면, 백엔드가 OpenAI로 프로젝트 개요·기능·요구사항 등을 생성하고 Perplexity로 관련 학습 리소스를 추천합니다. 생성된 프로젝트는 Markdown으로 내보내거나 공유할 수 있습니다.

## 🌐 데모 / 실행 환경 메모

- **호스팅 데모는 현재 비활성 상태입니다.** 백엔드 호스팅(`idea-forge-server.vercel.app`)이 다운되어 있어, 이 문서는 실제 소스 코드를 기준으로 작성되었습니다. 아래 "시작하기"를 따라 로컬에서 프론트엔드/백엔드를 함께 실행해 동작을 확인할 수 있습니다.
- 프론트엔드는 `VITE_API_URL`로 지정한 백엔드 주소를 API base로 사용합니다(`ky` prefixUrl). 로컬 실행 시 이 값을 로컬 백엔드 주소로 설정하세요.

## ✨ 주요 기능 (코드 기준)

- **다단계 프로젝트 생성 폼**: 난이도·기술 스택·테마·상세 옵션을 단계별로 입력합니다. (`components/forms/*`, `hooks/useProjectForm`, `useFormSteps`)
- **AI 기반 아이디어 생성**: OpenAI(`gpt-4o-mini`)로 프로젝트 제목·설명·기능·선행지식·도전과제 등을 생성합니다.
- **학습 리소스 추천**: 생성된 프로젝트에 대해 Perplexity로 관련 리소스를 검색해 함께 제공합니다.
- **비동기 작업 + 폴링**: 추천 요청 시 즉시 `jobId`를 반환하고, 프론트엔드가 상태(`processing`/`completed`/`failed`)를 폴링하여 결과를 받아옵니다. (`stores/actions/pollingActions`)
- **프로젝트 목록/상세/공유**: 생성한 프로젝트를 목록·상세로 확인하고 공유 페이지로 열람합니다. (`pages/ProjectListPage`, `ProjectPage`, `SharedProjectPage`, `hooks/useSharedProject`)
- **Markdown 내보내기**: 프로젝트 내용을 Markdown 형태로 변환·내보냅니다. (`utils/markdown`, `projectMarkdownHandlers`)
- **클라이언트 저장**: 생성된 프로젝트 목록은 Zustand 스토어에 담기고 브라우저 스토리지에 보관됩니다. (`stores/projectStore`, `utils/storage`)
- **반응형 · 다크 모드 UI**: Tailwind CSS 기반의 반응형 레이아웃과 다크 모드를 지원합니다.

## 🛠️ 기술 스택

### Frontend

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?logo=tailwindcss&logoColor=white)

- **React 19**, **TypeScript**, **Vite**
- **Tailwind CSS** (+ `tailwind-merge`, `clsx`)
- **React Hook Form** + **Zod**(`@hookform/resolvers`) — 폼 상태·검증
- **Zustand** — 클라이언트 상태 관리
- **@tanstack/react-query** — 서버 상태 관리
- **Framer Motion** — 애니메이션
- **ky** — HTTP 클라이언트, **react-router-dom** — 라우팅
- **react-toastify**, **react-icons**, **@heroicons/react**, **ts-pattern**, **es-hangul**

### Backend

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=white)

- **Node.js (>=18)**, **Express**, **TypeScript**
- **openai** — 프로젝트 아이디어 생성(`gpt-4o-mini`)
- **Perplexity API**(`ky` 기반 클라이언트) — 리소스 추천
- **Zod** — 스키마 검증, **cors**, **dotenv**

> 참고: `@google/generative-ai`, `googleapis`, `@prisma/client`가 의존성에 포함되어 있으나, 현재 라우트에 연결된 실행 경로(`project.controller.ts` → `openAIService`)에서는 사용되지 않습니다. Prisma를 사용하는 `projectController.ts`는 라우터에 연결되어 있지 않으며 별도의 Prisma 스키마도 포함되어 있지 않습니다.

## 🏗 동작 방식 / 아키텍처

모노레포 구성으로 `frontend`(React SPA)와 `backend`(Express API)로 나뉩니다.

```
frontend (React SPA)  ──POST /api/projects/recommend──▶  backend (Express)
      │  jobId 수신                                            │  OpenAI(gpt-4o-mini)로 프로젝트 생성
      └──GET /api/projects/recommend/:jobId (폴링)────────────┤  Perplexity로 리소스 추천
                                                              │  결과를 in-memory jobStore에 저장
```

**프론트엔드 라우트** (`react-router-dom`, `App.tsx`)

- `/` — 가이드/랜딩 (`GuidePage`)
- `/create` — 프로젝트 생성 폼 (`ProjectCreatePage`)
- `/project` — 프로젝트 상세 (`ProjectPage`)
- `/projects` — 프로젝트 목록 (`ProjectListPage`)
- `/shared` — 공유 프로젝트 열람 (`SharedProjectPage`)

**백엔드 엔드포인트** (`backend/src/app.ts`, `routes/project.routes.ts`)

- `POST /api/projects/recommend` — 추천 작업 시작, 즉시 `jobId` 반환(비동기 처리)
- `GET  /api/projects/recommend/:jobId` — 작업 상태/결과 조회(폴링용)
- `POST /api/projects` — 프로젝트 생성(`createProject`)

작업 상태는 서버 메모리(`jobStore` Map)에 저장되며 완료 5분 후 정리됩니다. 진입점은 `server.ts`(Express `app.listen`)입니다.

## 🚀 시작하기

### 사전 요구사항

- Node.js 18.0.0 이상
- OpenAI API 키, Perplexity API 키

### 설치 및 실행

1. **저장소 클론**

```bash
git clone https://github.com/choigod1023/IdeaForge.git
cd IdeaForge
```

2. **Backend 설정**

```bash
cd backend
npm install
```

`backend/.env` 파일을 생성합니다. (코드에서 실제로 사용하는 환경변수)

```env
OPENAI_API_KEY=your_openai_api_key
PERPLEXITY_API_KEY=your_perplexity_api_key
PORT=3000            # 선택, 미설정 시 3000
```

```bash
npm run dev          # ts-node-dev (개발, 자동 재시작)
# npm run build && npm start   # 프로덕션
```

3. **Frontend 설정**

```bash
cd frontend
npm install
```

`frontend/.env` 파일을 생성합니다.

```env
VITE_API_URL=http://localhost:3000   # 백엔드 주소 (API base)
```

```bash
npm run dev          # Vite 개발 서버 (--host)
```

## 🔧 개발 스크립트

### Frontend

```bash
npm run dev      # 개발 서버 (vite --host)
npm run build    # tsc -b && vite build
npm run lint     # eslint
npm run preview  # 빌드 미리보기
```

### Backend

```bash
npm run dev      # ts-node-dev --respawn --transpile-only src/server.ts
npm run build    # tsc
npm start        # node dist/server.js
```

## 📁 프로젝트 구조

```
IdeaForge/
├── frontend/                 # React SPA (Vite + TS + Tailwind)
│   └── src/
│       ├── pages/            # Guide, ProjectCreate, Project, ProjectList, SharedProject
│       ├── components/       # forms, project, tech, header, guide, router 등
│       ├── hooks/            # useProjectForm, useFormSteps, usePolling 관련 등
│       ├── stores/           # Zustand 스토어 · actions(projectActions, pollingActions)
│       ├── services/api.ts   # ky 기반 API 클라이언트
│       ├── schemas/          # Zod 폼 스키마
│       ├── utils/ · constants/ · types/ · styles/
├── backend/                  # Express API (TS)
│   └── src/
│       ├── server.ts         # 진입점
│       ├── app.ts            # Express 앱 · recommend/status 엔드포인트 · jobStore
│       ├── routes/           # project.routes.ts
│       ├── controllers/      # project.controller.ts (active)
│       ├── services/         # openai, perplexity, prompts
│       └── types/
├── vercel.json               # 루트 배포 설정
└── README.md
```

## 🌐 배포

Vercel 배포를 전제로 구성되어 있습니다(`vercel.json`). 프론트엔드는 정적 SPA, 백엔드는 `@vercel/node`로 `src/server.ts`를 서버리스로 실행하도록 설정되어 있습니다. 다만 위에 명시했듯 현재 호스팅 데모는 비활성 상태입니다.

## 📝 라이선스

프로젝트 이슈를 통해 문의해 주세요.

---

**IdeaForge** — 당신의 다음 토이프로젝트 아이디어를 찾아보세요! 💡
