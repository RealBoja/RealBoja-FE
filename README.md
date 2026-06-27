# 진짜보자 Frontend

진짜보자 React 프론트엔드 레포지토리입니다.

진짜보자는 조용해진 단톡방에 AI 약속 카드를 공유하고, 참여자 반응을 기반으로 방의 약속 상태를 분석해 실제 만남으로 이어주는 약속 재점화 서비스입니다.
 
---
 
## 파일 구조
 
```
src/
├── api/
│   ├── roomApi.ts          # 방 생성, 카드 생성, 참여자, 반응 API
│   └── analysisApi.ts      # 방 분석 결과 API
│
├── components/
│   ├── common/             # 공통 컴포넌트
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Chip.tsx
│   │   ├── ChipGroup.tsx
│   │   ├── icons.ts
│   │   ├── PromiseCard.tsx
│   │   ├── ReactionButton.tsx
│   │   ├── ReactionGrid.tsx
│   │   ├── ShareButton.tsx
│   │   ├── TextInput.tsx
│   │   └── TopBar.tsx
│   │
│   ├── analysis/           # 분석 결과 컴포넌트
│   │   ├── AIInsightBox.tsx
│   │   ├── AnalysisSummaryCard.tsx
│   │   ├── RecommendActionBox.tsx
│   │   └── StatBox.tsx
│   │
│   ├── card/               # 카드 컴포넌트
│   │   ├── RoomInfoCard.tsx
│   │   └── TimeSlotResultRow.tsx
│   │
│   ├── join/               # 입장 화면 컴포넌트
│   │   ├── JoinHintBox.tsx
│   │   └── PromiseCardPreview.tsx
│   │
│   ├── next-card/          # 2차 카드 컴포넌트
│   │   ├── ContextSummary.tsx
│   │   ├── NextPromiseCard.tsx
│   │   └── StageProgressBar.tsx
│   │
│   ├── reaction/           # 반응 화면 컴포넌트
│   │   ├── ParticipantStatusCard.tsx
│   │   └── ReactionCardPreview.tsx
│   │
│   ├── temperature/        # 온도 화면 컴포넌트
│   │   ├── ReactionStatRow.tsx
│   │   ├── TemperatureGauge.tsx
│   │   └── TempLegend.tsx
│   │
│   └── layout/
│       └── MobileLayout.tsx
│
└── pages/
    ├── LandingPage.tsx         # 랜딩
    ├── CardFormPage.tsx        # 방 정보 입력
    ├── CardResultPage.tsx      # 카드 생성 결과
    ├── JoinRoomPage.tsx        # 방 입장
    ├── ReactRoomPage.tsx       # 반응 선택
    ├── AnalysisPage.tsx        # 분석 결과
    ├── TemperaturePage.tsx     # 약속 온도
    ├── NextCardPage.tsx        # 다음 카드
    ├── SecondCardPage.tsx      # 일정 조율
    └── TimeSlotResultPage.tsx  # 시간대 결과
```
 
---
 
## MVP 화면
 
| 화면 | 경로 | 설명 |
|------|------|------|
| 랜딩 | `/` | 서비스 소개 및 시작 |
| 방 정보 입력 | `/create` | 방 유형, 마지막 만남, 인원수, 목적, 카드 톤 선택 |
| 카드 생성 결과 | `/card/:roomCode/result` | AI가 생성한 약속 카드 확인 및 공유 |
| 방 입장 | `/card/:roomCode/join` | 공유 링크로 접속 후 닉네임 입력 |
| 반응 선택 | `/card/:roomCode/react` | 4가지 반응 중 하나 선택 |
| 분석 결과 | `/card/:roomCode/analysis` | 약속 온도, 참여율, 반응 요약, AI 분석 |
| 약속 온도 | `/card/:roomCode/temperature` | 온도 게이지 및 반응 현황 |
| 일정 조율 | `/card/:roomCode/second` | 가능한 시간대 및 출발역 선택 |
| 시간대 결과 | `/card/:roomCode/timeslot` | 시간대 투표 결과 |
 
---
 
## 브랜치 컨벤션
 
```
main
└── dev
    ├── feat/#이슈번호-기능명
    ├── fix/#이슈번호-버그명
    └── refactor/#이슈번호-내용
```
 
| 브랜치 | 용도 |
|--------|------|
| `main` | 배포 브랜치 |
| `dev` | 개발 통합 브랜치 |
| `feat/#n-기능명` | 기능 개발 |
| `fix/#n-버그명` | 버그 수정 |
| `refactor/#n-내용` | 리팩토링 |
 
---
 
## 커밋 컨벤션
 
```
타입: 내용 (#이슈번호)
```
 
| 타입 | 설명 |
|------|------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `refactor` | 코드 리팩토링 |
| `style` | UI/스타일 수정 |
| `chore` | 설정, 패키지 등 기타 작업 |
| `docs` | 문서 수정 |
> 규칙: subject는 50자 이내, 마침표 없이, "무엇을 했다" 위주로 명확하게 작성합니다.
