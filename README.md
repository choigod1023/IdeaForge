# IdeaForge 🚀

AI 기반 프로젝트 아이디어 생성 플랫폼

## 📋 프로젝트 개요

IdeaForge는 사용자의 기술 스택과 난이도에 맞는 맞춤형 프로젝트 아이디어를 생성해주는 AI 기반 웹 애플리케이션입니다. 초보자부터 고급 개발자까지 모든 수준의 개발자들이 자신에게 적합한 프로젝트를 찾을 수 있도록 도와줍니다.

## ✨ 주요 기능

- **난이도별 프로젝트 추천**: 초급, 중급, 고급 난이도 선택
- **기술 스택 기반 필터링**: 선호하는 기술 스택에 따른 맞춤 추천
- **테마별 프로젝트 분류**: 다양한 프로젝트 테마와 카테고리
- **AI 기반 아이디어 생성**: Google AI와 OpenAI를 활용한 스마트 추천
- **반응형 웹 디자인**: 모든 디바이스에서 최적화된 사용자 경험

## 🛠️ 기술 스택

### Frontend

- **React 19** - 최신 React 기능 활용
- **TypeScript** - 타입 안전성 보장
- **Vite** - 빠른 개발 환경
- **Tailwind CSS** - 유틸리티 기반 스타일링
- **React Hook Form** - 폼 상태 관리
- **Zustand** - 상태 관리
- **React Query** - 서버 상태 관리
- **Framer Motion** - 애니메이션

### Backend

- **Node.js** - 서버 런타임
- **Express.js** - 웹 프레임워크
- **TypeScript** - 타입 안전성
- **Prisma** - 데이터베이스 ORM
- **Google AI** - AI 아이디어 생성
- **OpenAI** - 추가 AI 기능

## 🚀 시작하기

### 사전 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 및 실행

1. **저장소 클론**

```bash
git clone <repository-url>
cd IdeaForge
```

2. **Frontend 설정**

```bash
cd frontend
npm install
npm run dev
```

3. **Backend 설정**

```bash
cd backend
npm install
npm run dev
```

4. **환경 변수 설정**

```bash
# backend/.env 파일 생성
GOOGLE_AI_API_KEY=your_google_ai_api_key
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=your_database_url
```

## 📁 프로젝트 구조

```
IdeaForge/
├── frontend/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/      # 재사용 가능한 컴포넌트
│   │   ├── hooks/          # 커스텀 훅
│   │   ├── pages/          # 페이지 컴포넌트
│   │   ├── types/          # TypeScript 타입 정의
│   │   ├── utils/          # 유틸리티 함수
│   │   └── constants/      # 상수 정의
│   └── package.json
├── backend/                 # Node.js 백엔드
│   ├── src/
│   │   ├── routes/         # API 라우트
│   │   ├── services/       # 비즈니스 로직
│   │   ├── types/          # 타입 정의
│   │   └── utils/          # 유틸리티 함수
│   └── package.json
└── README.md
```

## 🔧 개발 스크립트

### Frontend

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run lint     # 코드 린팅
npm run preview  # 빌드 미리보기
```

### Backend

```bash
npm run dev      # 개발 서버 실행 (자동 재시작)
npm run build    # TypeScript 컴파일
npm start        # 프로덕션 서버 실행
```

## 🌐 배포

이 프로젝트는 Vercel을 통해 배포됩니다:

- **Frontend**: Vercel 자동 배포
- **Backend**: Vercel Serverless Functions

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

---

**IdeaForge** - 당신의 다음 프로젝트 아이디어를 찾아보세요! 💡
