# Real-Time Ticketing Frontend

실시간 티켓팅 서비스를 가정하여 구축한 Vue.js 기반 프론트엔드 프로젝트입니다.
모바일과 PC 환경을 모두 고려한 반응형 UI와 Spring Boot API 연동을 중심으로 개발했습니다.

------------------------------
# 프로젝트 목적

본 프로젝트는 실제 티켓팅 서비스 환경을 가정하여 제작한 프론트엔드 프로젝트입니다.
단순 화면 구현이 아닌:

- 로그인
- 대기열
- 좌석 선택
- 예약 완료
- 비밀번호 초기화

등 실제 서비스 흐름을 고려하여 UI/UX를 구성했습니다.

또한 Spring Boot 기반 API 서버와 연동 가능한 구조로 설계했으며,
환경별 API 분리 및 배포 환경도 고려하여 작업했습니다.

------------------------------
# 기술스택

### 1️⃣ FrontEnd
- Vue.js 3
- Vite
- Vue Router
- Axios

### 2️⃣ Styling
- CSS3
- Responsive Web
- Mobile / Desktop Cross Browsing

### 3️⃣ DevOps / Deploy
- AWS S3
- CloudFront
- Jenkins CI/CD

------------------------------
# 아키텍처

```
User Browser
    ↓
CloudFront (HTTPS / CDN)
    ↓
S3 Static Hosting
    ↓
Vue.js App
    ↓
Axios API Request
    ↓
Spring Boot API Server
    ↓
PostgreSQL
```


# Frontend 배포흐름

```
GitHub Push
      ↓
Jenkins Pipeline
      ↓
Vite Production Build
      ↓
AWS S3 Upload
      ↓
CloudFront Cache Invalidation
      ↓
User Access
```

------------------------------
# 프로젝트 구조

```
src
 ├─ api
 │   ├─ axios.js
 │   ├─ index.js
 │   ├─ user.js
 │   └─ login.js
 │
 ├─ components
 │   ├─ Loading.vue
 │   └─ Pagination.vue
 │
 ├─ compsosables
 │   └─ useDevice.js
 │
 ├─ pages
 │   ├─ Login.vue
 │   ├─ Queue.vue
 │   ├─ Seat.vue
 │   ├─ ReservationComplete.vue
 │   └─ PasswordReset.vue
 │
 ├─ assets
 │   ├─ css
 │   ├─ images
 │   └─ js
 │
 └─ util
```

------------------------------
# 주요특징

✅ Authentication UI
로그인 화면
비밀번호 초기화
인증 흐름 UI 구성

✅ Ticketing Flow
공연 리스트
좌석 선택 화면
대기열 화면
예약 완료 화면

✅ Responsive UI
모바일/PC 반응형 대응
Cross Browsing 고려
공통 레이아웃 구조 적용

✅ API Integration
Axios 공통 모듈 구성
환경별 API BaseURL 관리
JWT 인증 연동 구조 고려

------------------------------
# 실행 방법

```
npm install
npm run dev
```

