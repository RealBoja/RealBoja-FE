# 진짜보자 Frontend
진짜보자 React 프론트엔드 레포지토리입니다.

진짜보자는 조용해진 단톡방에 AI 약속 카드를 공유하고, 참여자 반응을 기반으로 방의 약속 상태를 분석해 실제 만남으로 이어주는 약속 재점화 서비스입니다.

## 역할

- 방 깨우기 정보 입력 UI (방 유형/인원수/목적/톤 선택)
- AI 깨우기 카드 미리보기 및 다시 만들기
- 공유 약속방 링크 진입 및 닉네임 기반 참여
- 참여자 반응 버튼 UI 및 반응 전송
- 약속 온도 / 방 지표 시각화
- 방 분석 결과 카드 화면 및 공유
- 다음 카드 추천 / 2차 카드 생성 화면
- 약속 진행 단계 표시

## 관련 레포지토리

- Backend: https://github.com/RealBoja/RealBoja-BE
- Docs hub: https://github.com/RealBoja/RealBoja

## 추천 구조

```
RealBoja-Frontend/
├─ src/
│  ├─ api/
│  ├─ components/
│  ├─ features/
│  ├─ pages/
│  └─ store/
├─ public/
└─ .github/
```

## MVP 화면

- `Home`: 서비스 소개 및 방 깨우기 시작
- `Create`: 방 정보 선택 후 카드 생성
- `CardPreview`: 깨우기 카드 미리보기 / 공유
- `Room`: 공유 약속방 (닉네임 입력 + 반응)
- `Temperature`: 약속 온도 및 방 지표
- `Result`: 방 분석 결과 카드 (핵심 화면)
- `NextCard`: 다음 카드 추천 / 2차 카드
- `Progress`: 약속 진행 단계 표시

## 반응 버튼

참여자는 날짜 대신 가벼운 반응 4개 중 하나를 선택합니다.

`나 진짜 볼래 / [목적]이면 감 / 누가 잡으면 감 / 일단 생존신고`

## 브랜치 컨벤션

`feat/{feature-name}
fix/{bug-name}
chore/{task-name}
docs/{doc-name}`

| 접두사 | 언제 쓰나 |
| --- | --- |
| `feat/` | 새 화면/기능 작업 브랜치 (예: `feat/card-preview`) |
| `fix/` | 버그 수정 브랜치 (예: `fix/nickname-validation`) |
| `chore/` | 빌드/설정/의존성 등 코드 외 작업 (예: `chore/vite-setup`) |
| `docs/` | 문서 작업 브랜치 (예: `docs/readme`) |

## 커밋 컨벤션

```
feat: add wake card preview screen
fix: disable reaction button without nickname
chore: configure vite project
docs: update component guide
```

| 타입 | 언제 쓰나 |
| --- | --- |
| `feat` | 새 화면이나 기능을 추가할 때 (카드 미리보기, 반응 버튼 등) |
| `fix` | 버그를 고칠 때 (닉네임 미입력 처리, 온도 게이지 오류 등) |
| `style` | 로직 변경 없이 UI/스타일/포맷만 바꿀 때 (색상, 간격 등) |
| `refactor` | 동작은 그대로 두고 코드 구조만 개선할 때 (컴포넌트 분리 등) |
| `chore` | 기능과 무관한 설정·빌드·의존성 작업일 때 (Vite 설정, 패키지 추가) |
| `docs` | 문서만 바꿀 때 (README, 컴포넌트 가이드 등) |

> 규칙: subject는 50자 이내, 마침표 없이, "무엇을 했다" 위주로 명확하게 작성합니다.
>
